import router from '@/router'
import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL

export default defineStore('site', {
  state: () => ({
    token: '',
    tag: '',
    email: '',
    siteType: '',
    hostname: '',
    donated: 0,
    installedAt: null as string | null,
    createdAt: '',
  }),
  actions: {
    saveToken(token: string, remember: boolean = true) {
      if (remember) localStorage.setItem('access_token', token)
      this.token = token
    },
    loadSavedToken() {
      const token = localStorage.getItem('access_token')
      if (token !== null && token.length > 0) {
        this.token = token
      }
      return this.token
    },
    async logout() {
      localStorage.removeItem('access_token')
      this.token = ''
      this.tag = ''
      this.email = ''
      this.siteType = ''
      this.hostname = ''
      this.donated = 0
      this.installedAt = null
      this.createdAt = ''
    },
    async getSiteData() {
      if (!this.isAuthenticated) return

      try {
        const response = await fetch(`${API_URL}/v1/account/`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })

        if (!response.ok) {
          if (response.status === 401 || response.status === 404) {
            await this.logout()
            router.push({ name: 'login' })
          }
          return
        }

        const data = await response.json()
        this.tag = data.tag
        this.email = data.admin_email
        this.siteType = data.site_type
        this.hostname = data.hostname
        this.donated = data.donated_amount ?? 0
        this.installedAt = data.installed_at
        this.createdAt = data.created_at
      } catch {
        // network error; don't logout, server may just be unreachable
      }
    },
  },
  getters: {
    isAuthenticated: (state): boolean => state.token.length > 0,
    isDonor: (state): boolean => state.donated >= 7.0,
  },
})
