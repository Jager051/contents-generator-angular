import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardView } from './dashboard.model';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardHomeComponent } from './components/home/dashboard-home.component';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { HistoryViewComponent } from './components/history-view/history-view.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { TelegramConnectComponent } from './components/telegram-connect/telegram-connect.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
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
export class DashboardComponent {
  currentUser$;
  activeView: DashboardView = 'dashboard';
  isNewProjectOpen = false;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
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

  handleProjectSave(project: unknown) {
    // Placeholder for integration with backend.
    console.info('New project created:', project);
  }
}
