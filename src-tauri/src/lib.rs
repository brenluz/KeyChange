mod utils;

use tauri::window::{Color};
use tauri::{tray::TrayIconBuilder};
use tauri::tray::TrayIconEvent;
use tauri::Manager;
use utils::hex_to_color;

#[tauri::command]
fn set_theme(window: tauri::WebviewWindow, is_dark: bool){
    let color = if is_dark { Some(hex_to_color("#FFFFFF")) } else { Some( Color(255, 255, 255, 255)) };
    window.set_background_color(color).ok();
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_theme])
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
