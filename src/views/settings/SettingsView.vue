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
  <div class="p-8 bg-gray-100 dark:bg-gray-900 min-h-[60vh]">
    <section class="mb-12 space-y-2 text-center">
      <h1 class="text-2xl text-cyan-500">Site Overview</h1>
      <p>Your site at a glance.</p>
    </section>

    <div class="flex flex-col items-center justify-center mt-6">
      <div class="p-8 bg-gray-200 rounded-lg dark:bg-gray-800 sm:space-y-0">
        <div class="space-y-4 sm:space-y-1">
          <h2 class="mb-4 text-xl text-cyan-500">Basic Information</h2>
          <div class="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <b>Site Tag:</b>
            <a
              class="text-cyan-500 underline duration-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-color"
              :href="'https://' + siteStore.hostname"
            >
              {{ siteStore.tag }}
            </a>
          </div>
          <div class="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <b>Application:</b>
            <span>{{ siteStore.siteType }}</span>
          </div>
          <div class="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <b>Created by (E-mail):</b>
            <span>{{ siteStore.email }}</span>
          </div>
          <div class="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <b>Donated:</b>
            <p>
              <span>{{ siteStore.donated.toFixed(2) }} € (</span>
              <RouterLink :to="{ name: 'donate' }">donate?</RouterLink>
              <span>)</span>
            </p>
          </div>
        </div>

        <div class="mt-6">
          <a href="#" class="w-full button" @click="logout()">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>
