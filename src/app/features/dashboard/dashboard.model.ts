export type DashboardView =
  | 'dashboard'
  | 'workflows'
  | 'calendar'
  | 'history'
  | 'settings'
  | 'telegram';

export interface DashboardOverview {
  workflow: WorkflowOverview;
  previewAssets: WorkflowAsset[];
  productionSnapshot: ProductionSnapshot;
}

export interface WorkflowOverview {
  id: number;
  name: string;
  status: string;
  frequency: string;
  triggerDescription: string;
  nextRunNote?: string | null;
  lastRunAt?: string | null;
  nextRunAt?: string | null;
  videosCreated: number;
  activeStepSequence: number;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  id: number;
  title: string;
  description?: string | null;
  icon: string;
  stepType: string;
  sequence: number;
  status: 'completed' | 'active' | 'pending' | string;
}

export interface WorkflowAsset {
  id: number;
  assetType: string;
  title: string;
  statusLabel: string;
  statusColor: string;
  summary?: string | null;
  previewUrl?: string | null;
  durationSeconds?: number | null;
}

export interface ProductionSnapshot {
  videosCreated: number;
  published: number;
  pendingApproval: number;
  drafts: number;
}
