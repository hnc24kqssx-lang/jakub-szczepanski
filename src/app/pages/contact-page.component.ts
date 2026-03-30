import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="relative min-h-screen pt-24 pb-16">
      <section class="mx-auto max-w-7xl px-4 md:px-10">
        <a
          routerLink="/"
          class="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan transition hover:text-cyber-ice"
          >← Powrót na stronę główną</a
        >

        <div class="mt-8 grid gap-10 lg:grid-cols-2">
          <article class="space-y-6 rounded-xl border border-cyber-line/50 bg-cyber-panel/35 p-6">
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.35em] text-cyber-cyan">Kontakt</p>
              <h1 class="mt-2 font-display text-4xl uppercase text-white md:text-5xl">
                Napisz lub zadzwoń
              </h1>
              <p class="mt-4 font-body text-slate-300">
                Odpowiadam na wiadomości dotyczące stron internetowych, modernizacji istniejących
                projektów i stałej współpracy.
              </p>
            </div>

            <div class="space-y-3 font-body text-slate-200">
              <p>
                <span class="font-mono text-cyber-cyan">Telefon:</span>
                <a href="tel:+48796290707" class="ml-2 hover:text-cyber-cyan">+48 796 290 707</a>
              </p>
              <p>
                <span class="font-mono text-cyber-cyan">E-mail:</span>
                <a href="mailto:jakubszczepanski@10g.pl" class="ml-2 hover:text-cyber-cyan"
                  >jakubszczepanski&#64;10g.pl</a
                >
              </p>
              <p>
                <span class="font-mono text-cyber-cyan">Instagram:</span>
                <a
                  href="https://www.instagram.com/szczeepaann_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ml-2 hover:text-cyber-cyan"
                  >&#64;szczeepaann_</a
                >
              </p>
              <p>
                <span class="font-mono text-cyber-cyan">Facebook:</span>
                <a
                  href="https://www.facebook.com/szczeepanw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ml-2 hover:text-cyber-cyan"
                  >/szczeepanw</a
                >
              </p>
            </div>
          </article>

          <form
            class="space-y-5 rounded-xl border border-cyber-line/50 bg-cyber-panel/35 p-6 shadow-[inset_0_0_0_1px_rgba(0,212,255,0.06)] backdrop-blur-sm"
            [formGroup]="contactForm"
            (ngSubmit)="onSubmit()"
            novalidate
          >
            <label for="name" class="mb-1 block font-mono text-xs uppercase tracking-widest text-cyber-ice"
              >Imię i nazwisko</label
            >
            <input
              id="name"
              type="text"
              formControlName="name"
              autocomplete="name"
              class="w-full rounded border border-cyber-line bg-cyber-deep/80 px-4 py-3 font-body text-slate-100 outline-none ring-cyber-cyan/40 transition placeholder:text-slate-600 focus:border-cyber-cyan focus:ring-2"
              placeholder="Jan Kowalski"
            />
            @if (contactForm.controls.name.touched && contactForm.controls.name.invalid) {
              <p class="mt-1 text-xs text-red-400">Podaj co najmniej 2 znaki.</p>
            }

            <label
              for="email"
              class="mb-1 block font-mono text-xs uppercase tracking-widest text-cyber-ice"
              >E-mail</label
            >
            <input
              id="email"
              type="email"
              formControlName="email"
              autocomplete="email"
              class="w-full rounded border border-cyber-line bg-cyber-deep/80 px-4 py-3 font-body text-slate-100 outline-none ring-cyber-cyan/40 transition placeholder:text-slate-600 focus:border-cyber-cyan focus:ring-2"
              placeholder="jan@firma.pl"
            />
            @if (contactForm.controls.email.touched && contactForm.controls.email.invalid) {
              <p class="mt-1 text-xs text-red-400">Podaj poprawny adres e-mail.</p>
            }

            <label
              for="message"
              class="mb-1 block font-mono text-xs uppercase tracking-widest text-cyber-ice"
              >Wiadomość</label
            >
            <textarea
              id="message"
              formControlName="message"
              rows="6"
              class="w-full resize-y rounded border border-cyber-line bg-cyber-deep/80 px-4 py-3 font-body text-slate-100 outline-none ring-cyber-cyan/40 transition placeholder:text-slate-600 focus:border-cyber-cyan focus:ring-2"
              placeholder="Opisz projekt, budżet i termin..."
            ></textarea>
            @if (contactForm.controls.message.touched && contactForm.controls.message.invalid) {
              <p class="mt-1 text-xs text-red-400">Minimum 10 znaków.</p>
            }

            <button
              type="submit"
              class="w-full rounded-lg border border-cyber-cyan/50 bg-cyber-cyan/15 py-3 font-mono text-sm uppercase tracking-[0.2em] text-cyber-cyan shadow-neon transition hover:bg-cyber-cyan/25 disabled:opacity-50 active:scale-[0.99]"
              [disabled]="formStatus() === 'sending'"
            >
              @if (formStatus() === 'sending') {
                Wysyłanie…
              } @else {
                Wyślij
              }
            </button>

            @if (formStatus() === 'ok') {
              <p class="font-mono text-sm text-emerald-400" role="status">
                Wysłano. Dziękuję — odezwę się wkrótce.
              </p>
            }
            @if (formStatus() === 'err') {
              <p class="font-mono text-sm text-red-400" role="alert">
                Nie udało się wysłać. Sprawdź konfigurację EmailJS i spróbuj ponownie.
              </p>
            }
          </form>
        </div>
      </section>
    </main>
  `,
})
export class ContactPageComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly fb = inject(FormBuilder);

  readonly formStatus = signal<'idle' | 'sending' | 'ok' | 'err'>('idle');

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.title.setTitle('Kontakt | Jakub Szczepański — Web Developer');
    this.meta.updateTag({
      name: 'description',
      content:
        'Skontaktuj się ze mną w sprawie strony internetowej. Telefon, e-mail, social media i formularz kontaktowy.',
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const { emailjs: e } = environment;
    if (
      e.publicKey === 'YOUR_PUBLIC_KEY' ||
      e.serviceId === 'YOUR_SERVICE_ID' ||
      e.templateId === 'YOUR_TEMPLATE_ID'
    ) {
      this.formStatus.set('err');
      return;
    }

    this.formStatus.set('sending');
    const v = this.contactForm.getRawValue();
    try {
      await emailjs.send(
        e.serviceId,
        e.templateId,
        {
          from_name: v.name,
          from_email: v.email,
          message: v.message,
          reply_to: v.email,
        },
        { publicKey: e.publicKey },
      );
      this.formStatus.set('ok');
      this.contactForm.reset();
    } catch {
      this.formStatus.set('err');
    }
  }
}
