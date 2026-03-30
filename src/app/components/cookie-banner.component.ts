import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

const STORAGE_KEY = 'cyber_cookie_consent_v1';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (show()) {
      <div
        class="fixed inset-0 z-[220] flex items-center justify-center bg-[#000000] p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div
          class="w-full max-w-2xl rounded-xl border border-cyber-line/80 bg-cyber-void px-6 py-8 shadow-[0_0_80px_rgba(0,0,0,0.85)] md:px-8"
        >
          <p class="font-mono text-xs uppercase tracking-[0.35em] text-cyber-cyan">Cookies</p>
          <h2 id="cookie-title" class="mt-3 font-display text-3xl uppercase text-white md:text-4xl">
            Akceptacja wymagana
          </h2>
          <p class="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
            Ta strona wymaga akceptacji plików cookies, aby wyświetlić pełną zawartość i poprawnie
            działać. Szczegóły znajdziesz w
            <a
              routerLink="/polityka-prywatnosci"
              class="text-cyber-cyan underline decoration-cyber-cyan/40 underline-offset-2 transition hover:text-cyber-ice"
              >polityce prywatności</a
            >.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              (click)="accept()"
              class="rounded-lg border border-cyber-cyan/50 bg-cyber-cyan/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyber-cyan shadow-neon-sm transition hover:bg-cyber-cyan/25 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-cyan"
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class CookieBannerComponent implements OnInit, OnDestroy {
  readonly show = signal(false);

  ngOnInit(): void {
    if (typeof localStorage === 'undefined') return;
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) {
      this.show.set(true);
      document.body.style.overflow = 'hidden';
    }
  }

  accept(): void {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    this.show.set(false);
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
