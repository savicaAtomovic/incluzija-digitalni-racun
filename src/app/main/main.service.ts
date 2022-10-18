import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  get images(): Observable<any> {
    return this.http.get('assets/main-page.json');
  }
}
