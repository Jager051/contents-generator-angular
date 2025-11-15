import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PreviewPanelComponent } from '../preview-panel/preview-panel.component';
import { WorkflowStepperComponent } from '../workflow-stepper/workflow-stepper.component';
import { DashboardOverview } from '../../dashboard.model';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, PreviewPanelComponent, WorkflowStepperComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  @Output() newProject = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>();
  @Input() overview: DashboardOverview | null = null;
  @Input() loading = false;
  @Input() errorMessage = '';

  handleNewProject() {
    this.newProject.emit();
  }

  handleRetry() {
    this.retry.emit();
  }
}


