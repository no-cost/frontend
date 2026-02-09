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
    },
    async getSiteData() {
      if (!this.isAuthenticated) return

      try {
        const response = await fetch(`${API_URL}/v1/account/`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })

        if (!response.ok) {
          await this.logout()
          return
        }

        const data = await response.json()
        this.tag = data.tag
        this.email = data.admin_email
        this.siteType = data.site_type
        this.hostname = data.hostname
        this.donated = data.donated_amount ?? 0
      } catch {
        await this.logout()
      }
    },
  },
  getters: {
    isAuthenticated: (state): boolean => state.token.length > 0,
  },
})
