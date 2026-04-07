import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  imports: [MatIconModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'  
})
export class Settings implements OnInit {

  ngOnInit(){
    
  }

  goBack(){
    window.history.back();
  }

  exportKeybinds(){
  }

  importKeybinds(){
  }

  quit(){
    window.close();
  }
}
