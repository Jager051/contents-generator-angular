import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { WorkflowListItem, WorkflowListStats } from '../../dashboard.model';

type WorkflowStatus = 'active' | 'paused' | 'error';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss'
})
export class WorkflowListComponent implements OnInit, OnDestroy {
  @Output() newWorkflow = new EventEmitter<void>();
  @Output() editWorkflow = new EventEmitter<number>();
  
  // Public method to reload workflows (can be called from parent)
  public reload(): void {
    this.loadWorkflows();
  }

  searchQuery = '';
  workflows: WorkflowListItem[] = [];
  stats: WorkflowListStats = {
    total: 0,
    active: 0,
    paused: 0,
    error: 0
  };

  isLoading = false;
  error: string | null = null;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Initial load
    this.loadWorkflows();

    // Setup search with debounce
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          this.isLoading = true;
          this.error = null;
          return this.dashboardService.getWorkflowList(query || undefined);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.workflows = data.workflows;
          this.stats = data.stats;
          this.isLoading = false;
          this.error = null;
        },
        error: (err) => {
          this.error = err.message || 'Workflow listesi yüklenirken bir hata oluştu';
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  loadWorkflows(): void {
    this.isLoading = true;
    this.error = null;

    this.dashboardService.getWorkflowList().subscribe({
      next: (data) => {
        this.workflows = data.workflows;
        this.stats = data.stats;
        this.isLoading = false;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message || 'Workflow listesi yüklenirken bir hata oluştu';
        this.isLoading = false;
      }
    });
  }

  get filteredWorkflows(): WorkflowListItem[] {
    // Backend'den gelen data zaten filtrelenmiş, ama client-side'da da filtreleme yapabiliriz
    return this.workflows;
  }

  countByStatus(status: WorkflowStatus): number {
    switch (status) {
      case 'active':
        return this.stats.active;
      case 'paused':
        return this.stats.paused;
      case 'error':
        return this.stats.error;
      default:
        return 0;
    }
  }

  statusClass(status: string): string {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
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

  statusIcon(status: string): string {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'active':
        return 'check_circle';
      case 'paused':
        return 'pause_circle';
      case 'error':
        return 'error';
      default:
        return 'help';
    }
  }

  triggerNewWorkflow(): void {
    this.newWorkflow.emit();
  }

  editWorkflowHandler(workflowId: number): void {
    this.editWorkflow.emit(workflowId);
  }

  toggleWorkflowStatus(workflow: WorkflowListItem): void {
    const currentStatus = workflow.status.toLowerCase();
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';

    // Optimistic update - immediately update UI
    const originalStatus = workflow.status;
    workflow.status = newStatus;

    // Update stats optimistically
    if (currentStatus === 'active') {
      this.stats.active--;
      this.stats.paused++;
    } else {
      this.stats.active++;
      this.stats.paused--;
    }

    // Call API
    this.dashboardService.updateWorkflowStatus(workflow.id, newStatus).subscribe({
      next: (updatedWorkflow) => {
        // Update workflow with response data
        workflow.status = updatedWorkflow.status;
        // Stats will be updated on next load, but we already did optimistic update
      },
      error: (err) => {
        // Revert optimistic update on error
        workflow.status = originalStatus;
        if (currentStatus === 'active') {
          this.stats.active++;
          this.stats.paused--;
        } else {
          this.stats.active--;
          this.stats.paused++;
        }
        console.error('Failed to update workflow status:', err);
        // Optionally show error message to user
        this.error = err.message || 'Workflow status güncellenemedi';
      }
    });
  }
}


