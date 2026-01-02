import { createRouter, createWebHistory } from 'vue-router'

import CreateForumView from '@/views/home/CreateForumView.vue'
import HomeView from '@/views/home/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SignUpView from '@/views/home/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'home',
          component: CreateForumView,
        },
        {
          path: '/signup',
          name: 'signup',
          component: SignUpView,
        },
      ],
    },
    {
      path: '/contact',
      name: 'contact',
      component: import('@/views/contact/ContactView.vue'),
    },
    {
      path: '/extensions',
      name: 'extensions',
      component: import('@/views/ExtensionsView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: import('@/views/LoginView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: import('@/views/settings/SettingsView.vue'),
    },
    {
      path: '/donate',
      name: 'donate',
      component: import('@/views/DonateView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
})

export default router
