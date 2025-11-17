import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardOverview, DashboardView, NewWorkflowDraft, WorkflowDetail, UpdateWorkflowRequest } from './dashboard.model';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardHomeComponent } from './components/home/dashboard-home.component';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { HistoryViewComponent } from './components/history-view/history-view.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { TelegramConnectComponent } from './components/telegram-connect/telegram-connect.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { AuthService } from '../auth/services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { Observable, catchError, finalize, of, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    MatIconModule,
    DashboardHomeComponent,
    WorkflowListComponent,
    CalendarViewComponent,
    HistoryViewComponent,
    SettingsViewComponent,
    TelegramConnectComponent,
    NewProjectComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentUser$;
  activeView: DashboardView = 'dashboard';
  isNewProjectOpen = false;
  editingWorkflow: WorkflowDetail | null = null;
  overview$!: Observable<DashboardOverview | null>;
  isOverviewLoading = true;
  errorMessage = '';
  isCreatingWorkflow = false;
  isUpdatingWorkflow = false;
  
  @ViewChild(WorkflowListComponent) workflowListComponent?: WorkflowListComponent;

  constructor(private authService: AuthService, private dashboardService: DashboardService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.loadOverview();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // Logout successful - navigation is handled in AuthService
      },
      error: (err) => {
        console.error('Logout error:', err);
        // Even if API call fails, user is already logged out locally
      }
    });
  }

  setActiveView(view: DashboardView) {
    this.activeView = view;
  }

  openNewProjectModal() {
    this.editingWorkflow = null;
    this.isNewProjectOpen = true;
  }

  closeNewProject() {
    this.isNewProjectOpen = false;
    this.editingWorkflow = null;
  }

  openEditWorkflowModal(workflowId: number) {
    this.dashboardService.getWorkflowById(workflowId).subscribe({
      next: (workflow) => {
        this.editingWorkflow = workflow;
        this.isNewProjectOpen = true;
      },
      error: (err) => {
        console.error('Failed to load workflow:', err);
        this.errorMessage = err.message || 'Workflow detayları yüklenemedi';
      }
    });
  }

  handleNewWorkflow() {
    this.activeView = 'dashboard';
    setTimeout(() => {
      this.isNewProjectOpen = true;
    }, 120);
  }

  handleProjectSave(project: NewWorkflowDraft) {
    if (this.editingWorkflow) {
      // Update existing workflow
      this.isUpdatingWorkflow = true;
      const updateRequest: UpdateWorkflowRequest = {
        workflowId: this.editingWorkflow.id,
        ...project
      };

      this.dashboardService
        .updateWorkflow(updateRequest)
        .pipe(
          finalize(() => {
            this.isUpdatingWorkflow = false;
          })
        )
        .subscribe({
          next: () => {
            this.closeNewProject();
            this.loadOverview();
            // Reload workflow list if we're on workflows view
            if (this.activeView === 'workflows' && this.workflowListComponent) {
              this.workflowListComponent.reload();
            }
          },
          error: (error) => {
            console.error('Workflow update failed', error);
            this.errorMessage = error?.message || 'Workflow güncellenemedi';
          }
        });
    } else {
      // Create new workflow
      this.isCreatingWorkflow = true;

      this.dashboardService
        .createWorkflow(project)
        .pipe(
          finalize(() => {
            this.isCreatingWorkflow = false;
          })
        )
        .subscribe({
          next: () => {
            this.closeNewProject();
            this.loadOverview();
          },
          error: (error) => {
            console.error('Workflow creation failed', error);
            this.errorMessage = error?.message || 'Workflow could not be created';
          }
        });
    }
  }

  reloadOverview() {
    this.loadOverview();
  }

  private loadOverview() {
    this.isOverviewLoading = true;
    this.overview$ = this.dashboardService.getOverview().pipe(
      tap(() => {
        this.isOverviewLoading = false;
        this.errorMessage = '';
      }),
      catchError((error) => {
        this.isOverviewLoading = false;
        this.errorMessage = error?.message || 'Dashboard verileri alınamadı';
        return of(null);
      }),
      shareReplay(1)
    );
  }
}
