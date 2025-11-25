import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewWorkflowDraft, WorkflowDetail, ScenarioForm, NotificationSettings, NotificationChannel, WorkflowNotificationSettings, SharingPlatform, SharingSettings } from '../../dashboard.model';

interface Step {
  title: string;
  description: string;
}

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss'
})
export class NewProjectComponent implements OnChanges {
  @Input() saving = false;
  @Input() workflow: WorkflowDetail | null = null; // Edit mode için
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<NewWorkflowDraft>();

  currentStep = 0;

  readonly steps: Step[] = [
    { title: 'Workflow Details', description: 'Name and describe your automation project.' },
    { title: 'Scenario Creation', description: 'Create scenarios for your videos with date and time.' },
    { title: 'Notifications & Control', description: 'Configure notification settings for when videos are created.' },
    { title: 'Sharing & Distribution', description: 'Select where you want to share your videos.' }
  ];

  draft: NewWorkflowDraft = {
    name: '',
    description: '',
    language: 'English',
    autoPublish: false,
    scenarios: [],
    notificationSettings: { scenarios: [] },
    sharingSettings: {
      platforms: [
        { platform: 'instagram', enabled: false },
        { platform: 'youtube', enabled: false },
        { platform: 'tiktok', enabled: false },
        { platform: 'facebook', enabled: false },
        { platform: 'twitter', enabled: false },
        { platform: 'linkedin', enabled: false }
      ]
    }
  };

  readonly socialMediaPlatforms: Array<{
    key: SharingPlatform['platform'];
    name: string;
    icon: string;
    color: string;
  }> = [
    { key: 'instagram', name: 'Instagram', icon: 'photo_camera', color: '#E4405F' },
    { key: 'youtube', name: 'YouTube', icon: 'play_circle', color: '#FF0000' },
    { key: 'tiktok', name: 'TikTok', icon: 'music_note', color: '#000000' },
    { key: 'facebook', name: 'Facebook', icon: 'facebook', color: '#1877F2' },
    { key: 'twitter', name: 'Twitter', icon: 'alternate_email', color: '#1DA1F2' },
    { key: 'linkedin', name: 'LinkedIn', icon: 'business', color: '#0A66C2' }
  ];

  // Mock connected accounts (later will come from settings)
  connectedAccounts: Map<SharingPlatform['platform'], Array<{ id: string; name: string }>> = new Map([
    ['instagram', [{ id: '1', name: '@my_instagram' }]],
    ['youtube', [{ id: '1', name: 'My YouTube Channel' }]],
    ['tiktok', [{ id: '1', name: '@my_tiktok' }]],
    ['facebook', [{ id: '1', name: 'My Facebook Page' }]],
    ['twitter', [{ id: '1', name: '@my_twitter' }]],
    ['linkedin', [{ id: '1', name: 'My LinkedIn Profile' }]]
  ]);

  // Scenario Creation Form
  scenarioForm: ScenarioForm = {
    title: '',
    description: '',
    videoDateTime: this.getDefaultDateTime(),
    hasAudio: true,
    videoType: 'normal'
  };

  readonly videoTypeOptions: ScenarioForm['videoType'][] = ['short', 'reels', 'normal', 'story'];
  
  isManualDescriptionMode = false; // Switch state for manual description input
  editingScenarioIndex: number | null = null; // Index of scenario being edited

  // Notification Channels
  readonly notificationChannelTypes: NotificationChannel['type'][] = ['email', 'telegram', 'webhook', 'sms'];
  globalEmail = '';
  globalTelegramChatId = '';
  globalEmailEnabled = false;
  globalTelegramEnabled = false;

