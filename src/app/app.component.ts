import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { UserKeybinds } from "./user-keybinds/user-keybinds";
import { TitleBar } from "./title-bar/title-bar";
import { IconCacheService } from "./icon-cache.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, TitleBar],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {

  constructor(private IconCacheService: IconCacheService) {}

  async ngOnInit() {
    await this.IconCacheService.init();
    
  }
}
