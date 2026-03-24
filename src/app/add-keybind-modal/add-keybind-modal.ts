import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Keybind {
  name: string;
  keyCombo: string;
  action: string;
}

interface Preset {
  label: string;
  path: string;
}

@Component({
  selector: 'app-add-keybind-modal',
  imports: [FormsModule],
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

  presets: Preset[] = [
    { label: 'Spotify', path: 'spotify' },
    { label: 'YouTube', path: 'https://youtube.com' },
    { label: 'Windows Settings', path: 'ms-settings:' },
    { label: 'File Explorer', path: 'explorer' },
    { label: 'Task Manager', path: 'taskmgr' },
    { label: 'Calculator', path: 'calc' },
    { label: 'Notepad', path: 'notepad' },
    { label: 'VS Code', path: 'code' },
  ];

  ngOnChanges() {
    if (this.keybindToEdit) {
      this.newName = this.keybindToEdit.name;
      this.newKeyCombo = this.keybindToEdit.keyCombo;
      this.newAction = this.keybindToEdit.action;
      this.selectedPreset = this.presets.find(p => p.path === this.keybindToEdit!.action)?.path ?? '';
    }
  }

  onPresetChange(value: string) {
    this.newAction = value;
  }

  recordKey(event: KeyboardEvent) {
    event.preventDefault();
    this.pressedKeys.add(this.formatKey(event.key));
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
}