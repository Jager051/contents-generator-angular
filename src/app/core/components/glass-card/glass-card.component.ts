import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="'backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-xl ' + 
               (highlight ? 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-slate-950 ' : '') + 
               className">
      <ng-content></ng-content>
    </div>
  `
})
export class GlassCardComponent {
  @Input() className: string = '';
  @Input() highlight: boolean = false;
}

