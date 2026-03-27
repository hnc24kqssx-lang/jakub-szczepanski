import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

const STORAGE_KEY = 'cyber_cookie_consent_v1';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (show()) {
      <div
        class="fixed bottom-0 left-0 right-0 z-[90] border-t border-cyber-line/80 bg-cyber-deep/95 p-4 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-5"
      >
        <div class="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p class="text-sm leading-relaxed text-slate-300 md:max-w-[70%]">
            Używamy plików cookies w celach funkcjonalnych i analitycznych (np. lepsze działanie formularza).
            Szczegóły znajdziesz w
            <a
              routerLink="/polityka-prywatnosci"
              class="text-cyber-cyan underline decoration-cyber-cyan/40 underline-offset-2 transition hover:text-cyber-ice active:scale-[0.98]"
              >polityce prywatności</a
            >.
          </p>
          <div class="flex shrink-0 flex-wrap gap-3">
            <button
              type="button"
              (click)="decline()"
              class="rounded border border-cyber-line px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyber-cyan/50 hover:text-white active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-cyan"
            >
              Odrzuć
            </button>
            <button
              type="button"
              (click)="accept()"
              class="rounded bg-cyber-cyan/15 px-4 py-2.5 text-sm font-semibold text-cyber-cyan shadow-neon-sm transition hover:bg-cyber-cyan/25 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-cyan"
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class CookieBannerComponent implements OnInit {
  readonly show = signal(false);

  ngOnInit(): void {
    if (typeof localStorage === 'undefined') return;
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) this.show.set(true);
  }

  accept(): void {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    this.show.set(false);
  }

  decline(): void {
    localStorage.setItem(STORAGE_KEY, 'declined');
    this.show.set(false);
  }
}
