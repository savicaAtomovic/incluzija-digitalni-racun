import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopbarTitleService {
  public topbarTitle = new Subject<String>();
  constructor() {}
}
