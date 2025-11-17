import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NewWorkflowDraft, WorkflowDetail } from '../../dashboard.model';

interface Step {
  title: string;
  description: string;
}

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss'
})
export class NewProjectComponent implements OnChanges {
  @Input() saving = false;
  @Input() workflow: WorkflowDetail | null = null; // Edit mode için
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<NewWorkflowDraft>();

  currentStep = 0;
  readonly frequencyOptions: NewWorkflowDraft['frequency'][] = ['daily', 'weekly', 'monthly'];
  readonly triggerOptions: NewWorkflowDraft['triggerType'][] = ['schedule', 'telegram', 'custom'];

  readonly steps: Step[] = [
    { title: 'Project Details', description: 'Name and describe your automation project.' },
    { title: 'Triggers & Delivery', description: 'Define when and how your videos are generated.' },
    { title: 'Review & Create', description: 'Confirm the details before creating your project.' }
  ];

  draft: NewWorkflowDraft = {
    name: '',
    frequency: 'daily',
    description: '',
    triggerType: 'schedule',
    triggerTime: '08:00',
    triggerDateTime: this.getDefaultDateTime(),
    language: 'English',
    autoPublish: false
  };

  private getDefaultDateTime(): string {
    const now = new Date();
    // Yarın saat 08:00
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);
    return this.formatDateTimeLocal(tomorrow);
  }

  private formatDateTimeLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private parseDateTimeLocal(dateTimeString: string): Date | null {
    if (!dateTimeString) return null;
    return new Date(dateTimeString);
  }

  private timeToDateTimeLocal(time: string, baseDate?: Date): string {
    if (!time) return this.getDefaultDateTime();
    
    const date = baseDate || new Date();
    const [hours, minutes] = time.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) {
      return this.getDefaultDateTime();
    }
    
    date.setHours(hours, minutes, 0, 0);
    return this.formatDateTimeLocal(date);
  }

  private dateTimeLocalToTime(dateTimeString: string): string {
    if (!dateTimeString) return '08:00';
    
    const date = this.parseDateTimeLocal(dateTimeString);
    if (!date) return '08:00';
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  get isEditMode(): boolean {
    return this.workflow !== null;
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Edit Project' : 'Create New Project';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Project' : 'Create Project';
  }

  formatDateTimeForDisplay(dateTimeString?: string): string {
    if (!dateTimeString) return 'Not set';
    
    const date = this.parseDateTimeLocal(dateTimeString);
    if (!date) return 'Not set';
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workflow'] && this.workflow) {
      // Edit mode: Load workflow data into draft
      this.draft = {
        name: this.workflow.name,
        frequency: this.workflow.frequency as 'daily' | 'weekly' | 'monthly',
        description: this.workflow.description,
        triggerType: this.workflow.triggerType as 'schedule' | 'telegram' | 'custom',
        triggerTime: this.workflow.triggerTime,
        triggerDateTime: this.timeToDateTimeLocal(this.workflow.triggerTime),
        language: this.workflow.language,
        autoPublish: this.workflow.autoPublish
      };
      this.currentStep = 0; // Reset to first step
    } else if (changes['workflow'] && !this.workflow) {
      // Create mode: Reset draft
      this.draft = {
        name: '',
        frequency: 'daily',
        description: '',
        triggerType: 'schedule',
        triggerTime: '08:00',
        triggerDateTime: this.getDefaultDateTime(),
        language: 'English',
        autoPublish: false
      };
      this.currentStep = 0;
    }
  }

  get isLastStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }

  nextStep() {
    if (!this.isLastStep) {
      this.currentStep += 1;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }
  }

  handleClose() {
    this.close.emit();
  }

  submit() {
    // triggerDateTime varsa tam tarih+saat formatını gönder, yoksa sadece saat (backward compatibility)
    const draftToSave = {
      ...this.draft,
      triggerTime: this.draft.triggerDateTime 
        ? this.draft.triggerDateTime // Tam tarih+saat formatını gönder (yyyy-MM-ddTHH:mm)
        : this.draft.triggerTime || '08:00' // Fallback: sadece saat formatı
    };
    this.save.emit(draftToSave);
  }

  setFrequency(option: NewWorkflowDraft['frequency']) {
    this.draft.frequency = option;
  }

  setTriggerType(option: NewWorkflowDraft['triggerType']) {
    this.draft.triggerType = option;
  }
}


