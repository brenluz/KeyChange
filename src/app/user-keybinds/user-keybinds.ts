import { Component } from '@angular/core';

import { MatDividerModule } from  '@angular/material/divider';

export interface Keybind {
  name: string;
  keyCombo: string;
}

@Component({
  selector: 'app-user-keybinds',
  imports: [MatDividerModule],
  templateUrl: './user-keybinds.html',
})
export class UserKeybinds {
  keybinds: Keybind[] = [
    { name: 'spotify', keyCombo: 'Ctrl+Shift+S'},
    { name: 'YouTube', keyCombo: 'Ctrl+Shift+Y' }
  ];
}


