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
      <h1 class="big">Support no-cost.site</h1>
      <p class="text-lg text-gray-400">Help us keep free hosting alive. Every donation matters.</p>
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
            7 €
          </span>
          <p class="mt-2 text-sm text-gray-400">One-time donation, and you get:</p>
        </div>

        <ul class="space-y-3 text-left text-sm">
          <li class="flex gap-3 items-start">
            <span class="text-cyan-400 mt-0.5">&#10003;</span>
            <span>The "Powered by no-cost.site" footer at your site will be removed</span>
          </li>
          <li class="flex gap-3 items-start">
            <span class="text-cyan-400 mt-0.5">&#10003;</span>
            <span>Your site will not be automatically archived due to inactivity</span>
          </li>
          <li class="flex gap-3 items-start">
            <span class="text-cyan-400 mt-0.5">&#10003;</span>
            <span>Ability to link your own domain to your site</span>
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
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Ready to donate?</h2>
          <p class="mt-2 text-sm text-gray-500">All money goes towards supporting no-cost.site</p>
        </div>

        <div class="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
          <div class="p-6 space-y-4 text-sm rounded-xl border border-cyan-500/30 bg-cyan-950/20">
            <p class="font-semibold text-cyan-400">Important</p>
            <p class="text-gray-300">
              When donating, please input nothing else except your site tag in the donation message.
              Our system will automatically mark you as donor by scanning the donation message.
            </p>

            <div class="p-4 rounded-lg bg-gray-800/50" v-if="siteStore.isAuthenticated">
              <p class="text-gray-400">Your site tag is:</p>
              <pre class="mt-1 text-cyan-400 font-mono">{{ siteStore.tag }}</pre>
              <p class="mt-2 text-xs text-gray-500">
                Include that and nothing else in the donation message.
              </p>
            </div>
            <p v-else class="text-gray-400">
              <RouterLink :to="{ name: 'login' }">Log in to your settings</RouterLink>
              and your site tag will appear here.
            </p>

            <ul class="space-y-1 text-gray-400">
              <li><b class="text-gray-300">Nickname</b> can be anything that you want.</li>
              <li>
                You can check <b class="text-gray-300">Private message</b> so only we can see your
                donation message.
              </li>
            </ul>

            <p class="text-gray-400">
              If we can't find your site tag in the donation message, your site will not be
              automatically marked as donor. If you have donated and haven't received a thank-you
              E-mail within a day, please
              <RouterLink :to="{ name: 'contact' }">contact us</RouterLink>
              so that we can sort it out.
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
