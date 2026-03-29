import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { invoke } from '@tauri-apps/api/core';

export interface AppEntry {
  name: string;
  path: string;
}

interface AppSection {
  label: string;
  apps: AppEntry[];
}

@Component({
  selector: 'app-app-picker-modal',
  imports: [MatIcon],
  templateUrl: './app-picker-modal.html',
  styleUrl: './app-picker-modal.css',
})

export class AppPickerModal {

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() appSelected = new EventEmitter<AppEntry>();

  recentApps: AppEntry[] = [];
  activeTab: 'presets' | 'recent' | 'browse' = 'presets';

  presets: AppEntry[] = [
    { name: 'Spotify', path: 'spotify' },
    { name: 'YouTube', path: 'https://youtube.com' },
    { name: 'Windows Settings', path: 'ms-settings:' },
    { name: 'File Explorer', path: 'explorer' },
    { name: 'Task Manager', path: 'taskmgr' },
    { name: 'Calculator', path: 'calc' },
    { name: 'Notepad', path: 'notepad' },
    { name: 'VS Code', path: 'code' },
    { name: 'Chrome', path: 'chrome' },
    { name: 'Discord', path: 'discord' },
  ];

  async ngOnInit() {
    this.recentApps = await invoke<AppEntry[]>('get_recent_apps');
  }

  select(app: AppEntry) {
    this.appSelected.emit(app);
  }

  close() {
    this.closed.emit();
  }

}
