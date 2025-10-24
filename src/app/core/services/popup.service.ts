import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PopupOptions {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // Auto close duration in milliseconds, 0 = no auto close
  showCloseButton?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popups: PopupOptions[] = [];
  private popupSubject = new BehaviorSubject<PopupOptions[]>([]);

  constructor() {}

  // Show popup
  showPopup(options: PopupOptions): void {
    const popup: PopupOptions = {
      title: options.title || this.getDefaultTitle(options.type),
      message: options.message,
      type: options.type || 'info',
      duration: options.duration !== undefined ? options.duration : 5000,
      showCloseButton: options.showCloseButton !== undefined ? options.showCloseButton : true
    };

    this.popups.push(popup);
    this.popupSubject.next([...this.popups]);

    // Auto close if duration is set
    if (popup.duration && popup.duration > 0) {
      setTimeout(() => {
        this.closePopup(popup);
      }, popup.duration);
    }
  }

  // Show success popup
  showSuccess(message: string, title?: string, duration?: number): void {
    this.showPopup({
      title,
      message,
      type: 'success',
      duration
    });
  }

  // Show error popup
  showError(message: string, title?: string, duration?: number): void {
    this.showPopup({
      title,
      message,
      type: 'error',
      duration
    });
  }

  // Show warning popup
  showWarning(message: string, title?: string, duration?: number): void {
    this.showPopup({
      title,
      message,
      type: 'warning',
      duration
    });
  }

  // Show info popup
  showInfo(message: string, title?: string, duration?: number): void {
    this.showPopup({
      title,
      message,
      type: 'info',
      duration
    });
  }

  // Close specific popup
  closePopup(popup: PopupOptions): void {
    const index = this.popups.indexOf(popup);
    if (index > -1) {
      this.popups.splice(index, 1);
      this.popupSubject.next([...this.popups]);
    }
  }

  // Close all popups
  closeAllPopups(): void {
    this.popups = [];
    this.popupSubject.next([]);
  }

  // Get popups observable
  getPopups(): Observable<PopupOptions[]> {
    return this.popupSubject.asObservable();
  }

  private getDefaultTitle(type?: string): string {
    switch (type) {
      case 'success':
        return 'Başarılı';
      case 'error':
        return 'Hata';
      case 'warning':
        return 'Uyarı';
      case 'info':
        return 'Bilgi';
      default:
        return 'Bilgi';
    }
  }
}
