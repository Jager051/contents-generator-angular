import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../../../core/services/popup.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private popupService: PopupService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      if (confirmPassword?.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { firstName, lastName, email, password } = this.registerForm.value;

      this.authService.register({
        firstName,
        lastName,
        email,
        password
      }).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          if (response.isSuccess) {
            // Success - user is automatically logged in by AuthService
            console.log('✅ Register success - showing popup');
            this.popupService.showSuccess('Kayıt başarılı! Hoş geldiniz.', 'Başarılı');
            this.router.navigate(['/dashboard']);
          } else {
            // Handle validation errors
            console.log('❌ Register failed - showing error popup');
            if (response.validationErrors && response.validationErrors.length > 0) {
              const errorMessages = response.validationErrors.map((err: any) => err.message).join(', ');
              this.errorMessage = errorMessages;
              this.popupService.showError(errorMessages, 'Kayıt Hatası');
            } else {
              const errorMessage = response.message || 'Kayıt olurken bir hata oluştu';
              this.errorMessage = errorMessage;
              this.popupService.showError(errorMessage, 'Kayıt Hatası');
            }
          }
        },
        error: (error) => {
          this.isLoading = false;
          const errorMessage = error.message || 'Kayıt olurken bir hata oluştu';
          this.errorMessage = errorMessage;
          this.popupService.showError(errorMessage, 'Kayıt Hatası');
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.hasError('required')) {
      return `${this.getFieldName(field)} gereklidir`;
    }
    if (control?.hasError('email')) {
      return 'Geçerli bir e-posta adresi giriniz';
    }
    if (control?.hasError('minlength')) {
      return `${this.getFieldName(field)} en az ${control.errors?.['minlength'].requiredLength} karakter olmalıdır`;
    }
    if (control?.hasError('passwordMismatch')) {
      return 'Şifreler eşleşmiyor';
    }
    return '';
  }

  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      'firstName': 'Ad',
      'lastName': 'Soyad',
      'email': 'E-posta',
      'password': 'Şifre',
      'confirmPassword': 'Şifre tekrarı'
    };
    return fieldNames[field] || field;
  }
}

