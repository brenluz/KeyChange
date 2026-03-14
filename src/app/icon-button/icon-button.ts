import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.html',
})
export class IconButton {
  @Input() icon = '';
  @Input() color = '';
  @Input() text = '';
  @Input() onClick?: () => void;

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
