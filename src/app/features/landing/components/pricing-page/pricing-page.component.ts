import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../core/components/header/header.component';
import { FooterComponent } from '../../../../core/components/footer/footer.component';
import { GlassCardComponent } from '../../../../core/components/glass-card/glass-card.component';

@Component({
  selector: 'app-pricing-page',
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
          <h1 class="text-4xl text-slate-900 dark:text-white mb-6">Simple, Transparent Pricing</h1>
          <p class="text-slate-600 dark:text-slate-300 mb-8">
            Choose the plan that fits your needs. Start free, upgrade as you grow.
          </p>

          <!-- Billing Toggle -->
          <div class="inline-flex items-center gap-3 p-1 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <button
              (click)="isYearly.set(false)"
              [class]="'px-6 py-2 rounded-full transition-all ' + 
                       (!isYearly() ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-slate-600 dark:text-slate-300')">
              Monthly
            </button>
            <button
              (click)="isYearly.set(true)"
              [class]="'px-6 py-2 rounded-full transition-all ' + 
                       (isYearly() ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-slate-600 dark:text-slate-300')">
              Yearly
              <span class="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- Pricing Cards -->
      <section class="py-12 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-3 gap-6">
            @for (tier of tiers; track tier.name) {
              <app-glass-card [highlight]="tier.highlight" className="p-8">
                <h3 class="text-slate-900 dark:text-white mb-2">{{ tier.name }}</h3>
                <div class="mb-4">
                  <span class="text-slate-900 dark:text-white">
                    {{ isYearly() ? tier.yearlyPrice : tier.price }}
                  </span>
                  @if (tier.price !== '$0') {
                    <span class="text-slate-600 dark:text-slate-400">
                      {{ isYearly() ? ' / year' : ' / month' }}
                    </span>
                  }
                  @if (isYearly() && tier.savings) {
                    <div class="text-green-600 text-sm mt-1">{{ tier.savings }}</div>
                  }
                </div>
                <p class="text-slate-600 dark:text-slate-300 mb-6">{{ tier.description }}</p>
                
                <ul class="space-y-3 mb-8">
                  @for (feature of tier.features; track feature.text) {
                    <li class="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      @if (feature.included) {
                        <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      } @else {
                        <svg class="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      }
                      <span [class]="!feature.included ? 'text-slate-400 dark:text-slate-500' : ''">
                        {{ feature.text }}
                      </span>
                    </li>
                  }
                </ul>

                <button 
                  [class]="'w-full py-3 rounded-full transition-all ' + 
                           (tier.highlight 
                             ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl' 
                             : 'border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500')">
                  {{ tier.cta }}
                </button>
              </app-glass-card>
            }
          </div>
        </div>
      </section>

      <!-- Comparison Table -->
      <section class="py-20 px-6 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl text-slate-900 dark:text-white text-center mb-12">Feature Comparison</h2>
          
          <app-glass-card className="overflow-hidden">
            @for (section of comparisonFeatures; track section.category) {
              <div [class]="$index !== 0 ? 'border-t border-slate-200 dark:border-slate-700' : ''">
                <div class="p-4 bg-slate-100/50 dark:bg-slate-800/50">
                  <h3 class="text-slate-900 dark:text-white">{{ section.category }}</h3>
                </div>
                @for (feature of section.features; track feature.name) {
                  <div class="grid grid-cols-4 gap-4 p-4 border-t border-slate-200 dark:border-slate-700">
                    <div class="text-slate-700 dark:text-slate-300">{{ feature.name }}</div>
                    <div class="text-center text-slate-600 dark:text-slate-400">
                      @if (typeof feature.starter === 'boolean') {
                        @if (feature.starter) {
                          <svg class="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        } @else {
                          <svg class="w-5 h-5 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        }
                      } @else {
                        {{ feature.starter }}
                      }
                    </div>
                    <div class="text-center text-slate-600 dark:text-slate-400">
                      @if (typeof feature.pro === 'boolean') {
                        @if (feature.pro) {
                          <svg class="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        } @else {
                          <svg class="w-5 h-5 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        }
                      } @else {
                        {{ feature.pro }}
                      }
                    </div>
                    <div class="text-center text-slate-600 dark:text-slate-400">
                      @if (typeof feature.business === 'boolean') {
                        @if (feature.business) {
                          <svg class="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        } @else {
                          <svg class="w-5 h-5 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        }
                      } @else {
                        {{ feature.business }}
                      }
                    </div>
                  </div>
                }
              </div>
            }
          </app-glass-card>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-20 px-6">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-2xl text-slate-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div class="space-y-4">
            @for (faq of faqs; track faq.question) {
              <app-glass-card className="overflow-hidden">
                <button
                  (click)="toggleFaq($index)"
                  class="w-full p-6 text-left flex items-center justify-between hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors">
                  <span class="text-slate-900 dark:text-white">{{ faq.question }}</span>
                  <span class="text-slate-600 dark:text-slate-400 text-xl">{{ openFaq() === $index ? '−' : '+' }}</span>
                </button>
                @if (openFaq() === $index) {
                  <div class="px-6 pb-6 text-slate-600 dark:text-slate-300">
                    {{ faq.answer }}
                  </div>
                }
              </app-glass-card>
            }
          </div>
        </div>
      </section>

      <app-footer />
    </div>
  `
})
export class PricingPageComponent {
  isYearly = signal(false);
  openFaq = signal<number | null>(null);

  tiers = [
    {
      name: 'Starter',
      price: '$0',
      yearlyPrice: '$0',
      description: 'For trying the platform.',
      features: [
        { text: 'Up to 5 videos per month', included: true },
        { text: 'Telegram preview links', included: true },
        { text: 'Basic AI scripts', included: true },
        { text: 'HD exports', included: false },
        { text: 'Auto-publish', included: false },
        { text: 'Priority support', included: false }
      ],
      cta: 'Get Started Free',
      highlight: false
    },
    {
      name: 'Pro',
      price: '$29',
      yearlyPrice: '$290',
      description: 'For active creators and marketers.',
      features: [
        { text: 'Unlimited videos', included: true },
        { text: 'Telegram approvals', included: true },
        { text: 'Advanced AI scripts', included: true },
        { text: 'HD exports', included: true },
        { text: 'Auto-publish to YouTube & TikTok', included: true },
        { text: 'Priority support', included: false }
      ],
      cta: 'Start Pro',
      highlight: true,
      savings: 'Save $58/year'
    },
    {
      name: 'Business',
      price: '$79',
      yearlyPrice: '$790',
      description: 'For teams and agencies.',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: '4K exports', included: true },
        { text: 'Multiple brands', included: true },
        { text: 'Team collaboration', included: true },
        { text: 'Custom workflows', included: true },
        { text: 'Priority support', included: true }
      ],
      cta: 'Contact Sales',
      highlight: false,
      savings: 'Save $158/year'
    }
  ];

  comparisonFeatures = [
    { 
      category: 'Video Creation', 
      features: [
        { name: 'Videos per month', starter: '5', pro: 'Unlimited', business: 'Unlimited' },
        { name: 'AI Script Generation', starter: 'Basic', pro: 'Advanced', business: 'Advanced' },
        { name: 'Video Quality', starter: '720p', pro: '1080p HD', business: '4K' },
        { name: 'Background Music', starter: true, pro: true, business: true }
      ]
    },
    { 
      category: 'Publishing', 
      features: [
        { name: 'Telegram Previews', starter: true, pro: true, business: true },
        { name: 'Auto-publish to YouTube', starter: false, pro: true, business: true },
        { name: 'Auto-publish to TikTok', starter: false, pro: true, business: true },
        { name: 'Scheduling', starter: false, pro: true, business: true }
      ]
    },
    { 
      category: 'Team & Support', 
      features: [
        { name: 'Users', starter: '1', pro: '1', business: '5+' },
        { name: 'Multiple Brands', starter: false, pro: false, business: true },
        { name: 'Priority Support', starter: false, pro: false, business: true },
        { name: 'Custom Workflows', starter: false, pro: false, business: true }
      ]
    }
  ];

  faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
    },
    {
      question: 'What happens if I exceed the video limit on the Starter plan?',
      answer: 'You\'ll be prompted to upgrade to Pro. Alternatively, you can wait until the next month when your limit resets.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us for a full refund.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and other payment methods through our secure payment processor.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'We offer a free Starter plan so you can try the platform. You can upgrade to Pro or Business anytime to unlock more features.'
    }
  ];

  toggleFaq(index: number): void {
    if (this.openFaq() === index) {
      this.openFaq.set(null);
    } else {
      this.openFaq.set(index);
    }
  }
}

