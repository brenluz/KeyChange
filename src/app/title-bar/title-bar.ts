import { Component } from '@angular/core';
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-title-bar',
  imports: [MatIconModule],
  templateUrl: './title-bar.html',
})
export class TitleBar {

  constructor(private router: Router) {}

    appWindow = getCurrentWindow();

    minimize(){
      this.appWindow.minimize()
    }

    async close(){
      this.appWindow.hide()
    }

    goToSettings(){
       if (this.router.url === '/settings') {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['/settings']);
        }
    }
}
