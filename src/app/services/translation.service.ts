import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

export interface TranslationData {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = signal<string>('en');
  private translations = signal<TranslationData>({});
  private http = inject(HttpClient);

  currentLang$ = new BehaviorSubject<string>('en');

  constructor() {
    // Load initial language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.setLanguage(savedLang);
  }

  async setLanguage(lang: string): Promise<void> {
    try {
      // Load translation file using HttpClient
      const translations = await firstValueFrom(
        this.http.get<TranslationData>(`/assets/i18n/${lang}.json`),
      );

      this.translations.set(translations);
      this.currentLanguage.set(lang);
      this.currentLang$.next(lang);

      // Save to localStorage
      localStorage.setItem('selectedLanguage', lang);

      // Update document language
      document.documentElement.lang = lang;
    } catch (error) {
      console.error(`Failed to load translations for language: ${lang}`, error);
      // Fallback to English
      if (lang !== 'en') {
        this.setLanguage('en');
      }
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage();
  }

  getTranslation(key: string): string {
    const translations = this.translations();
    return translations[key] || key;
  }

  // Method to get all translations (useful for template binding)
  getTranslations(): TranslationData {
    return this.translations();
  }
}
