import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface Keybind{
  name: string;
  keyCombo: string;
}

@Component({
  selector: 'app-add-keybind-modal',
  imports: [FormsModule],
  templateUrl: './add-keybind-modal.html',
})
export class AddKeybindModal {
  @Input() isOpen = false
  @Output() closed = new EventEmitter<void>()
  @Output() keybindAdded = new EventEmitter<Keybind>();

  newName = ""
  newKeyCombo = ""
  recording = false;
  pressedKeys = new Set<string>();

  recordKey(event: KeyboardEvent){
    event.preventDefault();
    this.pressedKeys.add(this.formatKey(event.key))
    this.newKeyCombo = Array.from(this.pressedKeys).join(" + ")
  }
  
  stopRecording(event: KeyboardEvent) {
    // clear pressed keys on keyup so next combo starts fresh
    if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
        this.pressedKeys.clear();
    }
  }

  formatKey(key: string): string {
    const map: Record<string, string> = {
        Control: 'Ctrl',
        Meta: 'Win',
        ' ': 'Space',
        ArrowUp: '↑',
        ArrowDown: '↓',
        ArrowLeft: '←',
        ArrowRight: '→',
    };
    return map[key] ?? key;
  }

  save() {
    if (!this.newName || !this.newKeyCombo) return;
    this.keybindAdded.emit({ name: this.newName, keyCombo: this.newKeyCombo });
    this.reset();
  }

  close() {
    this.closed.emit();
    this.reset();
  }

  reset() {
      this.newName = '';
      this.newKeyCombo = '';
      this.pressedKeys.clear();
      this.recording = false;
  }
}
