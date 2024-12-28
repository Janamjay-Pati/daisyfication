import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneLadderComponent } from './milestone-ladder.component';

describe('MilestoneLadderComponent', () => {
  let component: MilestoneLadderComponent;
  let fixture: ComponentFixture<MilestoneLadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilestoneLadderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilestoneLadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
