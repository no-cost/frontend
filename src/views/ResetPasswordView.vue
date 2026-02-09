<script lang="ts">
import { defineComponent } from 'vue'
import VueTurnstile from 'vue-turnstile'

import FormFieldComponent from '@/components/FormFieldComponent.vue'

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
  },
  methods: {
    async requestReset(form: HTMLFormElement) {
      if (!form.reportValidity()) return

      if (!this.turnstileToken) {
        this.info = 'Please complete the verification.'
        return
      }

      const formData = new FormData(form)
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/v1/account/reset-password/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.get('email'),
            turnstile_token: this.turnstileToken,
          }),
        })

        this.success = true
        this.info = 'If an account with that email exists, a reset link has been sent.'
      } catch {
        this.info = 'Network error. Please try again.'
      }
    },
    async setPassword(form: HTMLFormElement) {
      if (!form.reportValidity()) return

      const formData = new FormData(form)
      const password = formData.get('password') as string
      const confirm = formData.get('confirm') as string

      if (password !== confirm) {
        this.info = 'Passwords do not match.'
        return
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/account/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.token, password }),
        })

        const data = await response.json()

        if (!response.ok) {
          this.info = data.detail ?? 'Failed to set password.'
          return
        }

        this.success = true
        this.info = null
      } catch {
        this.info = 'Network error. Please try again.'
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
        <h1 class="mb-8 text-center font-bold text-3xl">Set your password</h1>

        <template v-if="success">
          <p class="text-sm text-gray-400 text-center">
            Your password has been set.
            <RouterLink :to="{ name: 'login' }" class="text-cyan-400">Log in</RouterLink>
          </p>
        </template>

        <form v-else method="POST" @submit.prevent="setPassword($el)">
          <div class="space-y-1">
            <FormFieldComponent
              type="password"
              title="Password"
              placeholder="Choose a password"
              autocomplete="new-password"
              required
            />
            <FormFieldComponent
              type="password"
              title="Confirm"
              placeholder="Confirm your password"
              autocomplete="new-password"
              required
            />
          </div>

          <p v-if="info" class="pl-3 mt-4 text-sm text-left text-red-400 border-l-2 border-red-500">
            {{ info }}
          </p>

          <div class="mt-8">
            <button type="submit" class="button w-full text-center">Set password</button>
          </div>
        </form>
      </template>

      <!-- request reset (no token) -->
      <template v-else>
        <h1 class="mb-4 text-center font-bold text-3xl">Reset password</h1>

        <p class="mb-8 text-sm text-center text-gray-400">
          This resets your <strong class="text-gray-300">settings panel</strong> password. To reset
          your instance's admin password, use the app's built-in password reset (at your site URL).
        </p>

        <template v-if="success">
          <p class="text-sm text-gray-400 text-center">{{ info }}</p>
        </template>

        <form v-else method="POST" @submit.prevent="requestReset($el)">
          <FormFieldComponent
            type="email"
            title="Email"
            placeholder="Your account email"
            autocomplete="email"
            required
          />

          <VueTurnstile
            :site-key="turnstileSiteKey"
            v-model="turnstileToken"
            theme="dark"
            class="mt-4"
          />

          <p v-if="info" class="pl-3 mt-4 text-sm text-left text-red-400 border-l-2 border-red-500">
            {{ info }}
          </p>

          <div class="mt-8">
            <button type="submit" class="button w-full text-center">Send reset link</button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>
