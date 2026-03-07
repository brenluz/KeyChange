import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
})
export class Header {
  search() {
    alert('search');
  }
  add() {
    console.log('add');
  }

}
