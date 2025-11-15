import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkflowStep } from '../../dashboard.model';

type StepStatus = 'completed' | 'active' | 'pending';

@Component({
  selector: 'app-workflow-stepper',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './workflow-stepper.component.html',
  styleUrl: './workflow-stepper.component.scss'
})
export class WorkflowStepperComponent implements OnChanges {
  @Input() steps: WorkflowStep[] | null = [];
  @Input() activeStep = 1;
  @Input() workflowName = 'Video Creation Workflow';
  @Input() workflowStatus: string | null = null;

  readonly fallbackSteps: WorkflowStep[] = [
    { id: 1, title: 'Input Content', description: 'Upload topics or Excel file', icon: 'description', stepType: 'input', sequence: 1, status: 'completed' },
    { id: 2, title: 'Trigger Rule', description: 'Set schedule or trigger', icon: 'schedule', stepType: 'automation', sequence: 2, status: 'completed' },
    { id: 3, title: 'AI Script Generation', description: 'AI creates video script', icon: 'auto_awesome', stepType: 'generation', sequence: 3, status: 'active' },
    { id: 4, title: 'Background Music', description: 'Generate matching music', icon: 'music_note', stepType: 'audio', sequence: 4, status: 'pending' },
    { id: 5, title: 'Video Generation', description: 'Create video with AI', icon: 'videocam', stepType: 'video', sequence: 5, status: 'pending' },
    { id: 6, title: 'Preview Delivery', description: 'Send preview via Telegram', icon: 'link', stepType: 'delivery', sequence: 6, status: 'pending' },
    { id: 7, title: 'User Approval', description: 'Approve & publish', icon: 'task_alt', stepType: 'approval', sequence: 7, status: 'pending' },
    { id: 8, title: 'Confirmation', description: 'Receive notification', icon: 'notifications', stepType: 'notification', sequence: 8, status: 'pending' }
  ];

  private currentActiveStep = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeStep']) {
      this.currentActiveStep = changes['activeStep'].currentValue ?? 1;
    }
  }

  get stepsToRender(): WorkflowStep[] {
    if (this.steps && this.steps.length) {
      return this.steps;
    }
    return this.fallbackSteps;
  }

  get totalSteps(): number {
    return this.stepsToRender.length;
  }

  get activeStepLabel(): number {
    return this.currentActiveStep;
  }

  statusOf(step: WorkflowStep): StepStatus {
    const normalizedStatus = step.status?.toLowerCase() as StepStatus | undefined;
    if (normalizedStatus && ['completed', 'active', 'pending'].includes(normalizedStatus)) {
      return normalizedStatus;
    }

    const sequence = step.sequence || step.id;
    if (sequence === this.currentActiveStep) {
      return 'active';
    }

    if (sequence < this.currentActiveStep) {
      return 'completed';
    }

    return 'pending';
  }

  setActive(stepIdentifier: number) {
    this.currentActiveStep = stepIdentifier;
  }

  statusLabel(): string {
    if (!this.workflowStatus) {
      return 'In Progress';
    }

    switch (this.workflowStatus.toLowerCase()) {
      case 'active':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'paused':
        return 'Paused';
      default:
        return this.workflowStatus;
    }
  }
}


