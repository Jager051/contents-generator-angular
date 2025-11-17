import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../../../core/services/popup.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  isEmailSent = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private popupService: PopupService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email } = this.forgotPasswordForm.value;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.isEmailSent = true;
        this.isLoading = false;
        this.popupService.showSuccess('Şifre sıfırlama linki e-posta adresinize gönderildi.');
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        this.popupService.showError(this.errorMessage);
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.forgotPasswordForm.get(field);
    if (control?.hasError('required')) {
      return `${this.getFieldName(field)} gereklidir`;
    }
    if (control?.hasError('email')) {
      return 'Geçerli bir e-posta adresi giriniz';
    }
    return '';
  }

  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      'email': 'E-posta'
    };
    return fieldNames[field] || field;
  }
}

