import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeybindModal } from './add-keybind-modal';

describe('AddKeybindModal', () => {
  let component: AddKeybindModal;
  let fixture: ComponentFixture<AddKeybindModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddKeybindModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKeybindModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
