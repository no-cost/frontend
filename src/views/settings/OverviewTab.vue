<script lang="ts">
import useSiteStore from '@/stores/siteStore'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OverviewTab',
  computed: {
    ...mapStores(useSiteStore),
    formattedCreatedAt(): string {
      return this.siteStore.createdAt ? new Date(this.siteStore.createdAt).toLocaleDateString() : ''
    },
  },
})
</script>

<template>
  <div
    class="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
  >
    <div class="space-y-5">
      <div
        class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800"
      >
        <span class="text-sm font-medium text-gray-500">{{ $t('settings.siteTag') }}</span>
        <span class="text-sm text-gray-800 dark:text-gray-200"
          ><code>{{ siteStore.tag }}</code></span
        >
      </div>

      <div
        class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800"
      >
        <span class="text-sm font-medium text-gray-500">{{ $t('settings.application') }}</span>
        <span class="text-sm text-gray-800 dark:text-gray-200">{{
          siteStore.siteType.charAt(0).toUpperCase() + siteStore.siteType.slice(1)
        }}</span>
      </div>

      <div
        class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800"
      >
        <span class="text-sm font-medium text-gray-500">{{ $t('settings.hostname') }}</span>
        <span class="text-sm text-gray-800 dark:text-gray-200"
          ><a :href="`https://${siteStore.hostname}`" target="_blank">{{
            siteStore.hostname
          }}</a></span
        >
      </div>

      <div
        class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800"
      >
        <span class="text-sm font-medium text-gray-500">{{ $t('settings.emailLabel') }}</span>
        <span class="text-sm text-gray-800 dark:text-gray-200">{{ siteStore.email }}</span>
      </div>

      <div
        class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800"
      >
        <span class="text-sm font-medium text-gray-500">{{ $t('settings.donated') }}</span>
        <span class="text-sm text-gray-800 dark:text-gray-200">
          {{ siteStore.donated.toFixed(2) }} &euro; &mdash;
          <RouterLink :to="{ name: 'donate' }">{{ $t('settings.donatePrompt') }}</RouterLink>
        </span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm font-medium text-gray-500">{{ $t('settings.created') }}</span>
        <span class="text-sm text-gray-800 dark:text-gray-200">{{ formattedCreatedAt }}</span>
      </div>
    </div>
  </div>
</template>
