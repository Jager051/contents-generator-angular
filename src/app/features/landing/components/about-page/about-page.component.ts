import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../core/components/header/header.component';
import { FooterComponent } from '../../../../core/components/footer/footer.component';
import { GlassCardComponent } from '../../../../core/components/glass-card/glass-card.component';
import { ImageWithFallbackComponent } from '../../../../core/components/image-with-fallback/image-with-fallback.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    GlassCardComponent,
    ImageWithFallbackComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <app-header />
      
      <!-- Hero Section -->
      <section class="py-20 px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl text-slate-900 dark:text-white mb-6">About AI Video Bot</h1>
          <p class="text-slate-600 dark:text-slate-300 mb-8">
            We're building the future of automated video content creation. Our mission is to help creators, 
            marketers, and brands save time and scale their video production with AI-powered workflows.
          </p>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="py-12 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-2xl text-slate-900 dark:text-white mb-4">Our Mission</h2>
              <p class="text-slate-600 dark:text-slate-300 mb-4">
                Creating engaging short-form videos for platforms like YouTube and TikTok is time-consuming 
                and requires multiple tools. We built AI Video Bot to solve this problem.
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Our platform automates every step—from script generation to publishing—so you can focus 
                on strategy and creativity instead of repetitive tasks.
              </p>
            </div>
            <app-glass-card className="p-8">
              <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center overflow-hidden">
                <app-image-with-fallback 
                  src="https://images.unsplash.com/photo-1676380364777-d53c900178fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwY3JlYXRvciUyMHN0dWRpb3xlbnwxfHx8fDE3NjM2MTIwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Content creation"
                  className="w-full h-full object-cover rounded-xl opacity-80" />
              </div>
            </app-glass-card>
          </div>
        </div>
      </section>

      <!-- Tech Stack Section -->
      <section class="py-20 px-6 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl text-slate-900 dark:text-white mb-4">Powered by Leading AI Technology</h2>
            <p class="text-slate-600 dark:text-slate-300">
              We integrate the best AI models and tools to deliver exceptional results.
            </p>
          </div>

          <div class="grid md:grid-cols-4 gap-6">
            @for (tech of techStack; track tech.title) {
              <app-glass-card className="p-6 text-center">
                <div [class]="'w-12 h-12 rounded-xl bg-gradient-to-br ' + tech.color + ' flex items-center justify-center mx-auto mb-4'">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="tech.iconPath" />
                  </svg>
                </div>
                <h3 class="text-slate-900 dark:text-white mb-2">{{ tech.title }}</h3>
                <p class="text-slate-600 dark:text-slate-300">{{ tech.description }}</p>
              </app-glass-card>
            }
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl text-slate-900 dark:text-white mb-4">Meet the Team</h2>
            <p class="text-slate-600 dark:text-slate-300">
              A small team passionate about AI and content creation.
            </p>
          </div>

          <div class="grid md:grid-cols-4 gap-6">
            @for (member of team; track member.name) {
              <app-glass-card className="p-6 text-center">
                <div [class]="'w-24 h-24 rounded-full bg-gradient-to-br ' + member.gradient + ' mx-auto mb-4'"></div>
                <h3 class="text-slate-900 dark:text-white mb-1">{{ member.name }}</h3>
                <p class="text-slate-600 dark:text-slate-300">{{ member.role }}</p>
              </app-glass-card>
            }
          </div>
        </div>
      </section>

      <app-footer />
    </div>
  `
})
export class AboutPageComponent {
  techStack = [
    {
      iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
      title: 'GPT-4',
      description: 'Advanced script generation',
      color: 'from-green-500 to-emerald-600'
    },
    {
      iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Sora & Veo',
      description: 'AI video generation',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      title: 'Telegram Bot',
      description: 'Instant approvals',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      title: 'Platform APIs',
      description: 'YouTube & TikTok publishing',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  team = [
    { name: 'Alex Chen', role: 'Founder & CEO', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Sarah Kim', role: 'Head of AI', gradient: 'from-purple-400 to-purple-600' },
    { name: 'Mike Johnson', role: 'Lead Engineer', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'Emma Davis', role: 'Product Designer', gradient: 'from-pink-400 to-pink-600' }
  ];
}

