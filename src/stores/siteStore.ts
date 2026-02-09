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
      // TODO: call backend logout endpoint when available
      localStorage.removeItem('access_token')
      this.token = ''
    },
    async getSiteData() {
      if (!this.isAuthenticated) return

      // TODO: update when backend /v1/account/ is complete
      const response = await (
        await fetch(`${API_URL}/v1/account/`, {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
      ).json()

      if (response['errors']) {
        localStorage.removeItem('access_token')
        this.token = ''
        return
      }

      this.tag = response['data']['tag']
      this.email = response['data']['admin_email']
      this.siteType = response['data']['site_type']
      this.hostname = response['data']['hostname']
      this.donated = response['data']['donated'] ?? 0
    },
  },
  getters: {
    isAuthenticated: (state): boolean => state.token.length > 0,
  },
})
