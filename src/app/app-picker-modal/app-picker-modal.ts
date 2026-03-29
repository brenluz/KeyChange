import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { invoke } from '@tauri-apps/api/core';
import { open as openDialog } from '@tauri-apps/plugin-dialog';

export interface AppEntry {
  name: string;
  path: string;
}

@Component({
  selector: 'app-app-picker-modal',
  imports: [MatIcon, FormsModule],
  templateUrl: './app-picker-modal.html',
  styleUrl: './app-picker-modal.css',
})

export class AppPickerModal {

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() appSelected = new EventEmitter<AppEntry>();

  recentApps: AppEntry[] = [];
  activeTab: 'presets' | 'recent' | 'browse' = 'presets';
  customUrl = ''

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

  async browseFile(){
      const selected = await openDialog({
          multiple: false,
          filters: [{ name: 'Executable', extensions: ['exe'] }]
      });
      if (selected) {
          const path = selected as string;
          const name = path.split('\\').pop()?.replace('.exe', '') ?? path;
          this.appSelected.emit({ name, path });
      }
  }

  async selectUrl(){
    if (!this.customUrl) return;
        const name = this.customUrl.replace(/^https?:\/\//, '').split('/')[0];
        this.appSelected.emit({ name, path: this.customUrl });
        this.customUrl = '';
  }

}
