mod utils;

use tauri::window::{Color};
use tauri::{tray::TrayIconBuilder};
use tauri::tray::TrayIconEvent;
use tauri::Manager;
use utils::hex_to_color;

#[derive(serde::Serialize)]
pub struct AppEntry {
    name: String,
    path: String,
}

#[tauri::command]
fn get_recent_apps() -> Vec<AppEntry> {
    let mut apps = Vec::new();
    #[cfg(target_os = "windows")]
    {
        let recent_path = format!("{}\\Microsoft\\Windows\\Recent",
            std::env::var("APPDATA").unwrap_or_default()
        );

        if let Ok(entries) = std::fs::read_dir(&recent_path) {
            for entry in entries.flatten() {
                let path = entry.path();
                if path.extension().and_then(|e| e.to_str()) == Some("lnk"){
                    let name = path.file_stem()
                    .and_then(|n| n.to_str())
                    .unwrap_or_default()
                    .to_string();
                    apps.push(AppEntry {
                        name,
                        path: path.to_string_lossy().to_string(),
                    })
                }
            }
        }
    }
    apps.truncate(10);
    apps
}

#[tauri::command]
fn set_theme(window: tauri::WebviewWindow, is_dark: bool){
    let color = if is_dark { Some(hex_to_color("#FFFFFF")) } else { Some( Color(255, 255, 255, 255)) };
    window.set_background_color(color).ok();
}

#[tauri::command]
fn open_action(action: String) {
    #[cfg(target_os = "windows")]
    std::process::Command::new("cmd")
    .args(["/C", "start", "", &action])
    .spawn().ok();
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_theme, open_action, get_recent_apps])
        .setup(|app| {
            TrayIconBuilder::new()
            .icon(app.default_window_icon().unwrap().clone())
            .on_tray_icon_event(|tray, event|{
                if let TrayIconEvent::Click{ button: tauri::tray::MouseButton::Left, button_state: tauri::tray::MouseButtonState::Up, .. } = event {
                    let app = tray.app_handle();
                    if let Some(window) = app.get_webview_window("main"){
                        if window.is_visible().unwrap_or(false) {
                            window.hide().ok();
                        } else {
                            window.show().ok();
                            window.set_focus().ok();
                        }
                    }
                    
                }
            })
            .build(app)?;

            if let Some(window) = app.get_webview_window("main") {
                window.hide().ok();
            }
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
