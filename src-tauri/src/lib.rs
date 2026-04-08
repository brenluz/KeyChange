mod utils;

use tauri::window::Color;
use tauri::{tray::{TrayIconBuilder, TrayIconEvent, MouseButton, MouseButtonState}};
use tauri::menu::{MenuBuilder, MenuItemBuilder};
use tauri::Manager;
use utils::hex_to_color;

#[derive(serde::Serialize)]
pub struct AppEntry {
    name: String,
    path: String,
}

#[tauri::command]
fn cache_exe_icon(exe_path: &str, cache_path: &str) -> bool {
    println!("cache_exe_icon called");
    println!("exe_path: {}", exe_path);
    println!("cache_path: {}", cache_path);
    
    #[cfg(target_os = "windows")]
    {
        if let Some(parent) = std::path::Path::new(cache_path).parent() {
            match std::fs::create_dir_all(parent) {
                Ok(_) => println!("Directory created/exists"),
                Err(e) => {
                    println!("Failed to create dir: {}", e);
                    return false;
                }
            }
        }

        let cache_path_forward = cache_path.replace("\\", "/");
        let exe_path_forward = exe_path.replace("\\", "/");

        let script = format!(
            r#"
            try {{
                Add-Type -AssemblyName System.Drawing
                $icon = [System.Drawing.Icon]::ExtractAssociatedIcon('{exe_path}')
                $bitmap = $icon.ToBitmap()
                $bitmap.Save('{cache_path}', [System.Drawing.Imaging.ImageFormat]::Png)
                Write-Output 'Success'
            }} catch {{
                Write-Error $_.Exception.Message
            }}
            "#,
            exe_path = exe_path_forward.replace("'", "''"),
            cache_path = cache_path_forward.replace("'", "''")
        );

        match std::process::Command::new("powershell")
            .args(["-NoProfile", "-Command", &script])
            .output() 
        {
            Ok(output) => {
                println!("PowerShell stdout: {}", String::from_utf8_lossy(&output.stdout));
                println!("PowerShell stderr: {}", String::from_utf8_lossy(&output.stderr));
                println!("PowerShell success: {}", output.status.success());
                output.status.success()
            }
            Err(e) => {
                println!("Failed to run PowerShell: {}", e);
                false
            }
        }
    }

    #[cfg(not(target_os = "windows"))]
    false
}

#[tauri::command]
fn quit(app: tauri::AppHandle) {
    app.exit(0);
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

    #[cfg(target_os = "macos")]
    if action.contains("://") {
        std::process::Command::new("open")
        .arg(action)
        .spawn().ok();
    } else if action.contains(".app") {
        std::process::Command::new("open")
        .args(["-a", &action])
        .spawn().ok();
    } else {
        std::process::Command::new("open")
        .arg(action)
        .spawn().ok();
    }
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_theme, open_action, cache_exe_icon, quit])
        .setup(|app| {
            let quit = MenuItemBuilder::with_id("quit", "Quit").build(app)?;
            let menu = MenuBuilder::new(app).items(&[&quit]).build()?;
            TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .show_menu_on_left_click(false)
                .on_tray_icon_event(|tray, event| {
                    match event {
                        TrayIconEvent::Click { button: MouseButton::Left, button_state: MouseButtonState::Up, .. } => {
                            let app = tray.app_handle();
                            if let Some(window) = app.get_webview_window("main") {
                                if window.is_visible().unwrap_or(false) {
                                    window.hide().ok();
                                } else {
                                    window.show().ok();
                                    window.set_focus().ok();
                                }
                            }
                        }
                        _ => {}
                    }
                })
                .on_menu_event(|_, event| {
                    if event.id() == "quit" {
                        std::process::exit(0);
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
        // Aparently MacosLauncher is mandatory even in windows, it just gets ignored if not on MacOS
        .plugin(tauri_plugin_autostart::init(tauri_plugin_autostart::MacosLauncher::LaunchAgent, Some(vec![])))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

