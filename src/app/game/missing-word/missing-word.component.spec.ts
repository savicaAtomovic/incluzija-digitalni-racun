import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingWordComponent } from './missing-word.component';

describe('MissingWordComponent', () => {
  let component: MissingWordComponent;
  let fixture: ComponentFixture<MissingWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
