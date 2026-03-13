<script lang="ts">
import { defineComponent } from 'vue'
import VueTurnstile from 'vue-turnstile'

import FormFieldComponent from '@/components/FormFieldComponent.vue'
import { extractError } from '@/utils/api'
import { isDark } from '@/utils/theme'

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
      allowedDomains: [] as string[],
    }
  },
  computed: {
    turnstileSiteKey(): string {
      return import.meta.env.VITE_TURNSTILE_SITE_KEY
    },
    turnstileTheme(): string {
      return isDark() ? 'dark' : 'light'
    },
  },
  async mounted() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/signup/allowed-domains`)
      if (response.ok) {
        this.allowedDomains = await response.json()
      }
    } catch {}
  },
  methods: {
    resetTurnstile() {
      this.turnstileToken = null
      ;(this.$refs.turnstile as any).reset()
    },
    async createSite(form: HTMLFormElement) {
      if (!form.reportValidity()) return

      if (!this.turnstileToken) {
        this.info = this.$t('common.completeVerification')
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

        if (!response.ok) {
          this.info = await extractError(response)
          this.resetTurnstile()
          return
        }

        this.success = true
        this.info = null
      } catch {
        this.info = this.$t('common.networkErrorLong')
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
        {{ success ? $t('signup.creatingTitle') : $t('signup.createTitle') }}
      </h1>

      <template v-if="success">
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
          {{ $t('signup.successMessage') }}
        </p>
      </template>

      <form v-else method="POST" @submit.prevent="createSite($event.target as HTMLFormElement)">
        <FormFieldComponent
          name="tag"
          :title="$t('signup.tag')"
          :placeholder="$t('signup.tagPlaceholder')"
          pattern="[a-zA-Z0-9_]{3,32}"
          :title_attr="$t('signup.tagPattern')"
          required
        />
        <FormFieldComponent
          name="email"
          type="email"
          :title="$t('signup.email')"
          :placeholder="$t('signup.emailPlaceholder')"
          required
        />

        <div class="mt-4 space-y-2">
          <span class="text-sm font-medium">{{ $t('signup.application') }}</span>
          <select
            name="site_type"
            class="w-full p-3 my-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-200 dark:border-gray-700"
            required
          >
            <option value="flarum">{{ $t('signup.flarum') }}</option>
            <option value="mediawiki">{{ $t('signup.mediawiki') }}</option>
            <option value="wordpress">{{ $t('signup.wordpress') }}</option>
          </select>
        </div>

        <div v-if="allowedDomains.length > 1" class="mt-4 space-y-2">
          <span class="text-sm font-medium">{{ $t('signup.domain') }}</span>
          <select
            name="parent_domain"
            class="w-full p-3 my-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-200 dark:border-gray-700"
            required
          >
            <option v-for="d in allowedDomains" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>

        <VueTurnstile
          ref="turnstile"
          :site-key="turnstileSiteKey"
          v-model="turnstileToken"
          :theme="turnstileTheme"
          class="mt-4"
        />

        <p v-if="info" class="pl-3 mt-4 text-sm text-left text-red-400 border-l-2 border-red-500">
          {{ info }}
        </p>

        <div class="mt-8">
          <button type="submit" class="button w-full text-center">
            {{ $t('signup.createButton') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
