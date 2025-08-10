import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordColorMapComponent } from './word-color-map.component';

describe('WordColorMapComponent', () => {
  let component: WordColorMapComponent;
  let fixture: ComponentFixture<WordColorMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordColorMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordColorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
