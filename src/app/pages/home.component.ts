import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { RouterLink } from '@angular/router';
import { PortfolioModalComponent } from '../components/portfolio-modal.component';
import type { PortfolioProject } from '../models/portfolio-project.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollRevealDirective,
    RouterLink,
    PortfolioModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly fb = inject(FormBuilder);

  readonly currentYear = new Date().getFullYear();

  readonly activeSlide = signal(0);
  readonly formStatus = signal<'idle' | 'sending' | 'ok' | 'err'>('idle');

  private slideTimer?: ReturnType<typeof setInterval>;

  readonly heroImages = [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1517180101976-9df8eac83cc0?auto=format&fit=crop&w=1920&q=80',
  ] as const;

  readonly stackGroups = [
    {
      title: 'Frontend i języki',
      items: ['TypeScript', 'JavaScript (ES202+)', 'Angular', 'HTML5 / semantyka', 'SCSS / CSS', 'Tailwind CSS', 'RxJS'],
    },
    {
      title: 'API i integracje',
      items: ['REST / JSON', 'GraphQL', 'OpenAPI (Swagger)', 'Webhooks', 'OAuth2 / JWT', 'WebSockets'],
    },
    {
      title: 'AI i automatyzacja (agenty)',
      items: [
        'OpenAI API',
        'Anthropic API',
        'MCP (Model Context Protocol)',
        'LangChain / LCEL',
        'RAG / embedding API',
        'Function calling & tool use',
        'Zapier / Make (webhooks)',
      ],
    },
  ] as const;

  readonly modalProject = signal<PortfolioProject | null>(null);
  readonly modalOrigin = signal<DOMRect | null>(null);

  readonly portfolioProjects: readonly PortfolioProject[] = [
    {
      id: 'autoexpress',
      title: 'Autoexpress — warsztat samochodowy (Trzeszczyn)',
      primaryTag: 'Angular',
      description:
        'Wizytówka warsztatu Autoexpress (Szymon i Piotr Pełka): diagnostyka, naprawy i obsługa flot — z formularzem i kontaktem.',
      modalDescription:
        'Strona autoexpress-nine.vercel.app to jednostronicowa wizytówka pod branżę motoryzacyjną. W hero komunikowana jest kompleksowa obsługa pojazdów — od diagnostyki po naprawy — z wyraźnymi CTA: połączenie telefoniczne, przewinięcie do formularza oraz linki do Facebooka i Instagrama. Sekcja „O warsztacie” w punktach prezentuje: diagnostykę i naprawy mechaniczne, obsługę flot i aut prywatnych oraz indywidualne podejście do klienta. „Kontakt” zbiera telefon, lokalizację (Trzeszczyn), social media i formularz z polami wymaganymi, walidacją oraz zgodą na przetwarzanie danych i linkiem do polityki prywatności — zgodnie z oczekiwaniami RODO. Układ jest responsywny, typografia i hierarchia nagłówków wspierają SEO i czytelność na telefonie.',
      stack: [
        'Angular',
        'TypeScript',
        'Tailwind CSS',
        'RxJS',
        'Angular Forms (Reactive)',
        'Walidatory formularza',
        'Angular Router (kotwice / #formularz)',
        'Responsywność mobile-first',
        'Semantyczny HTML5',
        'SEO (meta / tytuł strony)',
        'Vercel (hosting statyczny)',
      ],
      apis: [
        'Linki tel: / kotwice do sekcji (#formularz)',
        'Integracja z social (Facebook, Instagram — linki zewnętrzne)',
        'Formularz kontaktowy po stronie klienta (walidacja, zgoda RODO)',
      ],
      demoUrl: 'https://autoexpress-nine.vercel.app',
      previewImage: '/photos/autoexpress.png',
    },
    {
      id: 'baltic',
      title: 'Baltic Ship Chandler — zaopatrzenie jednostek morskich',
      primaryTag: 'Angular',
      description:
        'Wizytówka ship chandlera w Szczecinie: branding morski i obsługa zaopatrzenia statków na Bałtyku.',
      modalDescription:
        'Projekt balticsch.vercel.app prezentuje firmę Baltic Ship Chandler — podmiot z branży morskiej (ship chandler), specjalizujący się w zaopatrzeniu jednostek pływających, z naciskiem na region Bałtyku i Szczecin. To firma usługowa dla żeglugi, nie placówka edukacyjna: w tytule i SEO widać m.in. „Ship chandler Szczecin” oraz „Zaopatrzenie statków Bałtyk”. Strona buduje wiarygodność poprzez identyfikację wizualną (m.in. logo w zasobach) i czytelny, profesjonalny ton pod klientów z sektora maritime — z myślą o rozpoznawalności marki w branży.',
      stack: [
        'Angular',
        'TypeScript',
        'SCSS / CSS',
        'RxJS',
        'Angular Router',
        'Responsywny layout',
        'Optymalizacja grafiki (logo / zasoby firmowe)',
        'Semantyczny HTML5',
        'SEO (tytuł, opis pod branżę morską i lokalnie Szczecin)',
        'Vercel (wdrożenie produkcyjne)',
      ],
      apis: [
        'Statyczne zasoby (logo / company-photos)',
        'Branding pod sektor maritime (ship chandler)',
      ],
      demoUrl: 'https://balticsch.vercel.app',
      previewImage: '/photos/balticsch.png',
    },
    {
      id: 'private-slot',
      title: 'System wewnętrzny — NDA',
      primaryTag: 'Node.js',
      description: 'Aplikacja prywatna — szczegóły po kontakcie.',
      modalDescription:
        'Backend z autoryzacją JWT, panel administracyjny i integracja z bazą dokumentów. Ze względu na NDA nie udostępniam publicznego podglądu — mogę opisać architekturę na spotkaniu.',
      stack: ['Node.js', 'Express', 'MongoDB', 'Docker', 'JWT'],
      apis: ['REST', 'Webhooks', 'Stripe (placeholder)'],
      demoUrl: 'https://example.com',
      isPrivate: true,
    },
  ];

  openPortfolioModal(project: PortfolioProject, event: Event): void {
    const el = event.currentTarget as HTMLElement | null;
    if (!el) return;
    this.modalOrigin.set(el.getBoundingClientRect());
    this.modalProject.set(project);
  }

  onPortfolioModalClosed(): void {
    this.modalProject.set(null);
    this.modalOrigin.set(null);
  }

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.title.setTitle(
      'Jakub Szczepański — tworzenie stron internetowych | Web Developer',
    );
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Programista stron internetowych. Technikum informatyczne, certyfikaty INF.02 i INF.03. Angular, Tailwind, API i integracje AI. Zapytaj o wycenę.',
      },
      { name: 'keywords', content: 'web developer, strony www, Angular, Tailwind, INF.02, INF.03, AI API' },
      { property: 'og:title', content: 'Jakub Szczepański — Web Developer' },
      {
        property: 'og:description',
        content: 'Nowoczesne strony i integracje. Portfolio na żywo, kontakt w jednym miejscu.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: environment.siteUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]);

    this.slideTimer = setInterval(() => {
      this.activeSlide.update((i) => (i + 1) % this.heroImages.length);
    }, 4500);
  }

  ngOnDestroy(): void {
    if (this.slideTimer) clearInterval(this.slideTimer);
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
