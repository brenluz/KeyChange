import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppSettings, SettingsService } from '../settings.service';
import { KeybindService } from '../keybind.service';  
import { Router } from '@angular/router';
import { isEnabled, enable, disable } from '@tauri-apps/plugin-autostart';
import { invoke } from '@tauri-apps/api/core';
import { FormsModule } from '@angular/forms';
import { open as openDialog, save as saveDialog} from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

@Component({
  selector: 'app-settings',
  imports: [MatIconModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'  
})
export class Settings implements OnInit {

  settings: AppSettings = {
    theme: 'dark',
    language: 'en',
    startOnStartup: true,
  };
  
  languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Portuguese' },
  ];

  constructor(private settingsService: SettingsService, private keybindService: KeybindService) { }

  async ngOnInit(){
    this.settings = await this.settingsService.load();
    this.settings.startOnStartup = await isEnabled();
    this.applyTheme(this.settings.theme);
  }

  async onThemeChange() {
        await this.settingsService.save(this.settings);
        this.applyTheme(this.settings.theme);
        invoke('set_theme', { isDark: this.settings.theme === 'dark' });
    }

  applyTheme(theme: 'dark' | 'light') {
      document.documentElement.setAttribute('data-theme', theme);
  }

  async onStartupChange() {
        if (this.settings.startOnStartup) {
            await enable();
        } else {
            await disable();
        }
        await this.settingsService.save(this.settings);
  }

  async onLanguageChange() {
    await this.settingsService.save(this.settings);
  } 

  goBack(){
    window.history.back();
  }

  async exportKeybinds() {
    const keybinds = await this.keybindService.load();
    const savePath = await saveDialog({
        filters: [{ name: 'JSON', extensions: ['json'] }],
        defaultPath: 'keybinds.json'
    });
    if (savePath) {
        await writeTextFile(savePath as string, JSON.stringify(keybinds, null, 2));
    }
  }

  async importKeybinds(){
            const filePath = await openDialog({
            filters: [{ name: 'JSON', extensions: ['json'] }],
            multiple: false
        });
        if (filePath) {
            const content = await readTextFile(filePath as string);
            const keybinds = JSON.parse(content);
            await this.keybindService.save(keybinds);
            await this.keybindService.registerAll(keybinds);
        }
  }

  quit(){
    invoke('quit');
  }
}
