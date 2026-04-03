import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { open as openDialog } from '@tauri-apps/plugin-dialog';
import { IconCacheService } from '../icon-cache.service';

export interface AppEntry {
  name: string;
  path: string;
  logo?: string;
  cacheFile?: string;
}

@Component({
  selector: 'app-app-picker-modal',
  imports: [MatIcon, FormsModule],
  templateUrl: './app-picker-modal.html',
})

export class AppPickerModal {

  constructor(private iconCacheService: IconCacheService) {}

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() appSelected = new EventEmitter<AppEntry>();

  recentApps: AppEntry[] = [];
  activeTab: 'presets' | 'recent' | 'browse' = 'presets';
  customUrl = ''

  presets: AppEntry[] = [
    { name: 'Spotify', path: 'spotify', logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=32' },
    { name: 'YouTube', path: 'https://youtube.com', logo: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=32' },
    { name: 'Windows Settings', path: 'ms-settings:', cacheFile: 'settings.png' },
    { name: 'File Explorer', path: 'explorer', cacheFile: 'explorer.png' },
    { name: 'Task Manager', path: 'taskmgr', cacheFile: 'taskmgr.png' },
    { name: 'Calculator', path: 'calc', cacheFile: 'calculator.png' },
    { name: 'Notepad', path: 'notepad', cacheFile: 'notepad.png' },
    { name: 'VS Code', path: 'code', logo: 'https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=32' },
    { name: 'Chrome', path: 'chrome', logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=32' },
    { name: 'Discord', path: 'discord', logo: 'https://www.google.com/s2/favicons?domain=discord.com&sz=32' },
  ];
  
  async ngOnInit() {
    await this.iconCacheService.init();
    for (const preset of this.presets) {
            if (preset.cacheFile) {
                preset.logo = this.iconCacheService.getIconPath(preset.cacheFile);
                console.log('Loaded icon for', preset.name, 'from', preset.logo);
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
