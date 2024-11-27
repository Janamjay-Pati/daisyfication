import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookWorldComponent } from './my-book-world.component';

describe('MyBookWorldComponent', () => {
  let component: MyBookWorldComponent;
  let fixture: ComponentFixture<MyBookWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBookWorldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBookWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
