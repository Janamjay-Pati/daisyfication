import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewChapterComponent } from './add-new-chapter.component';

describe('AddNewChapterComponent', () => {
  let component: AddNewChapterComponent;
  let fixture: ComponentFixture<AddNewChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
