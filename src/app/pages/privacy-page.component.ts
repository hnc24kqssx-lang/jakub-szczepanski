import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="relative min-h-screen bg-cyber-void/88 pt-24 pb-16">
      <article class="mx-auto max-w-3xl px-4 md:px-8">
        <a
          routerLink="/"
          class="font-mono text-sm text-cyber-cyan transition hover:text-cyber-ice active:scale-[0.99]"
          >← Powrót na stronę główną</a
        >
        <h1 class="mt-8 font-display text-4xl uppercase text-white md:text-5xl">Polityka prywatności</h1>
        <p class="mt-4 font-mono text-xs text-slate-500">Ostatnia aktualizacja: kwiecień 2026</p>

        <div class="prose prose-invert mt-10 max-w-none font-body text-slate-300">
          <h2 class="font-display text-2xl text-white">Administrator</h2>
          <p>
            Administratorem danych osobowych jest Jakub Szczepański (dalej: Administrator). Kontakt:
            poprzez formularz na stronie
            <a class="text-cyber-cyan hover:underline" routerLink="/kontakt">/kontakt</a>.
          </p>

          <h2 class="mt-10 font-display text-2xl text-white">Zakres danych</h2>
          <p>
            W ramach korzystania ze strony mogą być przetwarzane: adres IP, dane techniczne przeglądarki,
            dane podane dobrowolnie w formularzu kontaktowym (imię, e-mail, treść wiadomości) oraz
            informacje zapisane w plikach cookies — jeśli wyrazisz zgodę.
          </p>

          <h2 class="mt-10 font-display text-2xl text-white">Cele i podstawy prawne</h2>
          <ul class="list-disc space-y-2 pl-5">
            <li>udzielenie odpowiedzi na zapytanie — art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy) lub lit. f (prawnie uzasadniony interes: komunikacja);</li>
            <li>ewidencja korespondencji — prawnie uzasadniony interes Administratora;</li>
            <li>pliki cookies (funkcjonalne / analityczne) — zgoda użytkownika, o ile jest wymagana.</li>
          </ul>

          <h2 class="mt-10 font-display text-2xl text-white">EmailJS</h2>
          <p>
            Wiadomości z formularza są przekazywane za pośrednictwem usługi EmailJS (dostawca: EmailJS
            Inc.). Dane mogą być przetwarzane poza EOG — wtedy stosowane są standardowe klauzule umowne
            lub inne mechanizmy zgodne z RODO. Szczegóły znajdziesz w dokumentacji EmailJS.
          </p>

          <h2 class="mt-10 font-display text-2xl text-white">Okres przechowywania</h2>
          <p>
            Dane z formularza przechowywane są przez czas niezbędny do obsługi zapytania, a następnie
            przez okres przedawnienia roszczeń, o ile przepisy nie wymagają dłuższego archiwizowania.
          </p>

          <h2 class="mt-10 font-display text-2xl text-white">Prawa osób, których dane dotyczą</h2>
          <p>
            Przysługuje Ci prawo dostępu, sprostowania, usunięcia, ograniczenia przetwarzania,
            przenoszenia danych oraz wniesienia sprzeciwu — w zakresie przewidzianym przez RODO. Możesz
            złożyć skargę do Prezesa UODO.
          </p>

          <h2 class="mt-10 font-display text-2xl text-white">Pliki cookies</h2>
          <p>
            Strona może wykorzystywać pliki cookies niezbędne do działania serwisu oraz — za zgodą —
            cookies analityczne lub funkcjonalne. Możesz zarządzać cookies w ustawieniach przeglądarki.
          </p>
        </div>
      </article>
    </main>
  `,
})
export class PrivacyPageComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Polityka prywatności | Jakub Szczepański');
    this.meta.updateTag({
      name: 'description',
      content:
        'Polityka prywatności serwisu: administrator, zakres danych, cele przetwarzania, cookies, EmailJS.',
    });
  }
}
