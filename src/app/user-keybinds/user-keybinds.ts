import { Component } from '@angular/core';
import { AddKeybindModal, Keybind } from '../add-keybind-modal/add-keybind-modal';

@Component({
  selector: 'app-user-keybinds',
  imports: [AddKeybindModal],
  templateUrl: './user-keybinds.html',
})
export class UserKeybinds {
  modalOpen = false;
  searchExpanded = false;
  keybinds: Keybind[] = [];
  filteredKeybinds = this.keybinds;

  onSearch(event: Event){
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredKeybinds = this.keybinds.filter(k =>
        k.name.toLowerCase().includes(query) ||
        k.keyCombo.toLowerCase().includes(query)
    );
  }

  openPopup(){
    this.modalOpen = true;
  }

  onKeybindAdded(keybind: Keybind) {
    this.keybinds.push(keybind);
    this.filteredKeybinds = [...this.keybinds];
    this.modalOpen = false;
  } 
}


