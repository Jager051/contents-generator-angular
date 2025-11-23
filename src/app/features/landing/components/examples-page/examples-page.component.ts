import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../core/components/header/header.component';
import { FooterComponent } from '../../../../core/components/footer/footer.component';
import { GlassCardComponent } from '../../../../core/components/glass-card/glass-card.component';

@Component({
  selector: 'app-examples-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    GlassCardComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <app-header />
      
      <!-- Hero Section -->
      <section class="py-20 px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl text-slate-900 dark:text-white mb-6">Examples & Use Cases</h1>
          <p class="text-slate-600 dark:text-slate-300 mb-8">
            Discover how AI Video Bot can automate your content creation workflow. 
            From daily motivation shorts to weekly news summaries—we've got you covered.
          </p>
        </div>
      </section>

      <!-- Example Workflows -->
      <section class="py-12 px-6">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-2xl text-slate-900 dark:text-white text-center mb-12">Popular Workflow Templates</h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (example of examples; track example.title) {
              <app-glass-card className="overflow-hidden hover:scale-105 transition-transform">
                <div [class]="'h-48 bg-gradient-to-br ' + example.gradient + ' relative'">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <svg class="w-8 h-8 text-slate-900 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="p-6">
                  <div class="inline-block px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-700 text-white text-xs mb-3">
                    {{ example.badge }}
                  </div>
                  <h3 class="text-slate-900 dark:text-white mb-2">{{ example.title }}</h3>
                  <p class="text-slate-600 dark:text-slate-300 mb-4">{{ example.longDescription }}</p>
                  <div class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div class="flex items-center justify-between">
                      <span>Schedule:</span>
                      <span class="text-slate-900 dark:text-white">{{ example.schedule }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span>Volume:</span>
                      <span class="text-slate-900 dark:text-white">{{ example.videoCount }}</span>
                    </div>
                  </div>
                </div>
              </app-glass-card>
            }
          </div>
        </div>
      </section>

      <!-- Use Cases -->
      <section class="py-20 px-6 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl text-slate-900 dark:text-white text-center mb-12">Who Uses AI Video Bot?</h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (useCase of useCases; track useCase.title) {
              <app-glass-card className="p-6 text-center hover:scale-105 transition-transform">
                <div class="text-4xl mb-4">{{ useCase.icon }}</div>
                <h3 class="text-slate-900 dark:text-white mb-3">{{ useCase.title }}</h3>
                <p class="text-slate-600 dark:text-slate-300">{{ useCase.description }}</p>
              </app-glass-card>
            }
          </div>
        </div>
      </section>

      <!-- Sample Videos Preview -->
      <section class="py-20 px-6">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-2xl text-slate-900 dark:text-white text-center mb-12">Sample Video Thumbnails</h2>
          
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            @for (gradient of thumbnailGradients; track $index) {
              <div [class]="'aspect-[9/16] rounded-xl bg-gradient-to-br ' + gradient + ' shadow-lg hover:scale-105 transition-transform relative group cursor-pointer'">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20 px-6">
        <div class="max-w-4xl mx-auto text-center">
          <app-glass-card className="p-12">
            <h2 class="text-2xl text-slate-900 dark:text-white mb-4">Ready to Start Your Own Workflow?</h2>
            <p class="text-slate-600 dark:text-slate-300 mb-8">
              Choose from our templates or create a custom workflow that fits your needs.
            </p>
            <a 
              routerLink="/auth/login" 
              class="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl transition-all">
              Get Started Free
            </a>
          </app-glass-card>
        </div>
      </section>

      <app-footer />
    </div>
  `
})
export class ExamplesPageComponent {
  examples = [
    {
      title: 'Daily Motivation Shorts',
      description: 'Inspiring quotes published every morning at 08:00.',
      longDescription: 'Automated workflow that generates motivational content from a curated list of quotes. Perfect for building a consistent morning routine for your audience.',
      badge: 'YouTube • TikTok',
      gradient: 'from-green-400 to-emerald-600',
      schedule: 'Daily at 8:00 AM',
      videoCount: '30 videos/month'
    },
    {
      title: 'Weekly Tech News',
      description: 'Summarised AI-generated tech updates every Monday.',
      longDescription: 'Curate the latest tech news and let AI transform it into engaging video summaries. Keeps your audience informed without manual editing.',
      badge: 'YouTube',
      gradient: 'from-blue-400 to-indigo-600',
      schedule: 'Monday at 10:00 AM',
      videoCount: '4 videos/month'
    },
    {
      title: 'Productivity Tips Series',
      description: 'Practical advice in short, easy-to-watch clips.',
      longDescription: 'Share productivity hacks and life tips through bite-sized videos. AI generates scripts from your topic list and publishes automatically.',
      badge: 'TikTok',
      gradient: 'from-purple-400 to-pink-600',
      schedule: 'Tuesday & Friday at 6:00 PM',
      videoCount: '8 videos/month'
    },
    {
      title: 'Brand Announcements',
      description: 'Launch videos and campaign highlights on autopilot.',
      longDescription: 'Transform product launches and company updates into professional announcement videos. Schedule in advance and let AI handle the rest.',
      badge: 'YouTube • TikTok',
      gradient: 'from-orange-400 to-red-600',
      schedule: 'As needed',
      videoCount: 'Variable'
    },
    {
      title: 'Recipe Shorts',
      description: 'Quick cooking tutorials and food inspiration.',
      longDescription: 'Convert recipe cards into engaging cooking videos. AI generates step-by-step narration and adds background music automatically.',
      badge: 'TikTok • YouTube',
      gradient: 'from-yellow-400 to-orange-600',
      schedule: 'Daily at 12:00 PM',
      videoCount: '30 videos/month'
    },
    {
      title: 'Language Learning Clips',
      description: 'Daily vocabulary and phrases in short format.',
      longDescription: 'Build a language learning channel with daily vocabulary lessons. AI creates consistent, educational content from your word lists.',
      badge: 'YouTube',
      gradient: 'from-cyan-400 to-blue-600',
      schedule: 'Daily at 9:00 AM',
      videoCount: '30 videos/month'
    },
    {
      title: 'Fitness Challenge Series',
      description: '30-day workout challenges with daily exercises.',
      longDescription: 'Create engaging fitness content with daily workout videos. Each video includes exercise instructions and motivational messaging.',
      badge: 'TikTok • YouTube',
      gradient: 'from-red-400 to-pink-600',
      schedule: 'Daily at 7:00 AM',
      videoCount: '30 videos/month'
    },
    {
      title: 'History Facts',
      description: 'Interesting historical events and stories.',
      longDescription: 'Share fascinating history stories in engaging short-form videos. AI researches and scripts compelling narratives from historical topics.',
      badge: 'YouTube',
      gradient: 'from-indigo-400 to-purple-600',
      schedule: 'Every other day at 3:00 PM',
      videoCount: '15 videos/month'
    },
    {
      title: 'Book Summaries',
      description: 'Key insights from popular books in 60 seconds.',
      longDescription: 'Help your audience discover new books through quick video summaries. AI distills key concepts into digestible short-form content.',
      badge: 'TikTok',
      gradient: 'from-teal-400 to-cyan-600',
      schedule: 'Monday, Wednesday, Friday at 8:00 PM',
      videoCount: '12 videos/month'
    }
  ];

  useCases = [
    {
      title: 'Content Creators',
      description: 'Maintain consistent posting schedules without burnout. Generate multiple videos from one content idea.',
      icon: '🎬'
    },
    {
      title: 'Social Media Managers',
      description: 'Manage multiple brand accounts efficiently. Schedule content weeks in advance with automated publishing.',
      icon: '📱'
    },
    {
      title: 'Educators',
      description: 'Transform lesson plans into engaging video content. Reach students on platforms they already use.',
      icon: '📚'
    },
    {
      title: 'Small Businesses',
      description: 'Build brand awareness with regular video content. No video production experience required.',
      icon: '🏪'
    }
  ];

  thumbnailGradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-emerald-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-pink-500 to-purple-600',
    'from-yellow-500 to-orange-600',
    'from-indigo-500 to-purple-600',
    'from-teal-500 to-cyan-600',
    'from-red-500 to-pink-600',
    'from-violet-500 to-purple-600',
    'from-lime-500 to-green-600',
    'from-rose-500 to-pink-600'
  ];
}

