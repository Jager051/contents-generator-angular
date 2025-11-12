import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface PlatformConnection {
  name: string;
  icon: string;
  color: string;
  username: string;
  enabled: boolean;
}

interface NotificationItem {
  title: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-settings-view',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {
  platformConnections: PlatformConnection[] = [
    { name: 'YouTube', icon: 'smart_display', color: '#ef4444', username: '@username', enabled: true },
    { name: 'TikTok', icon: 'chat', color: '#3b82f6', username: '@username', enabled: true }
  ];

  notifications: NotificationItem[] = [
    { title: 'Video Preview Ready', description: 'Notify via Telegram', enabled: true },
    { title: 'Publishing Success', description: 'Notify via Telegram', enabled: true },
    { title: 'Daily Summary', description: 'Get daily analytics', enabled: false }
  ];

  publishingSchedule = 'Every day at 8:00 AM';
  timezone = 'UTC+3 (Turkey)';
  weekendPublishing = false;
  contentTone = 'Professional, Friendly, Energetic';
  videoDuration = '30 seconds';
  autoApprove = false;
}


