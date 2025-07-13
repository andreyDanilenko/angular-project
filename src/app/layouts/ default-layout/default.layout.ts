import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Добавляем RouterLink в imports
  templateUrl: './default.layout.component.html',
  styles: [
    `:host { display: block; height: 100vh; }`,
    `nav { display: flex; gap: 1rem; padding: 1rem; }`,
    `a { text-decoration: none; }`
  ]
})
export class DefaultLayout {
  // Внедряем сервис через конструктор
  constructor(public themeService: ThemeService) {}
}
