import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '../../../../core/components/header/header.component';
import { FooterComponent } from '../../../../core/components/footer/footer.component';
import { GlassCardComponent } from '../../../../core/components/glass-card/glass-card.component';
import { ImageWithFallbackComponent } from '../../../../core/components/image-with-fallback/image-with-fallback.component';

@Component({
  selector: 'app-landing-page',
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
      <section class="relative overflow-hidden py-20 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl text-slate-900 dark:text-white mb-6">
                Create & Publish AI-Generated Videos Automatically
              </h1>
              <p class="text-slate-600 dark:text-slate-300 mb-8">
                Turn your ideas, scripts and text content into short-form videos for YouTube and TikTok using fully automated AI workflows.
              </p>
              <div class="flex flex-wrap gap-4 mb-6">
                <a 
                  routerLink="/auth/login" 
                  class="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl transition-all">
                  Start For Free
                </a>
                <button class="px-8 py-3 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-colors flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </button>
              </div>
              <p class="text-slate-500 dark:text-slate-400">
                No credit card required • Cancel anytime
              </p>
            </div>

            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"></div>
              <app-glass-card className="p-6 relative">
                <div class="space-y-4">
                  <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <app-image-with-fallback 
                      src="https://images.unsplash.com/photo-1579109652910-99b9be06aaec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzYzMDMwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Video preview"
                      className="w-full h-full object-cover rounded-xl opacity-60" />
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <svg class="w-8 h-8 text-purple-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    @for (step of steps; track $index) {
                      <div class="flex flex-col items-center gap-1">
                        <div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs">
                          {{ $index + 1 }}
                        </div>
                        <span class="text-[10px]">{{ step }}</span>
                      </div>
                    }
                  </div>

                  <div class="bg-slate-900 dark:bg-slate-800 rounded-xl p-4 text-white">
                    <div class="flex items-center gap-2 mb-3">
                      <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Telegram Approval</span>
                    </div>
                    <p class="text-sm mb-3 text-slate-300">Your video is ready for review!</p>
                    <div class="flex gap-2">
                      <button class="flex-1 px-4 py-2 rounded-full bg-green-500 text-white">
                        ✓ Approve
                      </button>
                      <button class="flex-1 px-4 py-2 rounded-full bg-orange-500 text-white">
                        ↻ Regenerate
                      </button>
                    </div>
                  </div>
                </div>
              </app-glass-card>
            </div>
          </div>
        </div>
      </section>

      <!-- Social Proof -->
      <section class="py-12 px-6 border-y border-white/20 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto text-center">
          <p class="text-slate-600 dark:text-slate-300 mb-6">
            Trusted by content creators, marketers and small businesses automating their video workflows.
          </p>
          <div class="flex justify-center items-center gap-12 opacity-60">
            <svg class="w-12 h-12 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <svg class="w-12 h-12 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221c-.497 0-.906.15-1.226.451-.321.3-.481.7-.481 1.2v4.256c0 .5.16.9.481 1.2.32.3.729.451 1.226.451.497 0 .906-.15 1.226-.451.32-.3.481-.7.481-1.2V9.872c0-.5-.16-.9-.481-1.2-.32-.3-.729-.451-1.226-.451zM12 8.221c-.497 0-.906.15-1.226.451-.321.3-.481.7-.481 1.2v4.256c0 .5.16.9.481 1.2.32.3.729.451 1.226.451.497 0 .906-.15 1.226-.451.32-.3.481-.7.481-1.2V9.872c0-.5-.16-.9-.481-1.2-.32-.3-.729-.451-1.226-.451zM6.105 8.221c-.497 0-.906.15-1.226.451-.321.3-.481.7-.481 1.2v4.256c0 .5.16.9.481 1.2.32.3.729.451 1.226.451.497 0 .906-.15 1.226-.451.32-.3.481-.7.481-1.2V9.872c0-.5-.16-.9-.481-1.2-.32-.3-.729-.451-1.226-.451z"/>
            </svg>
            <div class="w-12 h-12 rounded-lg bg-slate-300 dark:bg-slate-600"></div>
            <div class="w-12 h-12 rounded-lg bg-slate-300 dark:bg-slate-600"></div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl text-slate-900 dark:text-white mb-4">Why AI Video Bot?</h2>
            <p class="text-slate-600 dark:text-slate-300">
              Automate the boring parts so you can focus on ideas.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (feature of features; track feature.title) {
              <app-glass-card className="p-6 hover:scale-105 transition-transform">
                <div [class]="'w-12 h-12 rounded-xl bg-gradient-to-br ' + feature.color + ' flex items-center justify-center mb-4'">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="feature.iconPath" />
                  </svg>
                </div>
                <h3 class="text-slate-900 dark:text-white mb-2">{{ feature.title }}</h3>
                <p class="text-slate-600 dark:text-slate-300">{{ feature.text }}</p>
              </app-glass-card>
            }
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="py-20 px-6 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl text-slate-900 dark:text-white mb-4">How It Works</h2>
            <p class="text-slate-600 dark:text-slate-300">
              From text input to auto-published videos in 8 steps.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            @for (step of howItWorksSteps; track $index) {
              <div class="flex gap-4 items-start">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                  {{ $index + 1 }}
                </div>
                <p class="text-slate-700 dark:text-slate-300 pt-1">{{ step }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Examples -->
      <section id="examples" class="py-20 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl text-slate-900 dark:text-white mb-4">Example Workflows</h2>
            <p class="text-slate-600 dark:text-slate-300">
              Use AI Video Bot for different content types.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (example of examples; track example.title) {
              <app-glass-card className="overflow-hidden hover:scale-105 transition-transform">
                <div [class]="'h-32 bg-gradient-to-br ' + example.gradient"></div>
                <div class="p-4">
                  <div class="inline-block px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-700 text-white text-xs mb-3">
                    {{ example.badge }}
                  </div>
                  <h3 class="text-slate-900 dark:text-white mb-2">{{ example.title }}</h3>
                  <p class="text-slate-600 dark:text-slate-300">{{ example.description }}</p>
                </div>
              </app-glass-card>
            }
          </div>

          <div class="text-center mt-8">
            <a 
              routerLink="/examples" 
              class="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
              See more examples →
            </a>
          </div>
        </div>
      </section>

      <!-- Pricing Preview -->
      <section class="py-20 px-6 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl text-slate-900 dark:text-white mb-4">Simple Pricing for Every Stage</h2>
            <p class="text-slate-600 dark:text-slate-300">
              Start free, upgrade when you are ready.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6 mb-8">
            @for (tier of pricingTiers; track tier.name) {
              <app-glass-card [highlight]="tier.highlight" className="p-6">
                <h3 class="text-slate-900 dark:text-white mb-2">{{ tier.name }}</h3>
                <div class="mb-4">
                  <span class="text-slate-900 dark:text-white">{{ tier.price }}</span>
                  @if (tier.period) {
                    <span class="text-slate-600 dark:text-slate-400">{{ tier.period }}</span>
                  }
                </div>
                <p class="text-slate-600 dark:text-slate-300 mb-6">{{ tier.description }}</p>
                <ul class="space-y-3 mb-6">
                  @for (feature of tier.features; track feature) {
                    <li class="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{{ feature }}</span>
                    </li>
                  }
                </ul>
                <button 
                  [class]="'w-full py-3 rounded-full transition-all ' + 
                           (tier.highlight ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl' : 'border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500')">
                  {{ tier.cta }}
                </button>
              </app-glass-card>
            }
          </div>

          <div class="text-center">
            <a 
              routerLink="/pricing" 
              class="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
              See detailed pricing →
            </a>
          </div>
        </div>
      </section>

      <!-- CTA Band -->
      <section class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h2 class="text-2xl text-white mb-4">Ready to Automate Your Video Publishing?</h2>
          <p class="text-white/90 mb-8">
            Launch your first AI-powered workflow in minutes.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a 
              routerLink="/auth/login" 
              class="px-8 py-3 rounded-full bg-white text-purple-600 hover:shadow-2xl transition-all">
              Start Free Trial
            </a>
            <button class="px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white/10 transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      <app-footer />
    </div>
  `
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  steps = ['Input', 'Trigger', 'Script', 'Music', 'Video', 'Preview', 'Approve', 'Publish'];
  
  features = [
    {
      iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
      title: 'AI Script Generation',
      text: 'Transform simple text topics into ready-to-use video scripts tailored to your tone.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      iconPath: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
      title: 'Auto Music & Audio',
      text: 'Generate matching background music so every video sounds as good as it looks.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      title: 'Telegram Approvals',
      text: 'Review, approve or regenerate videos directly from Telegram without logging in.',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: '1-Click Publishing',
      text: 'Automatically publish approved videos to YouTube and TikTok according to your schedule.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  howItWorksSteps = [
    'Add your topics or upload an Excel file.',
    'Choose schedule or Telegram-based triggers.',
    'Let the AI write the video script.',
    'Generate matching background music.',
    'Create the final video using Sora or Veo.',
    'Receive a preview link via Telegram.',
    'Approve or request changes from your phone.',
    'Auto-publish to YouTube and TikTok.'
  ];

  examples = [
    {
      title: 'Daily Motivation Shorts',
      description: 'Inspiring quotes published every morning at 08:00.',
      badge: 'YouTube • TikTok',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      title: 'Weekly Tech News',
      description: 'Summarised AI-generated tech updates every Monday.',
      badge: 'YouTube',
      gradient: 'from-blue-400 to-indigo-600'
    },
    {
      title: 'Productivity Tips Series',
      description: 'Practical advice in short, easy-to-watch clips.',
      badge: 'TikTok',
      gradient: 'from-purple-400 to-pink-600'
    },
    {
      title: 'Brand Announcements',
      description: 'Launch videos and campaign highlights on autopilot.',
      badge: 'YouTube • TikTok',
      gradient: 'from-orange-400 to-red-600'
    }
  ];

  pricingTiers = [
    {
      name: 'Starter',
      price: '$0',
      description: 'For trying the platform.',
      features: [
        'Up to 5 videos per month',
        'Telegram preview links',
        'Basic AI scripts'
      ],
      cta: 'Get Started Free',
      highlight: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/ month',
      description: 'For active creators and marketers.',
      features: [
        'Unlimited workflows',
        'HD exports',
        'Auto-publish to YouTube & TikTok'
      ],
      cta: 'Start Pro',
      highlight: true
    },
    {
      name: 'Business',
      price: '$79',
      period: '/ month',
      description: 'For teams and agencies.',
      features: [
        '4K exports',
        'Multiple brands',
        'Priority support'
      ],
      cta: 'Contact Sales',
      highlight: false
    }
  ];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // URL'de fragment varsa scroll et
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => this.scrollToElement(fragment), 100);
      }
    });

    // Navigation end olduğunda fragment varsa scroll et
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          setTimeout(() => this.scrollToElement(fragment), 100);
        }
      });
  }

  ngAfterViewInit(): void {
    // Sayfa yüklendiğinde fragment varsa scroll et
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      setTimeout(() => this.scrollToElement(fragment), 300);
    }
  }

  private scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80; // Header yüksekliği için offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}

