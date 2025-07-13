import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Article Page</h2>
    <button (click)="loadData()">Load Data</button>
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error" style="color: red">{{ error }}</div>
    <pre *ngIf="data">{{ data | json }}</pre>
  `
})
export class ArticlePage implements OnInit {
  loading = false;
  error: string | null = null;
  data: any = null;

  constructor(private api: ApiService) {}

  // Вариант 1: Загрузка при инициализации
  ngOnInit() {
    this.loadData();
  }

  // Вариант 2: Загрузка по клику (используется в шаблоне)
  loadData() {
    console.log('Making API request...');

    this.loading = true;
    this.error = null;

    this.api.get('/article').subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
        console.log('API Response:', response);
      },
      error: (err) => {
        this.error = err.message || 'Failed to load data';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }
}
