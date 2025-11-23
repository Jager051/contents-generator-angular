import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../../../core/services/popup.service';
import { GlassCardComponent } from '../../../../core/components/glass-card/glass-card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GlassCardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private popupService: PopupService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          if (response.isSuccess) {
            // Success - user is automatically logged in by AuthService
            console.log('✅ Login success - showing popup');
            this.popupService.showSuccess('Giriş başarılı! Hoş geldiniz.', 'Başarılı');
            this.router.navigate(['/dashboard']);
          } else {
            // Handle validation errors
            console.log('❌ Login failed - showing error popup');
            if (response.validationErrors && response.validationErrors.length > 0) {
              const errorMessages = response.validationErrors.map((err: any) => err.message).join(', ');
              this.errorMessage = errorMessages;
              this.popupService.showError(errorMessages, 'Giriş Hatası');
            } else {
              const errorMessage = response.message || 'Giriş yapılırken bir hata oluştu';
              this.errorMessage = errorMessage;
              this.popupService.showError(errorMessage, 'Giriş Hatası');
            }
          }
        },
        error: (error) => {
          this.isLoading = false;
          const errorMessage = error.message || 'Giriş yapılırken bir hata oluştu';
          this.errorMessage = errorMessage;
          this.popupService.showError(errorMessage, 'Giriş Hatası');
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) {
      return `${field === 'email' ? 'E-posta' : 'Şifre'} gereklidir`;
    }
    if (control?.hasError('email')) {
      return 'Geçerli bir e-posta adresi giriniz';
    }
    if (control?.hasError('minlength')) {
      return 'Şifre en az 6 karakter olmalıdır';
    }
    return '';
  }
}
