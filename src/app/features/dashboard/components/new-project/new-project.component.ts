import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface Step {
  title: string;
  description: string;
}

interface ProjectDraft {
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  description: string;
  triggerType: 'schedule' | 'telegram' | 'custom';
  triggerTime: string;
  language: string;
  autoPublish: boolean;
}

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss'
})
export class NewProjectComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ProjectDraft>();

  currentStep = 0;
  readonly frequencyOptions: ProjectDraft['frequency'][] = ['daily', 'weekly', 'monthly'];
  readonly triggerOptions: ProjectDraft['triggerType'][] = ['schedule', 'telegram', 'custom'];

  readonly steps: Step[] = [
    { title: 'Project Details', description: 'Name and describe your automation project.' },
    { title: 'Triggers & Delivery', description: 'Define when and how your videos are generated.' },
    { title: 'Review & Create', description: 'Confirm the details before creating your project.' }
  ];

  draft: ProjectDraft = {
    name: '',
    frequency: 'daily',
    description: '',
    triggerType: 'schedule',
    triggerTime: '08:00',
    language: 'English',
    autoPublish: false
  };

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
    this.save.emit(this.draft);
    this.handleClose();
  }

  setFrequency(option: ProjectDraft['frequency']) {
    this.draft.frequency = option;
  }

  setTriggerType(option: ProjectDraft['triggerType']) {
    this.draft.triggerType = option;
  }
}


