import { TestBed } from '@angular/core/testing';

import { PracticalLessonsService } from './practical-lessons.service';

describe('PracticalLessonsService', () => {
  let service: PracticalLessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticalLessonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
