<script lang="ts">
import useSiteStore from '@/stores/siteStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

import AccountTab from '@/views/settings/AccountTab.vue'
import OverviewTab from '@/views/settings/OverviewTab.vue'
import SiteSettingsTab from '@/views/settings/SiteSettingsTab.vue'

export default defineComponent({
  name: 'SettingsView',
  components: { OverviewTab, SiteSettingsTab, AccountTab, FontAwesomeIcon },
  data() {
    return {
      activeTab: 'overview' as 'overview' | 'site' | 'account',
    }
  },
  computed: {
    ...mapStores(useSiteStore),
    tabs(): { key: string; label: string }[] {
      return [
        { key: 'overview', label: 'Overview' },
        { key: 'site', label: 'Site Settings' },
        { key: 'account', label: 'Account' },
      ]
    },
  },
  methods: {
    async logout() {
      await this.siteStore.logout()
      this.$router.push({ name: 'login' })
    },
  },
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-6">
    <div class="mb-10 text-center">
      <h1 class="big text-3xl">Settings</h1>
      <p class="text-gray-400">Manage your site and account.</p>
    </div>

    <div class="flex items-center border-b border-gray-200 dark:border-gray-800 mb-8">
      <div class="flex flex-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="px-4 py-2.5 text-sm font-medium transition-colors -mb-px"
          :class="
            activeTab === tab.key
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-500 hover:text-gray-300'
          "
          @click="activeTab = tab.key as typeof activeTab"
        >
          {{ tab.label }}
        </button>
      </div>

      <button
        class="px-3 py-1.5 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center gap-1.5"
        title="Logout"
        @click="logout()"
      >
        <FontAwesomeIcon icon="right-from-bracket" />
        <span class="hidden sm:inline">Logout</span>
      </button>
    </div>

    <OverviewTab v-if="activeTab === 'overview'" />
    <SiteSettingsTab v-else-if="activeTab === 'site'" />
    <AccountTab v-else-if="activeTab === 'account'" />
  </div>
</template>
