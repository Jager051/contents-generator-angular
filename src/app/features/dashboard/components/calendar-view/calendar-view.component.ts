import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface ScheduledPost {
  date: string;
  time: string;
  title: string;
  platform: string;
}

interface CalendarDay {
  label: string;
  isCurrentMonth: boolean;
  hasPost: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent {
  readonly scheduledPosts: ScheduledPost[] = [
    { date: '2025-11-12', time: '08:00', title: 'Morning Motivation', platform: 'YouTube' },
    { date: '2025-11-12', time: '14:00', title: 'Tech Tips', platform: 'TikTok' },
    { date: '2025-11-13', time: '08:00', title: 'Daily Inspiration', platform: 'YouTube' },
    { date: '2025-11-13', time: '20:00', title: 'Evening Wisdom', platform: 'TikTok' },
    { date: '2025-11-14', time: '08:00', title: 'Success Stories', platform: 'YouTube' }
  ];

  readonly calendarDays: CalendarDay[] = Array.from({ length: 35 }, (_, index) => {
    const dayNumber = index - 4;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= 30;
    const hasPost = [12, 13, 14, 15, 16].includes(dayNumber);
    const isToday = dayNumber === 11;

    return {
      label: isCurrentMonth ? String(dayNumber) : '',
      isCurrentMonth,
      hasPost,
      isToday
    };
  });
}


