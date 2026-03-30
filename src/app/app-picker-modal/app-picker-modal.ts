import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { invoke } from '@tauri-apps/api/core';
import { open as openDialog } from '@tauri-apps/plugin-dialog';

export interface AppEntry {
  name: string;
  path: string;
  logo?: string;
  exePath?: string;
}

@Component({
  selector: 'app-app-picker-modal',
  imports: [MatIcon, FormsModule],
  templateUrl: './app-picker-modal.html',
})

export class AppPickerModal {

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() appSelected = new EventEmitter<AppEntry>();

  recentApps: AppEntry[] = [];
  activeTab: 'presets' | 'recent' | 'browse' = 'presets';
  customUrl = ''

  presets: AppEntry[] = [
    { name: 'Spotify', path: 'spotify', logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=32' },
    { name: 'YouTube', path: 'https://youtube.com', logo: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=32' },
    { name: 'Windows Settings', path: 'ms-settings:', exePath: 'C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe' },
    { name: 'File Explorer', path: 'explorer', exePath: 'C:\\Windows\\explorer.exe' },
    { name: 'Task Manager', path: 'taskmgr', exePath: 'C:\\Windows\\System32\\Taskmgr.exe' },
    { name: 'Calculator', path: 'calc', exePath: 'C:\\Windows\\System32\\calc.exe' },
    { name: 'Notepad', path: 'notepad', exePath: 'C:\\Windows\\System32\\notepad.exe' },
    { name: 'VS Code', path: 'code', logo: 'https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=32' },
    { name: 'Chrome', path: 'chrome', logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=32' },
    { name: 'Discord', path: 'discord', logo: 'https://www.google.com/s2/favicons?domain=discord.com&sz=32' },
  ];
  
  async ngOnInit() {
    for (const preset of this.presets) {
      if (preset.exePath && !preset.logo) {
          try {
              const icon = await invoke<string>('get_exe_icon', { path: preset.exePath });
              if (icon) preset.logo = icon;
          } catch {}
      }
  }
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
