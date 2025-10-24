import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService, PopupOptions } from '../../services/popup.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit, OnDestroy {
  popups$: Observable<PopupOptions[]>;
  private subscription: Subscription = new Subscription();

  constructor(private popupService: PopupService) {
    this.popups$ = this.popupService.getPopups();
  }

  ngOnInit(): void {
    this.subscription = this.popups$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closePopup(popup: PopupOptions): void {
    this.popupService.closePopup(popup);
  }

  getPopupClass(type?: string): string {
    switch (type) {
      case 'success':
        return 'popup-success';
      case 'error':
        return 'popup-error';
      case 'warning':
        return 'popup-warning';
      case 'info':
        return 'popup-info';
      default:
        return 'popup-info';
    }
  }

  getIconClass(type?: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  }

  trackByPopup(index: number, popup: PopupOptions): string {
    return popup.message + popup.type + index;
  }
}
