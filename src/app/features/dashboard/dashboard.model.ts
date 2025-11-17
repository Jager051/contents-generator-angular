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
  activeProjectsCount: number;
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

export interface NewWorkflowDraft {
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  description: string;
  triggerType: 'schedule' | 'telegram' | 'custom';
  triggerTime: string; // Backend compatibility için korunuyor
  triggerDateTime?: string; // Yeni: datetime-local format için
  language: string;
  autoPublish: boolean;
}

export type CreateWorkflowRequest = NewWorkflowDraft;

export interface WorkflowSummary {
  id: number;
  name: string;
  status: string;
  frequency: string;
  triggerDescription: string;
  notes?: string | null;
  createdAt: string;
}

export interface WorkflowDetail {
  id: number;
  name: string;
  description: string;
  status: string;
  frequency: string;
  triggerType: string;
  triggerTime: string;
  triggerDescription: string;
  language: string;
  autoPublish: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface UpdateWorkflowRequest {
  workflowId: number;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  description: string;
  triggerType: 'schedule' | 'telegram' | 'custom';
  triggerTime: string;
  language: string;
  autoPublish: boolean;
}

export interface WorkflowListItem {
  id: number;
  name: string;
  status: string; // 'active' | 'paused' | 'error'
  frequency: string; // 'daily' | 'weekly' | 'monthly'
  trigger: string;
  videosCreated: number;
  lastRun: string;
  nextRun: string;
}

export interface WorkflowListStats {
  total: number;
  active: number;
  paused: number;
  error: number;
}

export interface WorkflowList {
  workflows: WorkflowListItem[];
  stats: WorkflowListStats;
}

export interface CalendarWorkflowItem {
  id: number;
  name: string;
  status: string;
  frequency: string;
  nextRunAt: string; // ISO date string
  time: string; // "HH:mm" format
}

export interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasWorkflow: boolean;
  workflows: CalendarWorkflowItem[];
}

export interface Calendar {
  year: number;
  month: number;
  monthName: string;
  days: CalendarDay[];
  upcomingWorkflows: CalendarWorkflowItem[];
}
