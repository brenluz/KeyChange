import { Injectable } from '@angular/core';
import { BaseDirectory, readTextFile, writeTextFile, exists, mkdir} from '@tauri-apps/plugin-fs'
import {Keybind} from "./add-keybind-modal/add-keybind-modal"

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

}
