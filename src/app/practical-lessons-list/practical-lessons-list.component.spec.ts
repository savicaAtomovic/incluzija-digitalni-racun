import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalLessonsListComponent } from './practical-lessons-list.component';

describe('PracticalLessonsListComponent', () => {
  let component: PracticalLessonsListComponent;
  let fixture: ComponentFixture<PracticalLessonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticalLessonsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticalLessonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
