import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <button
        type="button"
        (click)="scrollTop()"
        class="fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-cyber-cyan/40 bg-cyber-panel/95 text-cyber-cyan shadow-neon-sm backdrop-blur-sm transition hover:bg-cyber-cyan/20 active:scale-90 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-cyan"
        aria-label="Wróć na górę strony"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    }
  `,
})
export class BackToTopComponent {
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 420);
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
