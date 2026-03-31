import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!--
      Menu mobilne POZA <header>, ale nadrzędny wrapper NIE ma isolation/z-index,
      więc position:fixed dzieci uczestniczy w globalnym stacking context.
      <main z-[1]> nie może już przykryć headera (z-[110] w root context).
    -->

    <!-- Overlay + panel: z-[100] w globalnym kontekście -->
    <div
      class="mobile-menu-root fixed inset-0 z-[100] md:hidden"
      [class.is-open]="menuOpen()"
      [class.pointer-events-none]="!menuOpen()"
      aria-hidden="true"
    >
      <button
        type="button"
        class="mobile-menu-backdrop absolute inset-0 block h-full w-full cursor-default border-0 p-0"
        [class.pointer-events-none]="!menuOpen()"
        (click)="closeMenu()"
        tabindex="-1"
        aria-label="Zamknij menu"
      ></button>

      <nav
        id="mobile-menu"
        class="mobile-menu-panel absolute right-0 top-0 z-10 flex h-full w-[min(88vw,320px)] flex-col border-l border-cyber-line/80 px-6 pb-10 pt-24 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        [class.translate-x-full]="!menuOpen()"
        [class.translate-x-0]="menuOpen()"
        [attr.aria-hidden]="!menuOpen()"
      >
        <div class="mb-8 h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent"></div>
        @for (link of links; track link.href) {
          <a
            [href]="link.href"
            (click)="closeMenu()"
            class="border-b border-cyber-line/30 py-4 font-mono text-sm uppercase tracking-[0.25em] text-slate-200 transition hover:pl-1 hover:text-cyber-cyan active:scale-[0.99] active:text-cyber-ice"
            >{{ link.label }}</a
          >
        }
        <a
          routerLink="/polityka-prywatnosci"
          (click)="closeMenu()"
          class="mt-6 font-mono text-xs text-slate-400 underline-offset-4 hover:text-cyber-ice hover:underline"
          >Polityka prywatności</a
        >
      </nav>
    </div>

    <!-- Header: z-[110] w globalnym kontekście -->
    <header
      class="fixed left-0 right-0 top-0 z-[110] border-b border-cyber-line/40 bg-cyber-void/85 backdrop-blur-md transition-shadow duration-300"
      [class.shadow-neon]="scrolled()"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a
          routerLink="/"
          fragment=""
          class="group flex items-center gap-2 rounded-md outline-none ring-offset-2 ring-offset-cyber-void transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyber-cyan"
          aria-label="Strona główna"
        >
          <span
            class="flex h-9 w-9 items-center justify-center rounded border border-cyber-cyan/40 bg-cyber-panel font-mono text-sm font-bold text-cyber-cyan shadow-neon-sm"
            >JS</span
          >
          <span class="hidden font-mono text-xs tracking-widest text-cyber-ice/90 sm:inline">DEV_NET</span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-8 md:flex" aria-label="Główna nawigacja">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              class="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 transition hover:text-cyber-cyan active:scale-95 active:text-cyber-ice"
              >{{ link.label }}</a
            >
          }
        </nav>

        <!-- Hamburger: z-[120] — nad menu overlay, zawsze klikalny -->
        <button
          type="button"
          class="relative z-[120] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md border border-cyber-line/60 bg-cyber-panel md:hidden"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          aria-label="Menu"
        >
          <span
            class="block h-0.5 w-5 origin-center rounded bg-cyber-cyan transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            [class.translate-y-[7px]]="menuOpen()"
            [class.-rotate-45]="menuOpen()"
          ></span>
          <span
            class="block h-0.5 w-5 rounded bg-cyber-cyan transition duration-[400ms]"
            [class.opacity-0]="menuOpen()"
            [class.scale-x-0]="menuOpen()"
          ></span>
          <span
            class="block h-0.5 w-5 origin-center rounded bg-cyber-cyan transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            [class.-translate-y-[7px]]="menuOpen()"
            [class.rotate-45]="menuOpen()"
          ></span>
        </button>
      </div>
    </header>
  `,
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  readonly links = [
    { label: 'Start', href: '/#hero' },
    { label: 'Strona wizytówki', href: '/#dlaczego-wizytowka' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Certyfikaty', href: '/#certyfikaty' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Kontakt', href: '/kontakt' },
  ] as const;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) this.closeMenu();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }
}
