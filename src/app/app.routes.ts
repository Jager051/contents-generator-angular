import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/components/landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/landing/components/about-page/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'examples',
    loadComponent: () => import('./features/landing/components/examples-page/examples-page.component').then(m => m.ExamplesPageComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./features/landing/components/pricing-page/pricing-page.component').then(m => m.PricingPageComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];