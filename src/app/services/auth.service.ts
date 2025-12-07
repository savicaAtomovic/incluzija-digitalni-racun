import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  phone: string;
  password?: string[];
}

export interface RegisteredUser {
  name: string;
  phone: string;
  password: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  
  private STORAGE_KEY = 'registered_users';

  constructor() {
    // Check if user is already logged in from session storage
    const currentUser = sessionStorage.getItem('current_user');
    if (currentUser) {
      this.userSubject.next(JSON.parse(currentUser));
    }
  }

  // Check if user is already registered
  isUserRegistered(phone: string): boolean {
    const users = this.getRegisteredUsers();
    return users.some(u => u.phone === phone);
  }

  // Get registered user by phone
  getRegisteredUser(phone: string): RegisteredUser | undefined {
    const users = this.getRegisteredUsers();
    return users.find(u => u.phone === phone);
  }

  // Register new user
  register(name: string, phone: string, password: string[]): boolean {
    if (this.isUserRegistered(phone)) {
      return false;
    }
    
    const users = this.getRegisteredUsers();
    users.push({ name, phone, password });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    
    // Auto login after registration
    this.login(name, phone);
    return true;
  }

  // Login existing user
  loginWithPassword(phone: string, password: string[]): boolean {
    const user = this.getRegisteredUser(phone);
    if (!user) {
      return false;
    }
    
    // Verify password
    if (JSON.stringify(user.password) !== JSON.stringify(password)) {
      return false;
    }
    
    this.login(user.name, user.phone);
    return true;
  }

  // Simple login (sets current user)
  login(name: string, phone: string) {
    const user = { name, phone };
    this.userSubject.next(user);
    sessionStorage.setItem('current_user', JSON.stringify(user));
  }

  logout() {
    this.userSubject.next(null);
    sessionStorage.removeItem('current_user');
  }

  get currentUserValue(): User | null {
    return this.userSubject.value;
  }

  private getRegisteredUsers(): RegisteredUser[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }
}
