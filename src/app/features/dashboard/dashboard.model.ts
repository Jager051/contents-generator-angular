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

export interface SharingPlatform {
  platform: 'instagram' | 'youtube' | 'tiktok' | 'facebook' | 'twitter' | 'linkedin';
  enabled: boolean;
  accountId?: string; // Connected account ID from settings
  accountName?: string; // Account display name
}

export interface SharingSettings {
  platforms: SharingPlatform[];
  autoPublish?: boolean; // Override workflow-level autoPublish
}

export interface NewWorkflowDraft {
  name: string;
  description: string;
  language: string;
  autoPublish: boolean;
  scenarios?: ScenarioForm[]; // Senaryolar
  notificationSettings?: WorkflowNotificationSettings; // Bildirim ayarları
  sharingSettings?: SharingSettings; // Paylaşım ayarları
}

export type CreateWorkflowRequest = NewWorkflowDraft;

export interface WorkflowSummary {
  id: number;
  name: string;
  status: string;
  triggerDescription: string;
  notes?: string | null;
  createdAt: string;
}

export interface WorkflowDetail {
  id: number;
  name: string;
  description: string;
  status: string;
  triggerDescription: string;
  language: string;
  autoPublish: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface UpdateWorkflowRequest {
  workflowId: number;
  name: string;
  description: string;
  language: string;
  autoPublish: boolean;
}

export interface WorkflowListItem {
  id: number;
  name: string;
  status: string; // 'active' | 'paused' | 'error'
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

// Scenario Models
export interface Scenario {
  id?: number;
  title: string;
  description: string;
  videoDateTime: string; // ISO date string (datetime-local format)
  workflowId?: number;
  hasAudio?: boolean;
  videoType?: 'short' | 'reels' | 'normal' | 'story';
  createdAt?: string;
  updatedAt?: string;
}

export interface ScenarioForm {
  title: string;
  description: string;
  videoDateTime: string; // datetime-local format: "YYYY-MM-DDTHH:mm"
  hasAudio?: boolean;
  videoType?: 'short' | 'reels' | 'normal' | 'story';
  isManualDescription?: boolean; // true = user entered manually, false = AI generated
}

// Notification Models
export interface NotificationSettings {
  scenarioId: number;
  scenarioTitle: string;
  channels: NotificationChannel[];
}

export interface NotificationChannel {
  type: 'email' | 'telegram' | 'webhook' | 'sms';
  enabled: boolean;
  value?: string; // Email address, Telegram chat ID, Webhook URL, Phone number
}

export interface WorkflowNotificationSettings {
  scenarios: NotificationSettings[];
  globalSettings?: {
    emailEnabled: boolean;
    telegramEnabled: boolean;
    defaultEmail?: string;
    defaultTelegramChatId?: string;
  };
}
