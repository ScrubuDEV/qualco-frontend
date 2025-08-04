import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-nations-homepage',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './nations-homepage.component.html',
  styleUrl: './nations-homepage.component.scss',
})
export class NationsHomepageComponent {}
