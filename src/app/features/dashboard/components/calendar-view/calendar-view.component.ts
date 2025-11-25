import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../services/dashboard.service';
import { Calendar, CalendarDay, CalendarWorkflowItem } from '../../dashboard.model';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent implements OnInit {
  calendar: Calendar | null = null;
  currentYear: number;
  currentMonth: number;
  isLoading = false;
  error: string | null = null;
  selectedDay: CalendarDay | null = null;

  constructor(private dashboardService: DashboardService) {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
  }

  ngOnInit(): void {
    this.loadCalendar();
  }

  loadCalendar(): void {
    this.isLoading = true;
    this.error = null;
    this.selectedDay = null; // Reset selection when loading new month

    this.dashboardService.getCalendar(this.currentYear, this.currentMonth).subscribe({
      next: (data) => {
        this.calendar = data;
        this.isLoading = false;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message || 'Takvim verileri yüklenirken bir hata oluştu';
        this.isLoading = false;
      }
    });
  }

  previousMonth(): void {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.loadCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.loadCalendar();
  }

  goToToday(): void {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth() + 1;
    this.loadCalendar();
  }

  get calendarDays(): CalendarDay[] {
    return this.calendar?.days || [];
  }

  get upcomingWorkflows(): CalendarWorkflowItem[] {
    // If a day is selected, show workflows for that day
    if (this.selectedDay && this.selectedDay.hasWorkflow) {
      return this.selectedDay.workflows;
    }
    // Otherwise show all upcoming workflows
    return this.calendar?.upcomingWorkflows || [];
  }

  get sidebarTitle(): string {
    if (this.selectedDay && this.selectedDay.isCurrentMonth) {
      const date = new Date(this.currentYear, this.currentMonth - 1, this.selectedDay.day);
      return `Workflows for ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    return 'Upcoming Workflows';
  }

  selectDay(day: CalendarDay): void {
    // Only allow selecting days from current month that have workflows
    if (day.isCurrentMonth && day.hasWorkflow) {
      // Toggle selection - if clicking the same day, deselect it
      if (this.selectedDay === day) {
        this.selectedDay = null;
      } else {
        this.selectedDay = day;
      }
    }
  }

  isDaySelected(day: CalendarDay): boolean {
    return this.selectedDay === day;
  }

  get monthName(): string {
    return this.calendar?.monthName || '';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}


