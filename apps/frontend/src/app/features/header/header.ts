import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
})
export class HeaderComponent {
  protected isDarkTheme = signal(true);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme.set(savedTheme !== 'light');
    this.applyTheme(this.isDarkTheme());

    effect(() => {
      this.applyTheme(this.isDarkTheme());
    });
  }

  protected toggleTheme() {
    this.isDarkTheme.update((dark) => !dark);
  }

  private applyTheme(isDark: boolean) {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
