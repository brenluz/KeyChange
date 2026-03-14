use tauri::window::Color;

pub fn hex_to_color(hex: &str) -> Color {
    let hex = hex.trim_start_matches('#');
    let rgb = u32::from_str_radix(hex, 16).unwrap_or(0);

    Color {
        0: ((rgb >> 16) & 0xFF) as u8,
        1: ((rgb >> 8) & 0xFF) as u8,
        2: (rgb & 0xFF) as u8,
        3: 255, 
    }
}