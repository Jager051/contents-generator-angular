import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-workflow-stepper',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './workflow-stepper.component.html',
  styleUrl: './workflow-stepper.component.scss'
})
export class WorkflowStepperComponent {
  activeStep = 3;

  readonly steps: Step[] = [
    { id: 1, title: 'Input Content', description: 'Upload topics or Excel file', icon: 'description' },
    { id: 2, title: 'Trigger Rule', description: 'Set schedule or trigger', icon: 'schedule' },
    { id: 3, title: 'AI Script Generation', description: 'AI creates video script', icon: 'auto_awesome' },
    { id: 4, title: 'Background Music', description: 'Generate matching music', icon: 'music_note' },
    { id: 5, title: 'Video Generation', description: 'Create video with AI', icon: 'videocam' },
    { id: 6, title: 'Preview Delivery', description: 'Send preview via Telegram', icon: 'link' },
    { id: 7, title: 'User Approval', description: 'Approve & publish', icon: 'task_alt' },
    { id: 8, title: 'Confirmation', description: 'Receive notification', icon: 'notifications' }
  ];

  statusOf(step: Step): 'completed' | 'active' | 'pending' {
    if (this.activeStep === step.id) {
      return 'active';
    }
    if (this.activeStep > step.id) {
      return 'completed';
    }
    return 'pending';
  }

  setActive(stepId: number) {
    this.activeStep = stepId;
  }
}


