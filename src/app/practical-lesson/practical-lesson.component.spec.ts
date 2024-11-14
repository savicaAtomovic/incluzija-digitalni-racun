import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalLessonComponent } from './practical-lesson.component';

describe('PracticalLessonComponent', () => {
  let component: PracticalLessonComponent;
  let fixture: ComponentFixture<PracticalLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticalLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
