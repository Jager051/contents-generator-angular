import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

type WorkflowStatus = 'active' | 'paused' | 'error';
type WorkflowFrequency = 'daily' | 'weekly' | 'monthly';

interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  frequency: WorkflowFrequency;
  trigger: string;
  videosCreated: number;
  lastRun: string;
  nextRun: string;
}

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss'
})
export class WorkflowListComponent {
  @Output() newWorkflow = new EventEmitter<void>();

  searchQuery = '';

  readonly workflows: Workflow[] = [
    {
      id: '1',
      name: 'Daily Motivation Videos',
      status: 'active',
      frequency: 'daily',
      trigger: 'Every day at 08:00',
      videosCreated: 45,
      lastRun: '2025-11-12 08:00',
      nextRun: '2025-11-13 08:00'
    },
    {
      id: '2',
      name: 'Weekly Tech News',
      status: 'active',
      frequency: 'weekly',
      trigger: 'Every Monday at 10:00',
      videosCreated: 12,
      lastRun: '2025-11-11 10:00',
      nextRun: '2025-11-18 10:00'
    },
    {
      id: '3',
      name: 'Quick Tips & Tricks',
      status: 'paused',
      frequency: 'daily',
      trigger: 'Every day at 14:00',
      videosCreated: 28,
      lastRun: '2025-11-10 14:00',
      nextRun: 'Paused'
    },
    {
      id: '4',
      name: 'Monthly Product Updates',
      status: 'error',
      frequency: 'monthly',
      trigger: '1st of every month at 12:00',
      videosCreated: 3,
      lastRun: '2025-11-01 12:00',
      nextRun: 'Error · Check settings'
    },
    {
      id: '5',
      name: 'Evening Inspiration',
      status: 'active',
      frequency: 'daily',
      trigger: 'Every day at 20:00',
      videosCreated: 38,
      lastRun: '2025-11-12 20:00',
      nextRun: '2025-11-13 20:00'
    }
  ];

  get filteredWorkflows(): Workflow[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return this.workflows;
    }
    return this.workflows.filter((workflow) => workflow.name.toLowerCase().includes(query));
  }

  countByStatus(status: WorkflowStatus): number {
    return this.workflows.filter((workflow) => workflow.status === status).length;
  }

  statusClass(status: WorkflowStatus): string {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'paused':
        return 'badge-warning';
      case 'error':
        return 'badge-danger';
      default:
        return '';
    }
  }

  statusIcon(status: WorkflowStatus): string {
    switch (status) {
      case 'active':
        return 'check_circle';
      case 'paused':
        return 'pause_circle';
      case 'error':
        return 'error';
    }
  }

  triggerNewWorkflow() {
    this.newWorkflow.emit();
  }
}


