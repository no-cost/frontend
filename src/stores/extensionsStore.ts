import { defineStore } from 'pinia'

export default defineStore('extensions', {
  state: () => ({
    data: {} as {
      category: {
        id: string
        title: string
        icon_name: string | null
        description: string
        author: string
        url: string
      }[]
    },
    isLoaded: false,
    infoText: 'Loading...',
  }),
  actions: {
    async getExtensions() {
      let response = await (await fetch('https://api.freeflarum.com/extensions')).json()

      if (!response['errors']) {
        this.data = response['data']
      }

      this.isLoaded = true
    },
  },
})
