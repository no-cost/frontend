<script lang="ts">
import { defineComponent } from 'vue'
import VueTurnstile from 'vue-turnstile'

import FormFieldComponent from '@/components/FormFieldComponent.vue'
import { extractError } from '@/utils/api'
import { isDark } from '@/utils/theme'

export default defineComponent({
  name: 'ResetPasswordView',
  components: {
    FormFieldComponent,
    VueTurnstile,
  },
  data() {
    return {
      info: null as null | string,
      success: false,
      turnstileToken: '',
    }
  },
  computed: {
    token(): string | null {
      const t = this.$route.query.token
      return typeof t === 'string' ? t : null
    },
    turnstileSiteKey(): string {
      return import.meta.env.VITE_TURNSTILE_SITE_KEY
    },
    turnstileTheme(): string {
      return isDark() ? 'dark' : 'light'
    },
  },
  methods: {
    resetTurnstile() {
      this.turnstileToken = ''
      ;(this.$refs.turnstile as any).reset()
    },
    async requestReset(form: HTMLFormElement) {
      if (!form.reportValidity()) return

      if (!this.turnstileToken) {
        this.info = this.$t('common.completeVerification')
        return
      }

      const formData = new FormData(form)
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/account/reset-password/request`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              site: formData.get('site'),
              turnstile_token: this.turnstileToken,
            }),
          },
        )

        if (!response.ok) {
          this.info = await extractError(response)
          this.resetTurnstile()
          return
        }

        this.success = true
        this.info = this.$t('resetPassword.resetSuccess')
      } catch {
        this.info = this.$t('common.networkErrorLong')
        this.resetTurnstile()
      }
    },
    async setPassword(form: HTMLFormElement) {
      if (!form.reportValidity()) return

      const formData = new FormData(form)
      const password = formData.get('password') as string
      const confirm = formData.get('confirm') as string

      if (password !== confirm) {
        this.info = this.$t('common.passwordsNoMatch')
        return
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/account/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.token, password }),
        })

        if (!response.ok) {
          this.info = await extractError(response, this.$t('resetPassword.setFailed'))
          return
        }

        this.success = true
        this.info = null
      } catch {
        this.info = this.$t('common.networkError')
      }
    },
  },
})
</script>

<template>
  <div class="max-w-sm mx-auto px-6">
    <div
      class="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <!-- set password (token present) -->
      <template v-if="token">
        <h1 class="mb-8 text-center font-bold text-3xl">{{ $t('resetPassword.setTitle') }}</h1>

        <template v-if="success">
          <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
            {{ $t('resetPassword.passwordSet') }}
            <RouterLink :to="{ name: 'login' }" class="text-cyan-400">{{
              $t('resetPassword.loginLink')
            }}</RouterLink>
          </p>
        </template>

        <form v-else method="POST" @submit.prevent="setPassword($event.target as HTMLFormElement)">
          <div class="space-y-1">
            <FormFieldComponent
              name="password"
              type="password"
              :title="$t('resetPassword.passwordLabel')"
              :placeholder="$t('resetPassword.passwordPlaceholder')"
              autocomplete="new-password"
              required
            />
            <FormFieldComponent
              name="confirm"
              type="password"
              :title="$t('resetPassword.confirmLabel')"
              :placeholder="$t('resetPassword.confirmPlaceholder')"
              autocomplete="new-password"
              required
            />
          </div>

          <p v-if="info" class="pl-3 mt-4 text-sm text-left text-red-400 border-l-2 border-red-500">
            {{ info }}
          </p>

          <div class="mt-8">
            <button type="submit" class="button w-full text-center">
              {{ $t('resetPassword.setButton') }}
            </button>
          </div>
        </form>
      </template>

      <!-- request reset (no token) -->
      <template v-else>
        <h1 class="mb-4 text-center font-bold text-3xl">{{ $t('resetPassword.resetTitle') }}</h1>

        <p class="mb-8 text-sm text-center text-gray-500 dark:text-gray-400">
          <i18n-t keypath="resetPassword.resetDescription" tag="span">
            <template #bold>
              <strong class="text-gray-700 dark:text-gray-300">{{
                $t('resetPassword.resetDescriptionBold')
              }}</strong>
            </template>
          </i18n-t>
        </p>

        <template v-if="success">
          <p class="text-sm text-gray-500 dark:text-gray-400 text-center">{{ info }}</p>
        </template>

        <form v-else method="POST" @submit.prevent="requestReset($event.target as HTMLFormElement)">
          <FormFieldComponent
            name="site"
            type="text"
            :title="$t('resetPassword.site')"
            :placeholder="$t('resetPassword.sitePlaceholder')"
            autocomplete="username"
            required
          />

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
              {{ $t('resetPassword.sendResetLink') }}
            </button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>
