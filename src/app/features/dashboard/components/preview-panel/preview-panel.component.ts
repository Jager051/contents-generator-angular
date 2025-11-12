import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-preview-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './preview-panel.component.html',
  styleUrl: './preview-panel.component.scss'
})
export class PreviewPanelComponent {}


