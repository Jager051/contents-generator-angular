import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-telegram-connect',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './telegram-connect.component.html',
  styleUrl: './telegram-connect.component.scss'
})
export class TelegramConnectComponent {
  botToken = '';
  chatId = '';
}


