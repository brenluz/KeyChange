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
  searchExpanded = false;
  keybinds: Keybind[] = [
    { name: 'Spotify', keyCombo: 'Ctrl+Shift+S'},
    { name: 'YouTube', keyCombo: 'Ctrl+Shift+Y' }
  ];
  filteredKeybinds = this.keybinds;
  onSearch(event: Event){
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredKeybinds = this.keybinds.filter(k =>
        k.name.toLowerCase().includes(query) ||
        k.keyCombo.toLowerCase().includes(query)
    );
  }
}


