import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import type { PortfolioProject } from '../models/portfolio-project.model';

@Component({
  selector: 'app-portfolio-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (project()) {
      <div
        class="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'portfolio-modal-title-' + project()!.id"
      >
        <button
          type="button"
          class="absolute inset-0 bg-cyber-void/85 backdrop-blur-sm transition-opacity duration-300 ease-out"
          [class.opacity-0]="!backdropVisible()"
          [class.opacity-100]="backdropVisible()"
          (click)="requestClose()"
          aria-label="Zamknij"
        ></button>

        <div
          #surface
          class="portfolio-modal-surface pointer-events-auto relative flex flex-col overflow-hidden rounded-xl border border-cyber-line/60 bg-cyber-deep shadow-[0_0_60px_rgba(0,212,255,0.12)]"
          [ngStyle]="surfaceBox()"
          (click)="$event.stopPropagation()"
          (transitionend)="onSurfaceTransitionEnd($event)"
        >
          <header
            class="flex shrink-0 items-start justify-between gap-4 border-b border-cyber-line/40 px-5 py-4 sm:px-6"
          >
            <div class="min-w-0">
              <h2
                class="font-body text-lg font-semibold leading-snug text-white sm:text-xl"
                [id]="'portfolio-modal-title-' + project()!.id"
              >
                {{ project()!.title }}
              </h2>
              <p class="mt-1 font-body text-sm text-slate-400">
                {{ project()!.description }}
              </p>
            </div>
            <button
              type="button"
              (click)="requestClose()"
              class="shrink-0 rounded-full border border-cyber-line px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-cyber-ice transition hover:border-cyber-cyan/50 hover:text-cyber-cyan active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyber-cyan"
            >
              Zamknij
            </button>
          </header>

          <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
            <p class="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyber-cyan">
              Podgląd
            </p>
            <div
              class="mt-3 overflow-hidden rounded-lg border border-cyber-line/45 bg-cyber-panel/40"
            >
              <div
                class="flex items-center gap-2 border-b border-cyber-line/30 px-3 py-2 font-mono text-[10px] text-cyber-ice/60"
              >
                <span class="h-2 w-2 rounded-full bg-cyber-cyan/60"></span>
                Strona główna
              </div>
              @if (project()!.isPrivate) {
                <div
                  class="flex aspect-[16/9] flex-col items-center justify-center gap-3 bg-cyber-void/80 p-8"
                >
                  <svg
                    class="h-14 w-14 text-cyber-cyan/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.25"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <p class="text-center font-body text-sm text-slate-400">
                    Projekt prywatny — brak podglądu
                  </p>
                </div>
              } @else if (project()!.previewImage) {
                <img
                  [src]="project()!.previewImage"
                  [alt]="'Podgląd projektu ' + project()!.title"
                  class="aspect-[16/9] w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              } @else {
                <div
                  class="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-cyber-navy/50 to-cyber-void"
                >
                  <span class="font-mono text-xs text-cyber-ice/40"
                    >Brak grafiki — ustaw previewImage w danych</span
                  >
                </div>
              }
            </div>

            <p
              class="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyber-cyan"
            >
              Opis
            </p>
            <p class="mt-2 font-body text-sm leading-relaxed text-slate-300">
              {{ project()!.modalDescription }}
            </p>

            <p
              class="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyber-cyan"
            >
              Tech stack
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              @for (t of project()!.stack; track t) {
                <span
                  class="rounded-md border border-cyber-line/50 bg-cyber-panel/80 px-2.5 py-1 font-mono text-[11px] text-slate-200"
                  >{{ t }}</span
                >
              }
            </div>

            @if (project()!.apis?.length) {
              <p
                class="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyber-cyan"
              >
                API i integracje
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                @for (a of project()!.apis; track a) {
                  <span
                    class="rounded-md border border-cyber-cyan/25 bg-cyber-cyan/10 px-2.5 py-1 font-mono text-[11px] text-cyber-ice"
                    >{{ a }}</span
                  >
                }
              </div>
            }
          </div>

          <footer class="shrink-0 border-t border-cyber-line/40 px-5 py-4 sm:px-6">
            <a
              [href]="project()!.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/45 bg-cyber-cyan/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan shadow-neon-sm transition hover:bg-cyber-cyan/20 active:scale-[0.98]"
            >
              Live demo
              <span aria-hidden="true">→</span>
            </a>
          </footer>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .portfolio-modal-surface {
        will-change: left, top, width, height, transform;
        transition:
          left 0.52s cubic-bezier(0.22, 1, 0.36, 1),
          top 0.52s cubic-bezier(0.22, 1, 0.36, 1),
          width 0.52s cubic-bezier(0.22, 1, 0.36, 1),
          height 0.52s cubic-bezier(0.22, 1, 0.36, 1),
          transform 0.52s cubic-bezier(0.22, 1, 0.36, 1),
          border-radius 0.4s ease;
      }
    `,
  ],
})
export class PortfolioModalComponent implements OnDestroy {
  readonly project = input<PortfolioProject | null>(null);
  readonly originRect = input<DOMRect | null>(null);

  readonly closed = output<void>();

  private readonly surfaceRef = viewChild<ElementRef<HTMLElement>>('surface');
  private readonly document = inject(DOCUMENT);

  readonly expanded = signal(false);
  readonly closing = signal(false);
  readonly backdropVisible = signal(false);

  private closeEmitDone = false;
  private closeFallback?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const p = this.project();
      if (p) {
        untracked(() => {
          this.closing.set(false);
          this.expanded.set(false);
          this.backdropVisible.set(false);
          this.closeEmitDone = false;
          this.document.body.style.overflow = 'hidden';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              this.backdropVisible.set(true);
              this.expanded.set(true);
            });
          });
        });
      } else {
        untracked(() => {
          this.document.body.style.overflow = '';
        });
      }
    });
  }

  private endHeightPx(): number {
    const w = this.document.defaultView;
    if (!w) return 800;
    return Math.min(w.innerHeight * 0.9, 800);
  }

  surfaceBox(): Record<string, string> {
    const p = this.project();
    const r = this.originRect();
    const exp = this.expanded();
    const cls = this.closing();

    const base: Record<string, string> = {
      position: 'fixed',
      zIndex: '201',
      borderRadius: '0.75rem',
    };

    if (!p) return base;

    if (!r) {
      const h = this.endHeightPx();
      return {
        ...base,
        left: '50%',
        top: '50%',
        width: 'min(90vw, 56rem)',
        height: `${h}px`,
        maxHeight: '90vh',
        transform: 'translate(-50%, -50%)',
      };
    }

    if (exp && !cls) {
      const h = this.endHeightPx();
      return {
        ...base,
        left: '50%',
        top: '50%',
        width: 'min(90vw, 56rem)',
        height: `${h}px`,
        maxHeight: '90vh',
        transform: 'translate(-50%, -50%)',
      };
    }

    return {
      ...base,
      left: `${r.left}px`,
      top: `${r.top}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      transform: 'translate(0, 0)',
    };
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.project()) this.requestClose();
  }

  requestClose(): void {
    if (!this.project() || this.closing()) return;
    this.closing.set(true);
    this.backdropVisible.set(false);
    this.expanded.set(false);
    clearTimeout(this.closeFallback);
    this.closeFallback = setTimeout(() => this.emitClosedIfNeeded(), 580);
  }

  ngOnDestroy(): void {
    clearTimeout(this.closeFallback);
    this.document.body.style.overflow = '';
  }

  private emitClosedIfNeeded(): void {
    if (this.closeEmitDone || !this.closing()) return;
    this.closeEmitDone = true;
    this.closed.emit();
  }

  onSurfaceTransitionEnd(event: TransitionEvent): void {
    const el = this.surfaceRef()?.nativeElement;
    if (!el || event.target !== el) return;
    if (!this.closing()) return;
    if (event.propertyName !== 'height' && event.propertyName !== 'left') return;
    clearTimeout(this.closeFallback);
    this.emitClosedIfNeeded();
  }
}
