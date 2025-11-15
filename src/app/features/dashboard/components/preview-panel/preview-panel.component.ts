import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductionSnapshot, WorkflowAsset } from '../../dashboard.model';

@Component({
  selector: 'app-preview-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './preview-panel.component.html',
  styleUrl: './preview-panel.component.scss'
})
export class PreviewPanelComponent {
  @Input() assets: WorkflowAsset[] | null = [];
  @Input() productionSnapshot: ProductionSnapshot | null = null;

  get assetsToRender(): WorkflowAsset[] {
    return this.assets || [];
  }

  trackByAsset(_: number, asset: WorkflowAsset): number {
    return asset.id;
  }

  openPreview(asset: WorkflowAsset) {
    if (asset.previewUrl) {
      window.open(asset.previewUrl, '_blank');
    }
  }
}


