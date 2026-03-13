<script lang="ts">
import { defineComponent } from 'vue'

import useSiteStore from '@/stores/siteStore'
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'DonateView',
  computed: {
    ...mapStores(useSiteStore),
  },
})
</script>

<template>
  <div>
    <!-- header -->
    <div class="mb-16 text-center">
      <h1 class="big">{{ $t('donatePage.title') }}</h1>
      <p class="text-lg text-gray-500 dark:text-gray-400">
        {{ $t('donatePage.subtitle') }}
      </p>
    </div>

    <!-- perks -->
    <section class="max-w-md mx-auto px-6 mb-20">
      <div
        class="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center"
      >
        <div class="mb-6">
          <span
            class="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400"
          >
            {{ $t('donatePage.amount') }}
          </span>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {{ $t('donatePage.oneTimeDonation') }}
          </p>
        </div>

        <ul class="space-y-3 text-left text-sm">
          <li class="flex gap-3 items-start">
            <span class="text-cyan-400 mt-0.5">&#10003;</span>
            <span>{{ $t('donatePage.perkFooter') }}</span>
          </li>
          <li class="flex gap-3 items-start">
            <span class="text-cyan-400 mt-0.5">&#10003;</span>
            <span>{{ $t('donatePage.perkArchive') }}</span>
          </li>
          <li class="flex gap-3 items-start">
            <span class="text-cyan-400 mt-0.5">&#10003;</span>
            <span>{{ $t('donatePage.perkDomain') }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- donate -->
    <section
      class="py-16 px-6 -mx-4 border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
    >
      <div class="max-w-5xl mx-auto">
        <div class="mb-10 text-center">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {{ $t('donatePage.readyTitle') }}
          </h2>
          <p class="mt-2 text-sm text-gray-500">{{ $t('donatePage.readySubtitle') }}</p>
        </div>

        <div class="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
          <div
            class="p-6 space-y-4 text-sm rounded-xl border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/20"
          >
            <p class="font-semibold text-cyan-400">{{ $t('donatePage.importantTitle') }}</p>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t('donatePage.importantText') }}
            </p>

            <div
              class="p-4 rounded-lg bg-gray-100 dark:bg-gray-800/50"
              v-if="siteStore.isAuthenticated"
            >
              <p class="text-gray-500 dark:text-gray-400">{{ $t('donatePage.yourTagIs') }}</p>
              <pre class="mt-1 text-cyan-400 font-mono">{{ siteStore.tag }}</pre>
              <p class="mt-2 text-xs text-gray-500">
                {{ $t('donatePage.includeTag') }}
              </p>
            </div>
            <p v-else class="text-gray-500 dark:text-gray-400">
              <RouterLink :to="{ name: 'login' }">{{ $t('donatePage.loginPrompt') }}</RouterLink>
              {{ $t('donatePage.loginPromptSuffix') }}
            </p>

            <ul class="space-y-1 text-gray-500 dark:text-gray-400">
              <li>
                <i18n-t keypath="donatePage.nicknameNote" tag="span">
                  <template #bold>
                    <b class="text-gray-700 dark:text-gray-300">{{
                      $t('donatePage.nicknameBold')
                    }}</b>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="donatePage.privateMessageNote" tag="span">
                  <template #bold>
                    <b class="text-gray-700 dark:text-gray-300">{{
                      $t('donatePage.privateMessageBold')
                    }}</b>
                  </template>
                </i18n-t>
              </li>
            </ul>

            <p class="text-gray-500 dark:text-gray-400">
              {{ $t('donatePage.notFoundNote') }}
              <RouterLink :to="{ name: 'contact' }">{{ $t('donatePage.contactUs') }}</RouterLink>
              {{ $t('donatePage.notFoundSuffix') }}
            </p>
          </div>

          <iframe
            id="kofiframe"
            src="https://ko-fi.com/nocost/?hidefeed=true&widget=true&embed=true&preview=true"
            style="border: none; width: 100%; padding: 4px; background: #f9f9f9"
            height="712"
            title="nocost"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>
