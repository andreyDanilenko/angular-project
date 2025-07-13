import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private skipAuthUrls = ['/api/auth/login', '/api/auth/register'];

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.skipAuthCheck(request.url)) {
      return next.handle(request);
    }

    const authReq = this.addAuthToken(request);
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleUnauthorized();
        }
        return throwError(() => error);
      })
    );
  }

  private skipAuthCheck(url: string): boolean {
    return this.skipAuthUrls.some(skipUrl => url.includes(skipUrl));
  }

  private addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    return token ? request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }) : request;
  }

  private handleUnauthorized(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
