import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { UserKeybinds } from "./user-keybinds/user-keybinds";
import { TitleBar } from "./title-bar/title-bar";
@Component({
  selector: "app-root",
  imports: [RouterOutlet, UserKeybinds, TitleBar],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  ngOnInit() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    invoke('set_theme', { isDark });
  }
}
