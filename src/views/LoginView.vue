<script lang="ts">
import { defineComponent } from 'vue'

import useSiteStore from '@/stores/siteStore'
import { mapStores } from 'pinia'
import FormFieldComponent from '@/components/FormFieldComponent.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    FormFieldComponent,
  },
  data() {
    return {
      info: null as null | string,
    }
  },
  computed: {
    ...mapStores(useSiteStore),
  },
  methods: {
    async login(form: HTMLFormElement) {
      if (!form.reportValidity()) return
      const formData = new FormData(form)

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/account/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password'),
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          this.info = data.detail ?? 'Login failed'
          return
        }

        this.siteStore.saveToken(data.token, formData.get('remember') === 'on')
        await this.siteStore.getSiteData()
        this.$router.push({ name: 'settings' })
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
      <h1 class="mb-8 text-center font-bold text-3xl">Log in</h1>

      <form method="POST" @submit.prevent="login($el)">
        <div class="space-y-1">
          <FormFieldComponent
            placeholder="Site tag"
            title="Username"
            autocomplete="username"
            required
          />

          <FormFieldComponent
            placeholder="Your admin account password"
            type="password"
            title="Password"
            autocomplete="current-password"
            required
          />
        </div>

        <div class="flex items-center mt-4">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            class="mr-2 rounded border-gray-300 dark:border-gray-600"
          />
          <label for="remember" class="text-sm text-gray-500">Remember Me</label>
        </div>

        <p v-if="info" class="pl-3 mt-4 text-sm text-left text-red-400 border-l-2 border-red-500">
          {{ info }}
        </p>

        <div class="mt-8">
          <button type="submit" class="button w-full text-center">Log in</button>
        </div>

        <p class="mt-4 text-sm text-center text-gray-500">
          <RouterLink :to="{ name: 'reset-password' }">Forgot password?</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
