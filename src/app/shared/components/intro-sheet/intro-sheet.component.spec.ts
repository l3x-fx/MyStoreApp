import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSheetComponent } from './intro-sheet.component';

describe('IntroSheetComponent', () => {
  let component: IntroSheetComponent;
  let fixture: ComponentFixture<IntroSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroSheetComponent]
    });
    fixture = TestBed.createComponent(IntroSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
