import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  public topbarTitle = new Subject<String>();
  constructor() {}
}
