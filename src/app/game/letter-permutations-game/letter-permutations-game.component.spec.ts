import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterPermutationsGameComponent } from './letter-permutations-game.component';

describe('LetterPermutationsGameComponent', () => {
  let component: LetterPermutationsGameComponent;
  let fixture: ComponentFixture<LetterPermutationsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterPermutationsGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterPermutationsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
