import { Injectable } from '@angular/core';

/** Google Translate's global, created by its element.js script. */
declare const google: any;

/**
 * Language switcher glue for the hidden Google Translate widget.
 * Migrated from window.tdLang and the inline googleTranslateElementInit
 * script that every original page carried.
 *
 * The header template contains <div id="google_translate_element">; Google
 * fills it with a hidden <select class="goog-te-combo"> once its script loads.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private loaded = false;

  /** Loads Google's script once (the header calls this when it appears). */
  load(): void {
    if (this.loaded) return;
    this.loaded = true;

    (window as any).googleTranslateElementInit = () => {
      new google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,bn,ta,te,gu,mr,pa,kn,ml,ur,or',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element',
      );
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.defer = true;
    document.body.appendChild(script);
  }

  /**
   * Two-step switch so it works even when Google's widget hasn't built its
   * combo yet: set the googtrans cookie first (Google reads it on init), then
   * try to change the hidden combo for an instant switch. If the combo isn't
   * found within ~3 seconds, reload so Google translates on load from the cookie.
   */
  set(lang: string): void {
    const val = lang ? '/en/' + lang : '/en/en';
    const host = '.' + location.hostname.replace(/^www\./, '');
    document.cookie = 'googtrans=' + val + '; path=/';
    document.cookie = 'googtrans=' + val + '; path=/; domain=' + host;

    let attempts = 0;
    const tryCombo = () => {
      const combo = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
      if (combo) {
        combo.value = lang || '';
        combo.dispatchEvent(new Event('change'));
        return;
      }
      if (++attempts < 15) setTimeout(tryCombo, 200);
      else location.reload();
    };
    tryCombo();
  }
}
