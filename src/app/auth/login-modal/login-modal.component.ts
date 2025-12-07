import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  name: string = '';
  phone: string = '';
  password: string[] = [];
  selectedTabIndex: number = 0; // 0 for Login, 1 for Register
  errorMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // If there are any registered users, default to Login tab (0)
    // Otherwise default to Register tab (1) - optional, but good UX
    // For now, let's default to Login as requested "nudi sign in"
    this.selectedTabIndex = 0;
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
    this.errorMessage = '';
  }

  onPasswordChange(password: string[]) {
    this.password = password;
    this.errorMessage = '';
  }

  isValid(): boolean {
    if (this.selectedTabIndex === 0) { // Login
      return this.phone.length > 0 && this.password.length === 3;
    } else { // Register
      return this.name.length > 0 && this.phone.length > 0 && this.password.length === 3;
    }
  }

  submit() {
    if (this.selectedTabIndex === 0) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    const success = this.authService.loginWithPassword(this.phone, this.password);
    if (success) {
      this.dialogRef.close();
    } else {
      this.errorMessage = 'LOGIN.ERROR_LOGIN';
      this.password = [];
    }
  }

  register() {
    const success = this.authService.register(this.name, this.phone, this.password);
    if (success) {
      this.dialogRef.close();
    } else {
      this.errorMessage = 'LOGIN.ERROR_REGISTER';
      this.password = [];
    }
  }

  close() {
    this.dialogRef.close();
  }
}
