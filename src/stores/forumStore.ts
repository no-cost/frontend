import { defineStore } from 'pinia'

export default defineStore('forum', {
  state: () => ({
    token: '',
    tag: '',
    email: '',
    url: '',
    donated: 0,
  }),
  actions: {
    saveToken(token: string, remember: boolean = true) {
      if (remember) localStorage.setItem('access_token', token)
      this.token = token
    },
    loadSavedToken() {
      const token = localStorage.getItem('access_token')
      if (token !== null && token.length == 40) {
        this.token = token
      }
      return this.token
    },
    async logout() {
      await fetch('https://api.freeflarum.com/authentication/logout', { credentials: 'include' })
      localStorage.removeItem('access_token')
      this.token = ''
    },
    async getForumData() {
      if (!this.isAuthenticated) return
      const response = await (
        await fetch(`https://api.freeflarum.com/settings/`, {
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
      this.email = response['data']['email']
      this.url = response['data']['url']
      this.donated = response['data']['donated']
    },
  },
  getters: {
    isAuthenticated: (forum): boolean => forum.token.length > 0,
  },
})
