import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPickerModal } from './app-picker-modal';

describe('AppPickerModal', () => {
  let component: AppPickerModal;
  let fixture: ComponentFixture<AppPickerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPickerModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPickerModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
