import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideShowWrapperComponent } from './slide-show-wrapper.component';

describe('SlideShowWrapperComponent', () => {
  let component: SlideShowWrapperComponent;
  let fixture: ComponentFixture<SlideShowWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideShowWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideShowWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
