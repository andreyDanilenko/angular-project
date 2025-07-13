import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = 'light';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  initializeTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentTheme = localStorage.getItem('theme') || 'light';
      this.applyTheme();
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.currentTheme);
    }
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
