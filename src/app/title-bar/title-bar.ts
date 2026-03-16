import { Component } from '@angular/core';
import { getCurrentWindow } from '@tauri-apps/api/window'

@Component({
  selector: 'app-title-bar',
  imports: [],
  templateUrl: './title-bar.html',
})
export class TitleBar {
    appWindow = getCurrentWindow();

    minimize(){
      this.appWindow.minimize()
    }

    async close(){
      this.appWindow.hide()
    }
}
