import { createRouter, createWebHistory } from 'vue-router'

import useSiteStore from '@/stores/siteStore'
import ConfirmEmailView from '@/views/ConfirmEmailView.vue'
import ContactView from '@/views/contact/ContactView.vue'
import DonateView from '@/views/DonateView.vue'
import FeaturesView from '@/views/FeaturesView.vue'
import HomeView from '@/views/home/HomeView.vue'
import SignUpView from '@/views/home/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import SettingsView from '@/views/settings/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/features',
      name: 'features',
      component: FeaturesView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
    },
    {
      path: '/confirm-email',
      name: 'confirm-email',
      component: ConfirmEmailView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/donate',
      name: 'donate',
      component: DonateView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to) => {
  const store = useSiteStore()

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guest && store.isAuthenticated) {
    return { name: 'settings' }
  }
})

export default router
