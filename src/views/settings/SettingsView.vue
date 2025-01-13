<script lang="ts">
import { defineComponent } from 'vue'

import useForumStore from '@/stores/forumStore'
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'SettingsView',
  computed: {
    ...mapStores(useForumStore),
  },
  methods: {
    async logout() {
      await this.forumStore.logout()
      this.$router.push({ name: 'login' })
    },
  },
  beforeMount() {
    if (!this.forumStore.isAuthenticated) {
      this.$router.push({ name: 'login' })
    }
  },
})
</script>

<template>
  <div class="p-8 bg-gray-100 dark:bg-gray-900 min-h-[60vh]">
    <section class="mb-12 space-y-2 text-center">
      <h1 class="text-2xl text-yellow-500">Forum Overview</h1>
      <p>Your forum at a glance.</p>
    </section>

    <div class="flex flex-col items-center justify-center mt-6">
      <div class="p-8 bg-gray-200 rounded-lg dark:bg-gray-800 sm:space-y-0">
        <div class="space-y-4 sm:space-y-1">
          <h2 class="mb-4 text-xl text-yellow-500">Basic Information</h2>
          <div class="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <b>Forum Tag:</b>
            <a
              class="text-yellow-500 underline duration-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-color"
              :href="forumStore.url"
            >
              {{ forumStore.tag }}
            </a>
          </div>
          <div class="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <b>Created by (E-mail):</b>
            <span>{{ forumStore.email }}</span>
          </div>
          <div class="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <b>Donated:</b>
            <p>
              <span>{{ forumStore.donated.toFixed(2) }} € (</span>
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
