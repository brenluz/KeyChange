import { Injectable } from '@angular/core';
import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { exists } from '@tauri-apps/plugin-fs';

export interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  startOnStartup: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
    theme: 'dark',
    language: 'en',
    startOnStartup: true,
};

const FILE_PATH = 'settings.json';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  async load(): Promise<AppSettings> {
    try {
      const fileExists = await exists(FILE_PATH, { baseDir: BaseDirectory.AppData });
      if (!fileExists) { return DEFAULT_SETTINGS; }
      const content = await readTextFile(FILE_PATH, { baseDir: BaseDirectory.AppData });
      return JSON.parse(content) as AppSettings;

    } catch (error) {
      console.error('Failed to load settings, using defaults:', error);
      return DEFAULT_SETTINGS
    } 
  }

  async save(settings: AppSettings): Promise<void> {
    try {
      const content = JSON.stringify(settings, null, 2);
      await writeTextFile(FILE_PATH, content, { baseDir: BaseDirectory.AppData });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }
}
