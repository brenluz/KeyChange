import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKeybinds } from './user-keybinds';

describe('UserKeybinds', () => {
  let component: UserKeybinds;
  let fixture: ComponentFixture<UserKeybinds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserKeybinds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKeybinds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
