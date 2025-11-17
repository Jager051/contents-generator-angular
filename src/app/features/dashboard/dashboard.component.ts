import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardOverview, DashboardView, NewWorkflowDraft } from './dashboard.model';
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
  overview$!: Observable<DashboardOverview | null>;
  isOverviewLoading = true;
  errorMessage = '';
  isCreatingWorkflow = false;

  constructor(private authService: AuthService, private dashboardService: DashboardService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.loadOverview();
  }

  logout() {
    this.authService.logout();
  }

  setActiveView(view: DashboardView) {
    this.activeView = view;
  }

  openNewProjectModal() {
    this.isNewProjectOpen = true;
  }

  closeNewProject() {
    this.isNewProjectOpen = false;
  }

  handleNewWorkflow() {
    this.activeView = 'dashboard';
    setTimeout(() => {
      this.isNewProjectOpen = true;
    }, 120);
  }

  handleProjectSave(project: NewWorkflowDraft) {
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
