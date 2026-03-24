import { Injectable } from '@angular/core';
import { BaseDirectory, readTextFile, writeTextFile, exists, mkdir} from '@tauri-apps/plugin-fs'
import { register, unregisterAll} from '@tauri-apps/plugin-global-shortcut'
import {Keybind} from "./add-keybind-modal/add-keybind-modal"
import { invoke } from '@tauri-apps/api/core';

const FILE_PATH = "keybinds.json";

@Injectable({
	providedIn: 'root',
})

export class KeybindService { 
  async load(): Promise<Keybind[]> {
    try {
		const fileExists = await exists(FILE_PATH, { baseDir: BaseDirectory.AppData});
		if(!fileExists){
			return [];
		}
		const content = await readTextFile(FILE_PATH, {baseDir: BaseDirectory.AppData});
		return JSON.parse(content) as Keybind[];
    }
	catch {
		return [];
	}
  }

  async save(keybinds: Keybind[]): Promise<void>{
	await mkdir('', { baseDir: BaseDirectory.AppData, recursive: true });
	await writeTextFile(FILE_PATH, JSON.stringify(keybinds, null , 2), {baseDir: BaseDirectory.AppData})
  }


  async registerAll(keybinds: Keybind[]): Promise<void> {
	console.log("register all called")
	await unregisterAll();
	for (const keybind of keybinds) {
		try{
			console.log('Registering:', keybind.keyCombo);
			await register(keybind.keyCombo, () => {
				console.log('Shortcut fired:', keybind.keyCombo);
				invoke('open_action', { action: keybind.action })
			});
		} catch (e){
			console.error('Failed to register ${keybind.keyCombo}')
		}
	} 
  }
}
