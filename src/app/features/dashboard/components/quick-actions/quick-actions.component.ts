import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-quick-actions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss'
})
export class QuickActionsComponent {
  @Output() newProject = new EventEmitter<void>();

  handleNewProject() {
    this.newProject.emit();
  }
}


