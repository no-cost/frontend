<script lang="ts">
import { defineComponent } from 'vue'

import useSiteStore from '@/stores/siteStore'
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'SettingsView',
  computed: {
    ...mapStores(useSiteStore),
  },
  methods: {
    async logout() {
      await this.siteStore.logout()
      this.$router.push({ name: 'login' })
    },
  },
  beforeMount() {
    if (!this.siteStore.isAuthenticated) {
      this.$router.push({ name: 'login' })
    }
  },
})
</script>

<template>
  <div class="max-w-lg mx-auto px-6">
    <div class="mb-10 text-center">
      <h1 class="big text-3xl">Site Overview</h1>
      <p class="text-gray-400">Your site at a glance.</p>
    </div>

    <div
      class="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <div class="space-y-5">
        <div class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
          <span class="text-sm font-medium text-gray-500">Site Tag</span>
          <a
            class="text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
            :href="'https://' + siteStore.hostname"
          >
            {{ siteStore.tag }}
          </a>
        </div>
        <div class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
          <span class="text-sm font-medium text-gray-500">Application</span>
          <span class="text-sm text-gray-200">{{ siteStore.siteType }}</span>
        </div>
        <div class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
          <span class="text-sm font-medium text-gray-500">E-mail</span>
          <span class="text-sm text-gray-200">{{ siteStore.email }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-500">Donated</span>
          <span class="text-sm text-gray-200">
            {{ siteStore.donated.toFixed(2) }} € &mdash;
            <RouterLink :to="{ name: 'donate' }">donate?</RouterLink>
          </span>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
        <button class="button w-full text-center" @click="logout()">Logout</button>
      </div>
    </div>
  </div>
</template>
