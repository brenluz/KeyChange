import { Routes } from "@angular/router";
import { UserKeybinds } from "./user-keybinds/user-keybinds";
import { Settings } from "./settings/settings";

export const routes: Routes = [
    {path: '', component: UserKeybinds},
    {path: 'settings', component: Settings }
];
