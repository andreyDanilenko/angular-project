import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef // Добавляем ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    console.log('Making API request...');

    this.loading = true;
    this.error = null;
    this.data = null;
    this.cdr.detectChanges(); // Принудительно запускаем обнаружение изменений

    this.api.get('/articles/all').subscribe({
      next: (response: any) => {
        this.data = response;
        this.loading = false;
        console.log('API Response:', response);
        this.cdr.detectChanges(); // Обновляем представление после получения данных
      },
      error: (err: any) => {
        this.error = err.message || 'Failed to load data';
        this.loading = false;
        console.error('API Error:', err);
        this.cdr.detectChanges(); // Обновляем представление при ошибке
      }
    });
  }
}
