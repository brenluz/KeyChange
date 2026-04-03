import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { appDataDir, BaseDirectory } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/core';
import { exists } from '@tauri-apps/plugin-fs';

export interface CacheablePreset {
    name: string;
    exePath: string;
    cacheFileName: string;
}

const CACHEABLE_PRESETS: CacheablePreset[] = [
    { name: 'Notepad', exePath: 'C:\\Windows\\System32\\notepad.exe', cacheFileName: 'notepad.png' },
    { name: 'Calculator', exePath: 'C:\\Windows\\System32\\calc.exe', cacheFileName: 'calculator.png' },
    { name: 'Task Manager', exePath: 'C:\\Windows\\System32\\Taskmgr.exe', cacheFileName: 'taskmgr.png' },
    { name: 'File Explorer', exePath: 'C:\\Windows\\explorer.exe', cacheFileName: 'explorer.png' },
    { name: 'Windows Settings', exePath: 'C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe', cacheFileName: 'settings.png' },
];

@Injectable({ providedIn: 'root' })
export class IconCacheService {
    private appDataPath = '';

    constructor() {}

    async init(): Promise<void> {
        this.appDataPath = await appDataDir();
        if (!this.appDataPath.endsWith('\\') && !this.appDataPath.endsWith('/')) {
            this.appDataPath += '\\';
        }
        await this.cacheIcons();
    }

    async cacheIcons(): Promise<void> {
        await Promise.all(CACHEABLE_PRESETS.map(async preset => {
            const cachePath = `${this.appDataPath}icons\\${preset.cacheFileName}`;
            const fileExists = await exists(`icons\\${preset.cacheFileName}`, { baseDir: BaseDirectory.AppData });
            if (!fileExists) {
                console.log('Caching:', preset.name, 'to', cachePath);
                const result = await invoke<boolean>('cache_exe_icon', {
                    exePath: preset.exePath,
                    cachePath
                });
                console.log('Result:', preset.name, result);
            }
        }));
    }
    
    getIconPath(cacheFileName: string): string {
        return convertFileSrc(`${this.appDataPath}icons\\${cacheFileName}`);
    }
}