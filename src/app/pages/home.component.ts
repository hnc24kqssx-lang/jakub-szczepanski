import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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

  readonly currentYear = new Date().getFullYear();

  readonly activeSlide = signal(0);

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
      items: [
        'HTML5 / semantyka',
        'CSS / SCSS',
        'JavaScript (ES202+)',
        'TypeScript',
        'Angular',
        'Tailwind CSS',
        'PHP',
        'Python',
        'Node.js',
      ],
    },
    {
      title: 'API i integracje',
      items: [
        'Angular',
        'REST API / JSON',
        'OpenAPI (Swagger)',
        'GraphQL',
        'Webhooks',
        'OAuth2 / JWT',
        'EmailJS',
      ],
    },
    {
      title: 'AI i automatyzacja',
      items: [
        'GPT-4.1',
        'GPT-4o',
        'Claude 3.5 Sonnet',
        'Gemini 1.5 Pro',
        'OpenAI API',
        'Anthropic API',
        'Google AI API',
        'Automatyzacje: Zapier / Make',
      ],
    },
  ] as const;

  readonly processSteps = [
    {
      id: '01',
      title: 'Rozmowa i cele',
      description:
        'Zaczynamy od krótkiej rozmowy o Twoim biznesie, odbiorcach i tym, co strona ma realnie dowozić.',
    },
    {
      id: '02',
      title: 'Zakres i plan działania',
      description:
        'Przygotowuję propozycję zakresu, estymację i kolejność prac. Od początku wiesz, co robimy i w jakim terminie.',
    },
    {
      id: '03',
      title: 'Projekt i development',
      description:
        'Buduję stronę etapami. Po każdym etapie dostajesz podgląd i możesz zgłaszać poprawki na bieżąco.',
    },
    {
      id: '04',
      title: 'Wdrożenie i opieka',
      description:
        'Publikuję stronę, konfiguruję domenę i przekazuję wszystko w uporządkowany sposób. Mogę też dalej wspierać rozwój.',
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
        'Stworzyłem nowoczesną stronę warsztatu z jasną ofertą, szybkim kontaktem i prostym formularzem dla klientów.',
      modalDescription:
        'W tym projekcie skupiłem się na tym, żeby klient szybko znalazł najważniejsze informacje: zakres usług, dane kontaktowe i możliwość wysłania zapytania. Zadbana została czytelność na telefonach, wyraźne przyciski CTA oraz intuicyjna ścieżka kontaktu. Dodałem też sekcje, które budują zaufanie: opis firmy, social media i prosty formularz z walidacją.',
      stack: [
        'Angular',
        'TypeScript',
        'Tailwind CSS',
        'RxJS',
        'Angular Reactive Forms',
        'Walidacja formularza',
        'Angular Router',
        'Mobile-first',
        'Semantyczny HTML5',
        'SEO',
        'Vercel',
      ],
      apis: [
        'EmailJS',
        'Linki tel:',
        'Integracje social media',
      ],
      demoUrl: 'https://autoexpress-nine.vercel.app',
      previewImage: '/photos/autoexpress.png',
    },
    {
      id: 'baltic',
      title: 'Baltic Ship Chandler — zaopatrzenie jednostek morskich',
      primaryTag: 'Angular',
      description:
        'Przygotowałem stronę firmową dla Baltic Ship Chandler, która jasno pokazuje profil działalności i wzmacnia wiarygodność marki.',
      modalDescription:
        'Tutaj postawiłem na prosty, profesjonalny przekaz dla branży morskiej. Strona od pierwszego ekranu komunikuje, czym firma się zajmuje i dla kogo świadczy usługi. Ważne było dla mnie uporządkowanie treści pod klienta B2B: czytelne nagłówki, mocny branding i dobra widoczność kluczowych fraz związanych z zaopatrzeniem statków.',
      stack: [
        'Angular',
        'TypeScript',
        'SCSS / CSS',
        'RxJS',
        'Angular Router',
        'Responsywny layout',
        'Optymalizacja grafiki',
        'Semantyczny HTML5',
        'SEO',
        'Vercel',
      ],
      apis: [
        'REST API (możliwość integracji)',
        'Integracje formularzy',
        'Integracje social media',
      ],
      demoUrl: 'https://balticsch.vercel.app',
      previewImage: '/photos/balticsch.png',
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
}
