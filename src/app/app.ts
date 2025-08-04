import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from './services/translation.service';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('nations-frontend');

  private translationService = inject(TranslationService);

  currentLang = signal<string>('en');

  ngOnInit() {
    this.translationService.currentLang$.subscribe((lang) => {
      this.currentLang.set(lang);
    });
  }

  switchLanguage(lang: string): void {
    this.translationService.setLanguage(lang);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
