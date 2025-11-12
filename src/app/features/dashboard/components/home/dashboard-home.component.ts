import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PreviewPanelComponent } from '../preview-panel/preview-panel.component';
import { QuickActionsComponent } from '../quick-actions/quick-actions.component';
import { WorkflowStepperComponent } from '../workflow-stepper/workflow-stepper.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, PreviewPanelComponent, QuickActionsComponent, WorkflowStepperComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  @Output() newProject = new EventEmitter<void>();

  handleNewProject() {
    this.newProject.emit();
  }
}


