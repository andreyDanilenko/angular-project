import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeToken();
  }

  private initializeToken(): void {
    if (this.isBrowser) {
      this.tokenSubject.next(this.getTokenFromCookie());
    }
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/auth/login`,
      credentials,
      { withCredentials: true }
    ).pipe(
      tap(() => {
        if (this.isBrowser) {
          this.tokenSubject.next(this.getTokenFromCookie());
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      this.deleteTokenCookie();
    }
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.isBrowser ? this.getTokenFromCookie() : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private getTokenFromCookie(): string | null {
    if (!this.isBrowser) return null;
    const match = document.cookie.match(/auth_token=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  private deleteTokenCookie(): void {
    if (!this.isBrowser) return;
    document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
