import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div
        class="loading-root fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-void transition-opacity duration-700 ease-out"
        [class.opacity-0]="exiting()"
        [class.pointer-events-none]="exiting()"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <!-- Subtle animated backdrop -->
        <div class="loading-bg-pulse pointer-events-none absolute inset-0"></div>
        <div class="loading-scanlines pointer-events-none absolute inset-0 opacity-[0.04]"></div>

        <div class="loading-content relative flex flex-col items-center">
          <!-- HUD corners -->
          <div class="loading-hud pointer-events-none absolute -inset-10 md:-inset-14">
            <span class="loading-corner loading-corner-tl"></span>
            <span class="loading-corner loading-corner-tr"></span>
            <span class="loading-corner loading-corner-bl"></span>
            <span class="loading-corner loading-corner-br"></span>
          </div>

          <div class="relative mb-8 h-20 w-20 overflow-visible">
            <div class="loading-glow absolute inset-[-12px] rounded-full"></div>
            <!-- Obracający się łuk „systemu” (orbita wokół węzła SYS) -->
            <svg
              class="loading-system-arc pointer-events-none absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="loadingSysArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.35" />
                  <stop offset="45%" stop-color="#00d4ff" stop-opacity="1" />
                  <stop offset="100%" stop-color="#7ecbff" stop-opacity="0.85" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(30, 58, 95, 0.75)"
                stroke-width="1.5"
              />
              <g transform="translate(50 50)">
                <g class="loading-system-rotate">
                  <circle
                    cx="0"
                    cy="0"
                    r="44"
                    fill="none"
                    stroke="url(#loadingSysArcGrad)"
                    stroke-width="3.5"
                    stroke-dasharray="69 208"
                    stroke-linecap="round"
                    transform="rotate(-90)"
                  />
                </g>
              </g>
            </svg>
            <div
              class="absolute inset-0 rounded-full border-2 border-cyber-line"
              style="animation: loading-spin 1.2s linear infinite"
            ></div>
            <div
              class="absolute inset-1 rounded-full border-2 border-t-cyber-cyan border-r-transparent border-b-transparent border-l-transparent shadow-neon-sm"
              style="animation: loading-spin-reverse 0.85s linear infinite"
            ></div>
            <div
              class="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-semibold tracking-wider text-cyber-cyan loading-sys-glow sm:text-xs"
            >
              SYS
            </div>
          </div>

          <p
            class="loading-label font-mono text-sm tracking-[0.35em] text-cyber-ice/90"
          >
            INITIALIZING INTERFACE<span class="loading-cursor inline-block w-[2px]">▍</span>
          </p>

          <div
            class="loading-bar-track mt-6 h-1 w-48 overflow-hidden rounded-full bg-cyber-panel"
            aria-hidden="true"
          >
            <div
              class="loading-bar-fill relative h-full w-0 rounded-full bg-gradient-to-r from-cyber-navy via-cyber-cyan to-cyber-ice"
            >
              <div class="loading-bar-shimmer absolute inset-0"></div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .loading-root {
        --loading-cyan: rgb(0 212 255);
      }

      @keyframes loading-spin {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes loading-spin-reverse {
        to {
          transform: rotate(-360deg);
        }
      }

      .loading-system-rotate {
        transform-origin: 0px 0px;
        animation: loading-system-orbit 2.1s linear infinite;
        filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.45));
      }
      @keyframes loading-system-orbit {
        to {
          transform: rotate(360deg);
        }
      }

      .loading-bg-pulse {
        background: radial-gradient(
          ellipse 80% 60% at 50% 45%,
          rgba(0, 212, 255, 0.12) 0%,
          transparent 55%
        );
        animation: loading-bg-breathe 2.4s ease-in-out infinite;
      }
      @keyframes loading-bg-breathe {
        0%,
        100% {
          opacity: 0.45;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.06);
        }
      }

      .loading-scanlines {
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 212, 255, 0.35) 2px,
          rgba(0, 212, 255, 0.35) 3px
        );
        animation: loading-scan-drift 3.5s linear infinite;
        pointer-events: none;
      }
      @keyframes loading-scan-drift {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(12px);
        }
      }

      .loading-content {
        animation: loading-content-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      @keyframes loading-content-in {
        from {
          opacity: 0;
          transform: scale(0.94) translateY(14px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .loading-glow {
        background: radial-gradient(
          circle,
          rgba(0, 212, 255, 0.35) 0%,
          rgba(0, 212, 255, 0.08) 45%,
          transparent 70%
        );
        animation: loading-glow-pulse 1.6s ease-in-out infinite;
      }
      @keyframes loading-glow-pulse {
        0%,
        100% {
          opacity: 0.5;
          transform: scale(0.92);
        }
        50% {
          opacity: 1;
          transform: scale(1.08);
        }
      }

      .loading-sys-glow {
        animation: loading-sys-text 1.8s ease-in-out infinite;
      }
      @keyframes loading-sys-text {
        0%,
        100% {
          text-shadow:
            0 0 8px rgba(0, 212, 255, 0.5),
            0 0 20px rgba(0, 212, 255, 0.2);
          filter: brightness(1);
        }
        50% {
          text-shadow:
            0 0 16px rgba(0, 212, 255, 0.85),
            0 0 32px rgba(126, 203, 255, 0.35);
          filter: brightness(1.15);
        }
      }

      .loading-label {
        animation: loading-label-flicker 3s ease-in-out infinite;
      }
      @keyframes loading-label-flicker {
        0%,
        92%,
        100% {
          opacity: 1;
        }
        94% {
          opacity: 0.72;
        }
        96% {
          opacity: 0.95;
        }
      }

      .loading-cursor {
        margin-left: 2px;
        color: var(--loading-cyan);
        animation: loading-cursor-blink 0.85s step-end infinite;
      }
      @keyframes loading-cursor-blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
      }

      .loading-corner {
        position: absolute;
        width: 18px;
        height: 18px;
        border-color: rgba(0, 212, 255, 0.45);
        border-style: solid;
        border-width: 0;
        animation: loading-corner-pulse 2s ease-in-out infinite;
      }
      .loading-corner-tl {
        top: 0;
        left: 0;
        border-top-width: 2px;
        border-left-width: 2px;
        animation-delay: 0s;
      }
      .loading-corner-tr {
        top: 0;
        right: 0;
        border-top-width: 2px;
        border-right-width: 2px;
        animation-delay: 0.15s;
      }
      .loading-corner-bl {
        bottom: 0;
        left: 0;
        border-bottom-width: 2px;
        border-left-width: 2px;
        animation-delay: 0.3s;
      }
      .loading-corner-br {
        bottom: 0;
        right: 0;
        border-bottom-width: 2px;
        border-right-width: 2px;
        animation-delay: 0.45s;
      }
      @keyframes loading-corner-pulse {
        0%,
        100% {
          opacity: 0.35;
          box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);
        }
        50% {
          opacity: 1;
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.35);
        }
      }

      .loading-bar-fill {
        animation: loading-progress-fill 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      @keyframes loading-progress-fill {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }

      .loading-bar-shimmer {
        background: linear-gradient(
          105deg,
          transparent 0%,
          rgba(255, 255, 255, 0.45) 48%,
          rgba(255, 255, 255, 0.15) 52%,
          transparent 100%
        );
        background-size: 200% 100%;
        animation: loading-shimmer 1.2s ease-in-out infinite;
        mix-blend-mode: overlay;
      }
      @keyframes loading-shimmer {
        0% {
          background-position: 120% 0;
        }
        100% {
          background-position: -120% 0;
        }
      }
    `,
  ],
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  readonly visible = signal(true);
  readonly exiting = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.timer = setTimeout(() => {
      this.exiting.set(true);
      setTimeout(() => this.visible.set(false), 700);
    }, 1800);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
