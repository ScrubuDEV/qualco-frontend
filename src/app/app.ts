import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('nations-frontend');

  private translate = inject(TranslateService);


  constructor() {
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }
  ngOnInit(): void {
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  getTranslation(): string {
    return this.translate.getCurrentLang();
  }
}
