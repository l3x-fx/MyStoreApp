import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbAddComponent } from './sb-add.component';

describe('SbAddComponent', () => {
  let component: SbAddComponent;
  let fixture: ComponentFixture<SbAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbAddComponent]
    });
    fixture = TestBed.createComponent(SbAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
