import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { UserKeybinds } from "./user-keybinds/user-keybinds";
import { TitleBar } from "./title-bar/title-bar";
import { IconCacheService } from "./icon-cache.service";
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from "./settings.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, TitleBar],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {

  constructor(private IconCacheService: IconCacheService, private translateService: TranslateService, private settingsService: SettingsService) {}

  async ngOnInit() {
    const settings = await this.settingsService.load();
    await this.IconCacheService.init();
    this.translateService.use(settings.language);
    console.log('Loaded language:', settings.language);
    console.log('Calling translate.use with:', settings.language ?? 'en');
  }
}
