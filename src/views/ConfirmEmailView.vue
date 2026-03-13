<script lang="ts">
import { defineComponent } from 'vue'

import { extractError } from '@/utils/api'

const API_URL = import.meta.env.VITE_API_URL

export default defineComponent({
  name: 'ConfirmEmailView',
  data() {
    return {
      info: null as string | null,
      success: false,
      loading: true,
    }
  },
  computed: {
    token(): string | null {
      const t = this.$route.query.token
      return typeof t === 'string' ? t : null
    },
  },
  async mounted() {
    if (!this.token) {
      this.info = this.$t('confirmEmail.missingToken')
      this.loading = false
      return
    }

    try {
      const response = await fetch(`${API_URL}/v1/account/change-email/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: this.token }),
      })

      if (!response.ok) {
        this.info = await extractError(response, this.$t('confirmEmail.confirmFailed'))
        return
      }

      this.success = true
    } catch {
      this.info = this.$t('common.networkError')
    } finally {
      this.loading = false
    }
  },
})
</script>

<template>
  <div class="max-w-sm mx-auto px-6">
    <div
      class="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h1 class="mb-8 text-center font-bold text-3xl">{{ $t('confirmEmail.title') }}</h1>

      <p v-if="loading" class="text-sm text-gray-500 dark:text-gray-400 text-center">
        {{ $t('confirmEmail.confirming') }}
      </p>

      <p v-else-if="success" class="text-sm text-gray-500 dark:text-gray-400 text-center">
        {{ $t('confirmEmail.success') }}
        <RouterLink :to="{ name: 'settings' }">{{ $t('confirmEmail.backToSettings') }}</RouterLink>
      </p>

      <p v-else-if="info" class="pl-3 text-sm text-left text-red-400 border-l-2 border-red-500">
        {{ info }}
      </p>
    </div>
  </div>
</template>
