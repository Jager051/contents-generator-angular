import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly DARK_MODE_KEY = 'dark-mode';
  isDark = signal<boolean>(false);

  constructor() {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(this.DARK_MODE_KEY);
      const initialDark = saved === 'true';
      this.isDark.set(initialDark);
      
      if (initialDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    // Watch for changes and update DOM
    effect(() => {
      if (typeof window !== 'undefined') {
        const isDark = this.isDark();
        if (isDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem(this.DARK_MODE_KEY, 'true');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem(this.DARK_MODE_KEY, 'false');
        }
      }
    });
  }

  toggleDarkMode(): void {
    this.isDark.update(value => !value);
  }
}

