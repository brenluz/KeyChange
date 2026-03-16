import { Component, OnInit } from '@angular/core';
import { AddKeybindModal, Keybind } from '../add-keybind-modal/add-keybind-modal';
import { KeybindService } from '../keybind.service';

@Component({
  selector: 'app-user-keybinds',
  imports: [AddKeybindModal],
  templateUrl: './user-keybinds.html',
})
export class UserKeybinds implements OnInit{
  modalOpen = false;
  searchExpanded = false;
  keybinds: Keybind[] = [];
  filteredKeybinds = this.keybinds;

  constructor(private keybindService: KeybindService){}

  async ngOnInit() {
    this.keybinds = await this.keybindService.load()
    this.filteredKeybinds = [... this.keybinds]
  }
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

  async onKeybindAdded(keybind: Keybind) {
    this.keybinds.push(keybind);
    this.filteredKeybinds = [...this.keybinds];
    this.modalOpen = false;

    await this.keybindService.save(this.keybinds)
  } 


}


