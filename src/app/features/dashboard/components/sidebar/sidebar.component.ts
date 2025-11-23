import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardView } from '../../dashboard.model';

interface NavItem {
  id: DashboardView;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input({ required: true }) activeView!: DashboardView;
  @Input() activeProjectsCount: number = 0;
  @Output() viewChange = new EventEmitter<DashboardView>();

  readonly navItems: NavItem[] = [
    { id: 'workflows', icon: 'list', label: 'Workflow List' },
    { id: 'dashboard', icon: 'home', label: 'Dashboard' },
    { id: 'calendar', icon: 'calendar_today', label: 'Calendar' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'telegram', icon: 'send', label: 'Telegram' },
    { id: 'settings', icon: 'settings', label: 'Settings' }
  ];

  onSelect(view: DashboardView) {
    if (view !== this.activeView) {
      this.viewChange.emit(view);
    }
  }
}


