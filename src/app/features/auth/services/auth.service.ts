import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { 
  GenericResponse, 
  GenericResponseHelper 
} from '../../../core/models/generic-response.model';
import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthData, 
  LoginResponse, 
  RegisterResponse, 
  UserResponse, 
  TokenValidationResponse 
} from '../../../core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Token'ı localStorage'dan kontrol et
    const token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUser().subscribe();
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (GenericResponseHelper.isSuccess(response)) {
          const authData = GenericResponseHelper.getData(response);
          if (authData?.token && authData?.user) {
            localStorage.setItem('token', authData.token);
            this.currentUserSubject.next(authData.user);
          }
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/auth/register`, userData).pipe(
      tap(response => {
        if (GenericResponseHelper.isSuccess(response)) {
          const authData = GenericResponseHelper.getData(response);
          if (authData?.token && authData?.user) {
            localStorage.setItem('token', authData.token);
            this.currentUserSubject.next(authData.user);
          }
        }
      }),
      catchError(error => {
        console.error('Register error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<GenericResponse<boolean>> {
    const token = this.getToken();
    
    // If no token, just clear local state
    if (!token) {
      localStorage.removeItem('token');
      this.currentUserSubject.next(null);
      this.router.navigate(['/auth/login']);
      return new Observable(observer => {
        observer.next({
          isSuccess: true,
          message: 'Logout successful',
          value: true,
          timestamp: new Date().toISOString()
        } as GenericResponse<boolean>);
        observer.complete();
      });
    }

    // Call logout API to invalidate token on server
    return this.http.post<GenericResponse<boolean>>(`${this.API_URL}/auth/logout`, {}).pipe(
      tap(() => {
        // Clear local storage and state regardless of API response
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => {
        // Even if API call fails, clear local state
        console.error('Logout API error:', error);
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
        return throwError(() => error);
      })
    );
  }

  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API_URL}/auth/user`).pipe(
      tap(response => {
        if (GenericResponseHelper.isSuccess(response)) {
          const user = GenericResponseHelper.getData(response);
          if (user) {
            this.currentUserSubject.next(user);
          }
        }
      }),
      catchError(error => {
        console.error('Get current user error:', error);
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  forgotPassword(email: string): Observable<GenericResponse<boolean>> {
    return this.http.post<GenericResponse<boolean>>(`${this.API_URL}/auth/forgot-password`, { email }).pipe(
      catchError(error => {
        console.error('Forgot password error:', error);
        return throwError(() => error);
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<GenericResponse<boolean>> {
    return this.http.post<GenericResponse<boolean>>(`${this.API_URL}/auth/reset-password`, {
      token,
      newPassword
    }).pipe(
      catchError(error => {
        console.error('Reset password error:', error);
        return throwError(() => error);
      })
    );
  }
}
