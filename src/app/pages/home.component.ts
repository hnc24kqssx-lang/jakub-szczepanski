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

  readonly whyMarketingPoints = [
    {
      title: 'Weryfikacja w sieci przed pierwszym kontaktem',
      text: 'Klienci i partnerzy zwykle sprawdzają firmę online, zanim nawiążą rozmowę. Aktualna, spójna witryna buduje wiarygodność i profesjonalny wizerunek już na etapie pierwszego wejścia.',
    },
    {
      title: 'Informacja dostępna poza godzinami pracy',
      text: 'Oferta, realizacje i dane kontaktowe są widoczne całą dobę — bez konieczności bieżącej obsługi kanałów bezpośrednich. To stały punkt styku z marką przy relatywnie niskim koszcie utrzymania.',
    },
    {
      title: 'Spójność komunikatu i identyfikacji',
      text: 'Ten sam przekaz, estetyka i obietnica co w materiałach sprzedażowych i w social media ograniczają chaos w odbiorze. Ułatwia to zapamiętanie marki i zaufanie do niej.',
    },
    {
      title: 'Krótka ścieżka do kontaktu',
      text: 'Jasny opis usług, argumenty „dlaczego warto” oraz wyraźne wezwanie do działania (formularz, telefon, e-mail) zmniejszają tarcie — użytkownik wie, co zrobić dalej, zamiast szukać informacji po całej witrynie.',
    },
  ] as const;

  readonly whyModernPoints = [
    {
      title: 'Wydajność i poprawny widok na urządzeniach mobilnych',
      text: 'Znaczna część ruchu pochodzi ze smartfonów. Opóźnienia ładowania i słaba ergonomia na małym ekranie zwiększają współczynnik porzuceń — bez względu na jakość samej oferty.',
    },
    {
      title: 'Utrzymanie techniczne pod kontrolą',
      text: 'Nowoczesna implementacja ułatwia HTTPS, aktualizacje zależności i kopie zapasowe. Dla zespołu IT lub osoby odpowiedzialnej za infrastrukturę oznacza to mniejsze ryzyko i przewidywalniejszy koszt utrzymania niż w przypadku przestarzałego CMS bez wsparcia.',
    },
    {
      title: 'Przygotowanie pod reklamy i widoczność w wyszukiwarce',
      text: 'Szybka, semantycznie poprawna strona z czytelną strukturą ułatwia kampanie płatne oraz prace SEO — bez konieczności przebudowy połowy serwisu w trakcie projektu marketingowego.',
    },
    {
      title: 'Skalowalność pod rozwój organizacji',
      text: 'Nowe usługi, wersje językowe, integracje z CRM czy narzędziami analitycznymi — sensownie zaprojektowana wizytówka da się rozbudować. Przeciwny przypadek często kończy się kosztownym startem od zera po kilkunastu miesiącach.',
    },
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
      title: 'Analiza potrzeb i cele',
      description:
        'Rozpoczynamy od ustaleń co do profilu działalności, grupy docelowej oraz mierzalnych oczekiwań wobec witryny (np. generowanie zapytań, prezentacja oferty, wsparcie sprzedaży).',
    },
    {
      id: '02',
      title: 'Zakres, harmonogram, koszt',
      description:
        'Przygotowuję propozycję zakresu prac, wstępną estymację nakładów oraz harmonogram etapów, aby od początku były jasne deliverables i terminy.',
    },
    {
      id: '03',
      title: 'Realizacja i iteracje',
      description:
        'Wdrożenie prowadzone jest etapami; po każdym etapie udostępniany jest podgląd, a uwagi i korekty są włączane na bieżąco, zgodnie z ustalonym modelem feedbacku.',
    },
    {
      id: '04',
      title: 'Publikacja i przekazanie',
      description:
        'Publikacja na docelowym hostingu, konfiguracja domeny oraz przekazanie dokumentacji i dostępów w uporządzonej formie. Po wdrożeniu możliwa jest dalsza opieka rozwojowa — według osobnych ustaleń.',
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
        'Witryna warsztatu: przejrzysta prezentacja usług, dane kontaktowe oraz formularz zapytania — z myślą o użytkownikach mobilnych.',
      modalDescription:
        'Priorytetem było skrócenie ścieżki do informacji kluczowych: zakres usług, lokalizacja i kontakt, wraz z możliwością wysłania wiadomości z poziomu strony. Zastosowano układ responsywny, wyraźne wezwania do działania oraz walidację pól formularza. Dodatkowe sekcje (m.in. opis działalności, odnośniki do profili społecznościowych) wspierają wiarygodność marki w kanale online.',
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
        'Serwis firmowy dla operatora zaopatrzenia jednostek pływających: klarowny przekaz branżowy, treści pod odbiorcę B2B oraz spójna identyfikacja wizualna.',
      modalDescription:
        'Projekt adresowany do segmentu morskiego B2B: już na pierwszym ekranie prezentowany jest profil działalności i grupa odbiorców. Treść uporządkowano pod kątem skanowania nagłówków i szybkiego dotarcia do informacji operacyjnych; nacisk położono na spójność z identyfikacją marki oraz na czytelność fraz związanych z zaopatrzeniem statków i logistyką portową.',
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
      demoUrl: 'https://balticshipch.vercel.app',
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
      'Jakub Szczepański — projektowanie i wdrażanie witryn internetowych',
    );
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Wdrożenia witryn WWW, front-end (m.in. Angular, Tailwind), integracje API. Wykształcenie informatyczne, certyfikaty kwalifikacyjne INF.02 i INF.03. Zapytania ofertowe — strona kontaktowa.',
      },
      {
        name: 'keywords',
        content:
          'strony internetowe, web developer, Angular, TypeScript, Tailwind, INF.02, INF.03, integracje API, front-end',
      },
      { property: 'og:title', content: 'Jakub Szczepański — witryny internetowe i front-end' },
      {
        property: 'og:description',
        content:
          'Realizacje demonstracyjne, opis kompetencji technicznych oraz dane kontaktowe — w jednym serwisie.',
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
