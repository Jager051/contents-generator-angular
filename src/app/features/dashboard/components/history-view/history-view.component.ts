import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface PublishedVideo {
  id: number;
  title: string;
  platform: string;
  publishedAt: string;
  views: string;
  thumbnail: 'blue' | 'purple' | 'green' | 'orange';
}

@Component({
  selector: 'app-history-view',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './history-view.component.html',
  styleUrl: './history-view.component.scss'
})
export class HistoryViewComponent {
  readonly videos: PublishedVideo[] = [
    {
      id: 1,
      title: 'AI Revolution in 2025',
      platform: 'YouTube',
      publishedAt: '2025-11-10 08:00',
      views: '12.5K',
      thumbnail: 'blue'
    },
    {
      id: 2,
      title: 'Quick Productivity Tips',
      platform: 'TikTok',
      publishedAt: '2025-11-09 14:00',
      views: '8.2K',
      thumbnail: 'purple'
    },
    {
      id: 3,
      title: 'Morning Motivation',
      platform: 'YouTube',
      publishedAt: '2025-11-09 08:00',
      views: '15.7K',
      thumbnail: 'green'
    },
    {
      id: 4,
      title: 'Tech News Update',
      platform: 'TikTok',
      publishedAt: '2025-11-08 20:00',
      views: '6.8K',
      thumbnail: 'orange'
    }
  ];
}


