import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import axios from 'axios';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dev-cc.automateazy.com/api/v1/users/auth';
  private tokenKey = 'authToken';
  private currentUserKey = 'currentUser';
  private persistKey = 'persist';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      axios.post(this.apiUrl, { username, password })
        .then(response => {
          if (response.data && response.data.result) {
            const { token, ...user } = response.data.result;
            this.setToken(token);
            this.setCurrentUser(user);
            this.setPersist(response.data.tenantDetail);
            observer.next(response.data);
            observer.complete();
          } else {
            observer.error('Invalid response structure from server.');
          }
        })
        .catch(error => {
          const errorMessage = error.response?.data?.message || 'Login failed.';
          observer.error(errorMessage);
        });
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.currentUserKey) || '{}');
    }
    return null;
  }

  setCurrentUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }
  }

  getPersist(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.persistKey) || '{}');
    }
    return null;
  }

  setPersist(persist: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.persistKey, JSON.stringify(persist));
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.currentUserKey);
      localStorage.removeItem(this.persistKey);
    }
  }
}
