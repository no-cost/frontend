<script lang="ts">
import { defineComponent } from 'vue'
import VueTurnstile from 'vue-turnstile'

import FormFieldComponent from '@/components/FormFieldComponent.vue'

export default defineComponent({
  name: 'SignUpView',
  components: {
    FormFieldComponent,
    VueTurnstile,
  },
  data() {
    return {
      info: null as null | string,
      success: false,
      turnstileToken: null as null | string,
    }
  },
  computed: {
    turnstileSiteKey(): string {
      return import.meta.env.VITE_TURNSTILE_SITE_KEY
    },
  },
  methods: {
    resetTurnstile() {
      this.turnstileToken = null
      ;(this.$refs.turnstile as any).reset()
    },
    async createSite(form: HTMLFormElement) {
      if (!form.reportValidity()) return

      if (!this.turnstileToken) {
        this.info = 'Please complete the verification.'
        return
      }

      const formData = new FormData(form)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/signup/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tag: formData.get('tag'),
            email: formData.get('email'),
            site_type: formData.get('site_type'),
            parent_domain: formData.get('parent_domain'),
            turnstile_token: this.turnstileToken,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          this.info = data.detail ?? 'Something went wrong.'
          this.resetTurnstile()
          return
        }

        this.success = true
        this.info = null
      } catch {
        this.info =
          'Network error. Please, try again later. If the problem persists, contact support.'
        this.resetTurnstile()
      }
    },
  },
})
</script>

<template>
  <div class="max-w-md mx-auto px-6">
    <div
      class="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h1 class="text-center font-bold mb-6">
        {{ success ? 'Creating your site...' : 'Create site' }}
      </h1>

      <template v-if="success">
        <p class="text-sm text-gray-400 text-center">
          Your site is being installed. Check your email to set your password and get started.
        </p>
      </template>

      <form v-else method="POST" @submit.prevent="createSite($event.target as HTMLFormElement)">
        <FormFieldComponent title="Tag" placeholder="Your site name" pattern="[a-zA-Z0-9_]{3,32}" title_attr="Only letters, digits, and/or underscores, between 3 and 32 characters" required />
        <FormFieldComponent type="email" title="Email" placeholder="Your admin email" required />

        <div class="mt-4 space-y-2">
          <span class="text-sm font-medium">Application</span>
          <select
            name="site_type"
            class="w-full p-3 my-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-200 dark:border-gray-700"
            required
          >
            <option value="flarum">Flarum (Forum)</option>
            <option value="mediawiki">MediaWiki (Wiki)</option>
            <option value="wordpress">WordPress (Blog/CMS)</option>
          </select>
        </div>

        <input type="hidden" name="parent_domain" value="no-cost.site" />

        <VueTurnstile
          ref="turnstile"
          :site-key="turnstileSiteKey"
          v-model="turnstileToken"
          theme="dark"
          class="mt-4"
        />

        <p v-if="info" class="pl-3 mt-4 text-sm text-left text-red-400 border-l-2 border-red-500">
          {{ info }}
        </p>

        <div class="mt-8">
          <button type="submit" class="button w-full text-center">Create site</button>
        </div>
      </form>
    </div>
  </div>
</template>