  private getDefaultDateTime(): string {
    const now = new Date();
    // Yarın saat 08:00
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);
    return this.formatDateTimeLocal(tomorrow);
  }

  private formatDateTimeLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private parseDateTimeLocal(dateTimeString: string): Date | null {
    if (!dateTimeString) return null;
    return new Date(dateTimeString);
  }

  private timeToDateTimeLocal(time: string, baseDate?: Date): string {
    if (!time) return this.getDefaultDateTime();
    
    const date = baseDate || new Date();
    const [hours, minutes] = time.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) {
      return this.getDefaultDateTime();
    }
    
    date.setHours(hours, minutes, 0, 0);
    return this.formatDateTimeLocal(date);
  }

  private dateTimeLocalToTime(dateTimeString: string): string {
    if (!dateTimeString) return '08:00';
    
    const date = this.parseDateTimeLocal(dateTimeString);
    if (!date) return '08:00';
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  get isEditMode(): boolean {
    return this.workflow !== null;
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Edit Project' : 'Create New Project';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Project' : 'Create Project';
  }

  formatDateTimeForDisplay(dateTimeString?: string): string {
    if (!dateTimeString) return 'Not set';
    
    const date = this.parseDateTimeLocal(dateTimeString);
    if (!date) return 'Not set';
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workflow'] && this.workflow) {
      // Edit mode: Load workflow data into draft
      
      // Convert backend Scenario[] to ScenarioForm[]
      const scenarioForms: ScenarioForm[] = [];
      if (this.workflow.scenarios && this.workflow.scenarios.length > 0) {
        this.workflow.scenarios.forEach((scenario) => {
          // Convert ISO date string to datetime-local format
          const dateTime = scenario.videoDateTime 
            ? new Date(scenario.videoDateTime).toISOString().slice(0, 16)
            : this.getDefaultDateTime();
          
          scenarioForms.push({
            title: scenario.title,
            description: scenario.description || '',
            videoDateTime: dateTime,
            hasAudio: scenario.hasAudio !== undefined ? scenario.hasAudio : true,
            videoType: (scenario.videoType as ScenarioForm['videoType']) || 'normal',
            isManualDescription: scenario.isManualDescription ?? (!!scenario.description)
          });
        });
      }

      // Load notification settings
      let notificationSettings: WorkflowNotificationSettings = { scenarios: [] };
      if (this.workflow.notificationSettings) {
        // Map scenario IDs to indices for frontend
        const scenarioIdToIndexMap = new Map<number, number>();
        if (this.workflow.scenarios && this.workflow.scenarios.length > 0) {
          this.workflow.scenarios.forEach((scenario, index) => {
            if (scenario?.id) {
              scenarioIdToIndexMap.set(scenario.id, index);
            }
          });
        }

        // Convert backend notification settings (using scenario IDs) to frontend format (using indices)
        const mappedScenarios: NotificationSettings[] = [];
        if (this.workflow.notificationSettings.scenarios) {
          this.workflow.notificationSettings.scenarios.forEach((backendNotification) => {
            const scenarioIndex = scenarioIdToIndexMap.get(backendNotification.scenarioId);
            if (scenarioIndex !== undefined) {
              mappedScenarios.push({
                scenarioId: scenarioIndex, // Use index instead of ID
                scenarioTitle: backendNotification.scenarioTitle,
                channels: backendNotification.channels || []
              });
            }
          });
        }

        notificationSettings = {
          scenarios: mappedScenarios,
          globalSettings: this.workflow.notificationSettings.globalSettings
        };
        
        // Set global notification settings
        if (notificationSettings.globalSettings) {
          this.globalEmail = notificationSettings.globalSettings.defaultEmail || '';
          this.globalTelegramChatId = notificationSettings.globalSettings.defaultTelegramChatId || '';
          this.globalEmailEnabled = notificationSettings.globalSettings.emailEnabled || false;
          this.globalTelegramEnabled = notificationSettings.globalSettings.telegramEnabled || false;
        }
      }

      // Load sharing settings
      // Initialize all platforms as disabled
      const allPlatforms: SharingPlatform[] = [
        { platform: 'instagram', enabled: false },
        { platform: 'youtube', enabled: false },
        { platform: 'tiktok', enabled: false },
        { platform: 'facebook', enabled: false },
        { platform: 'twitter', enabled: false },
        { platform: 'linkedin', enabled: false }
      ];

      // Update enabled platforms from backend
      if (this.workflow.sharingSettings && this.workflow.sharingSettings.platforms) {
        this.workflow.sharingSettings.platforms.forEach((backendPlatform) => {
          const platform = allPlatforms.find(p => p.platform === backendPlatform.platform);
          if (platform) {
            platform.enabled = backendPlatform.enabled;
            platform.accountId = backendPlatform.accountId;
            platform.accountName = backendPlatform.accountName;
          }
        });
      }

      const sharingSettings: SharingSettings = {
        platforms: allPlatforms,
        autoPublish: this.workflow.sharingSettings?.autoPublish
      };

      this.draft = {
        name: this.workflow.name,
        description: this.workflow.description,
        language: this.workflow.language,
        autoPublish: this.workflow.autoPublish,
        scenarios: scenarioForms,
        notificationSettings: notificationSettings,
        sharingSettings: sharingSettings
      };
      this.currentStep = 0; // Reset to first step
    } else if (changes['workflow'] && !this.workflow) {
      // Create mode: Reset draft
      this.draft = {
        name: '',
        description: '',
        language: 'English',
        autoPublish: false,
        scenarios: [],
        notificationSettings: { scenarios: [] },
        sharingSettings: {
          platforms: [
            { platform: 'instagram', enabled: false },
            { platform: 'youtube', enabled: false },
            { platform: 'tiktok', enabled: false },
            { platform: 'facebook', enabled: false },
            { platform: 'twitter', enabled: false },
            { platform: 'linkedin', enabled: false }
          ]
        }
      };
      this.resetScenarioForm();
      this.resetNotificationSettings();
      this.currentStep = 0;
    }
  }

  // Scenario Management
  resetScenarioForm() {
    this.scenarioForm = {
      title: '',
      description: '',
      videoDateTime: this.getDefaultDateTime(),
      hasAudio: true,
      videoType: 'normal',
      isManualDescription: false
    };
    this.editingScenarioIndex = null;
    // Reset manual mode when not editing
    if (this.editingScenarioIndex === null) {
      this.isManualDescriptionMode = false;
    }
  }

  get isEditingScenario(): boolean {
    return this.editingScenarioIndex !== null;
  }

  addScenario() {
    // Title is always required
    if (!this.scenarioForm.title.trim()) {
      return;
    }

    // Description is only required if manual mode is enabled
    if (this.isManualDescriptionMode && !this.scenarioForm.description.trim()) {
      return;
    }

    if (!this.draft.scenarios) {
      this.draft.scenarios = [];
    }

    // If AI mode, description will be empty (will be generated by AI later)
    const scenarioToAdd: ScenarioForm = {
      title: this.scenarioForm.title,
      description: this.isManualDescriptionMode ? this.scenarioForm.description : '',
      videoDateTime: this.scenarioForm.videoDateTime,
      hasAudio: this.scenarioForm.hasAudio ?? true,
      videoType: this.scenarioForm.videoType || 'normal',
      isManualDescription: this.isManualDescriptionMode
    };

    // If editing, update existing scenario
    if (this.editingScenarioIndex !== null) {
      this.draft.scenarios[this.editingScenarioIndex] = scenarioToAdd;
      
      // Update notification settings scenario title if exists
      if (this.draft.notificationSettings) {
        const notification = this.draft.notificationSettings.scenarios.find(
          s => s.scenarioId === this.editingScenarioIndex
        );
        if (notification) {
          notification.scenarioTitle = scenarioToAdd.title;
        }
      }
      
      this.editingScenarioIndex = null;
    } else {
      // Add new scenario
      this.draft.scenarios.push(scenarioToAdd);

      // Initialize notification settings for this scenario
      if (!this.draft.notificationSettings) {
        this.draft.notificationSettings = { scenarios: [] };
      }

      const scenarioIndex = this.draft.scenarios.length - 1;
      const existingNotification = this.draft.notificationSettings.scenarios.find(
        s => s.scenarioId === scenarioIndex
      );

      if (!existingNotification) {
        this.draft.notificationSettings.scenarios.push({
          scenarioId: scenarioIndex,
          scenarioTitle: this.draft.scenarios[scenarioIndex].title,
          channels: [
            { type: 'email', enabled: false },
            { type: 'telegram', enabled: false },
            { type: 'webhook', enabled: false },
            { type: 'sms', enabled: false }
          ]
        });
      }
    }

    this.resetScenarioForm();
  }

  editScenario(index: number) {
    if (!this.draft.scenarios || !this.draft.scenarios[index]) {
      return;
    }

    const scenario = this.draft.scenarios[index];
    this.editingScenarioIndex = index;

    // Fill form with scenario data
    this.scenarioForm = {
      title: scenario.title,
      description: scenario.description || '',
      videoDateTime: scenario.videoDateTime,
      hasAudio: scenario.hasAudio !== undefined ? scenario.hasAudio : true,
      videoType: scenario.videoType || 'normal',
      isManualDescription: scenario.isManualDescription ?? false
    };

    // Set manual mode based on flag or infer from description
    this.isManualDescriptionMode = scenario.isManualDescription ?? (!!scenario.description);

    // Scroll to form
    setTimeout(() => {
      const formElement = document.querySelector('.scenario-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  cancelEdit() {
    this.editingScenarioIndex = null;
    this.resetScenarioForm();
  }

  removeScenario(index: number) {
    if (this.draft.scenarios) {
      this.draft.scenarios.splice(index, 1);
      
      // Remove notification settings for this scenario
      if (this.draft.notificationSettings) {
        this.draft.notificationSettings.scenarios = this.draft.notificationSettings.scenarios
          .filter(s => s.scenarioId !== index)
          .map(s => ({
            ...s,
            scenarioId: s.scenarioId > index ? s.scenarioId - 1 : s.scenarioId
          }));
      }
    }
  }

  // Notification Settings Management
  resetNotificationSettings() {
    this.globalEmail = '';
    this.globalTelegramChatId = '';
    this.globalEmailEnabled = false;
    this.globalTelegramEnabled = false;
  }

  getNotificationSettingsForScenario(index: number): NotificationSettings | undefined {
    if (!this.draft.notificationSettings) {
      return undefined;
    }
    return this.draft.notificationSettings.scenarios.find(s => s.scenarioId === index);
  }

  updateNotificationChannel(scenarioIndex: number, channelType: NotificationChannel['type'], enabled: boolean, value?: string) {
    if (!this.draft.notificationSettings) {
      this.draft.notificationSettings = { scenarios: [] };
    }

    let notification = this.draft.notificationSettings.scenarios.find(s => s.scenarioId === scenarioIndex);
    
    if (!notification) {
      const scenario = this.draft.scenarios?.[scenarioIndex];
      if (!scenario) return;

      notification = {
        scenarioId: scenarioIndex,
        scenarioTitle: scenario.title,
        channels: [
          { type: 'email', enabled: false },
          { type: 'telegram', enabled: false },
          { type: 'webhook', enabled: false },
          { type: 'sms', enabled: false }
        ]
      };
      this.draft.notificationSettings.scenarios.push(notification);
    }

    const channel = notification.channels.find(c => c.type === channelType);
    if (channel) {
      channel.enabled = enabled;
      if (value !== undefined) {
        channel.value = value;
      }
    }
  }

  updateGlobalNotificationSettings() {
    if (!this.draft.notificationSettings) {
      this.draft.notificationSettings = { scenarios: [] };
    }

    this.draft.notificationSettings.globalSettings = {
      emailEnabled: this.globalEmailEnabled,
      telegramEnabled: this.globalTelegramEnabled,
      defaultEmail: this.globalEmail || undefined,
      defaultTelegramChatId: this.globalTelegramChatId || undefined
    };
  }

  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 0: // Workflow Details
        return !!this.draft.name.trim() && !!this.draft.description.trim();
      case 1: // Scenario Creation
        return !!(this.draft.scenarios && this.draft.scenarios.length > 0);
      case 2: // Notifications
        return true; // Notifications are optional
      case 3: // Sharing & Distribution
        return true; // Sharing is optional
      default:
        return true;
    }
  }

  togglePlatform(platformKey: SharingPlatform['platform']) {
    if (!this.draft.sharingSettings) {
      this.draft.sharingSettings = { platforms: [] };
    }

    const platform = this.draft.sharingSettings.platforms.find(p => p.platform === platformKey);
    if (platform) {
      platform.enabled = !platform.enabled;
      // If disabling, clear account selection
      if (!platform.enabled) {
        platform.accountId = undefined;
        platform.accountName = undefined;
      } else {
        // If enabling, set default account if available
        const accounts = this.connectedAccounts.get(platformKey);
        if (accounts && accounts.length > 0) {
          platform.accountId = accounts[0].id;
          platform.accountName = accounts[0].name;
        }
      }
    } else {
      // Add new platform
      const accounts = this.connectedAccounts.get(platformKey);
      this.draft.sharingSettings.platforms.push({
        platform: platformKey,
        enabled: true,
        accountId: accounts && accounts.length > 0 ? accounts[0].id : undefined,
        accountName: accounts && accounts.length > 0 ? accounts[0].name : undefined
      });
    }
  }

  isPlatformEnabled(platformKey: SharingPlatform['platform']): boolean {
    if (!this.draft.sharingSettings) {
      return false;
    }
    const platform = this.draft.sharingSettings.platforms.find(p => p.platform === platformKey);
    return platform?.enabled || false;
  }

  getSelectedPlatformsCount(): number {
    if (!this.draft.sharingSettings) {
      return 0;
    }
    return this.draft.sharingSettings.platforms.filter(p => p.enabled).length;
  }

  getAccountName(platformKey: SharingPlatform['platform']): string {
    if (!this.draft.sharingSettings) {
      return '';
    }
    const platform = this.draft.sharingSettings.platforms.find(p => p.platform === platformKey);
    return platform?.accountName || '';
  }

  get isLastStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }

  nextStep() {
    if (this.currentStep === 1) {
      // Moving from Scenario Creation to Notifications
      this.updateGlobalNotificationSettings();
    }

    if (!this.isLastStep && this.canProceedToNextStep()) {
      this.currentStep += 1;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }
  }

  handleClose() {
    this.close.emit();
  }

  submit() {
    // Update global notification settings before submit
    this.updateGlobalNotificationSettings();

    // Save draft as is
    this.save.emit(this.draft);
  }

  formatDateTimeForDisplayShort(dateTimeString?: string): string {
    if (!dateTimeString) return 'Not set';
    
    const date = this.parseDateTimeLocal(dateTimeString);
    if (!date) return 'Not set';
    
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getChannelPlaceholder(type: NotificationChannel['type']): string {
    switch (type) {
      case 'email':
        return 'email@example.com';
      case 'telegram':
        return 'Telegram Chat ID';
      case 'webhook':
        return 'https://webhook.url';
      case 'sms':
        return '+1234567890';
      default:
        return '';
    }
  }

  isChannelEnabled(scenarioIndex: number, channelType: NotificationChannel['type']): boolean {
    const notification = this.getNotificationSettingsForScenario(scenarioIndex);
    if (!notification || !notification.channels) {
      return false;
    }
    const channel = notification.channels.find(c => c.type === channelType);
    return channel?.enabled || false;
  }

  getChannelValue(scenarioIndex: number, channelType: NotificationChannel['type']): string {
    const notification = this.getNotificationSettingsForScenario(scenarioIndex);
    if (!notification || !notification.channels) {
      return '';
    }
    const channel = notification.channels.find(c => c.type === channelType);
    return channel?.value || '';
  }

  onChannelValueChange(scenarioIndex: number, channelType: NotificationChannel['type'], value: string) {
    const notification = this.getNotificationSettingsForScenario(scenarioIndex);
    if (notification) {
      this.updateNotificationChannel(scenarioIndex, channelType, true, value);
    }
  }

}


