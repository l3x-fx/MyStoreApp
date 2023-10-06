import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbDeleteComponent } from './sb-delete.component';

describe('SbDeleteComponent', () => {
  let component: SbDeleteComponent;
  let fixture: ComponentFixture<SbDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbDeleteComponent]
    });
    fixture = TestBed.createComponent(SbDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
