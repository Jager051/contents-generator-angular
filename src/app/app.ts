import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupComponent } from './core/components/popup/popup.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PopupComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Contents Generator';
}