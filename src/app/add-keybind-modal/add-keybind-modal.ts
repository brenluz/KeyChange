import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppPickerModal, AppEntry } from "../app-picker-modal/app-picker-modal";

export interface Keybind {
  name: string;
  keyCombo: string;
  action: string;
}

@Component({
  selector: 'app-add-keybind-modal',
  imports: [FormsModule, AppPickerModal],
  templateUrl: './add-keybind-modal.html',
})
export class AddKeybindModal implements OnChanges {
  @Input() isOpen = false;
  @Input() keybindToEdit: Keybind | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() keybindAdded = new EventEmitter<Keybind>();
  @Output() keybindEdited = new EventEmitter<Keybind>();

  newName = '';
  newKeyCombo = '';
  newAction = '';
  selectedPreset = '';
  recording = false;
  pressedKeys = new Set<string>();

  pickerOpen = false;


  ngOnChanges() {
    if (this.keybindToEdit) {
      this.newName = this.keybindToEdit.name;
      this.newKeyCombo = this.keybindToEdit.keyCombo;
      this.newAction = this.keybindToEdit.action;
    }
  }

  recordKey(event: KeyboardEvent) {
    event.preventDefault();

    const modifiers = ['CTRL', 'ALT', 'SHIFT', 'SUPER']
    const formatted = this.formatKey(event.key)

    if (modifiers.includes(formatted)){
      this.pressedKeys.add(formatted);
    }
    else {
      const existing = Array.from(this.pressedKeys).filter(k => !modifiers.includes(k));
      existing.forEach(k => this.pressedKeys.delete(k));
      this.pressedKeys.add(formatted);
    }

    this.newKeyCombo = Array.from(this.pressedKeys).join('+');

  }

  stopRecording(event: KeyboardEvent) {
    if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
      this.pressedKeys.clear();
    }
  }

  formatKey(key: string): string {
    const map: Record<string, string> = {
      Control: 'CTRL',
      Alt: 'ALT',
      Shift: 'SHIFT',
      Meta: 'SUPER',
      ' ': 'Space',
      ArrowUp: 'Up',
      ArrowDown: 'Down',
      ArrowLeft: 'Left',
      ArrowRight: 'Right',
    };
    return map[key] ?? key.toUpperCase();
  }

  save() {
    if (!this.newName || !this.newKeyCombo || !this.newAction) return;
    const keybind: Keybind = { name: this.newName, keyCombo: this.newKeyCombo, action: this.newAction };
    if (this.keybindToEdit) {
      this.keybindEdited.emit(keybind);
    } else {
      this.keybindAdded.emit(keybind);
    }
    this.reset();
  }

  close() {
    this.closed.emit();
    this.reset();
  }

  reset() {
    this.newName = '';
    this.newKeyCombo = '';
    this.newAction = '';
    this.selectedPreset = '';
    this.pressedKeys.clear();
    this.recording = false;
  }

  onAppSelected(app: AppEntry){
    this.newAction = app.path;
    if (!this.newName) this.newName = app.name;
    this.pickerOpen = false;
  }

}