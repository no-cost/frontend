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
    <div class="mb-6 space-y-2">
      <h1 class="text-5xl font-bold text-center text-cyan-500">Donate</h1>
      <p class="text-lg text-center">...and support no-cost.site!</p>
    </div>

    <div class="my-24 space-y-6">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-center text-cyan-500">Donation Perks</h1>
        <p class="text-center">What do you get for making a one-time donation?</p>
      </div>

      <div class="grid max-w-screen-lg grid-cols-1 gap-8 px-8 mx-auto justify-items-center">
        <div
          class="p-4 rounded-lg bg-gradient-to-tr dark:from-gray-700 dark:to-gray-800 from-gray-300 to-gray-400 w-80"
        >
          <div class="mb-6 space-y-2 text-center">
            <h3 class="text-2xl font-bold text-cyan-500">7 €</h3>
            <p>Donate 7 € or more, and:</p>
          </div>

          <ul class="ml-6 space-y-4 list-['\2012\A0\A0'] text-sm">
            <li>The "Powered by no-cost.site" footer at your site will be removed</li>
            <li>Your site will not be automatically archived due to inactivity.</li>
            <li>Priority support for your site.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="px-10 my-16 bg-gray-100 py-14">
      <div class="mx-[5vw]">
        <div class="mb-6 space-y-2 text-center">
          <h1 class="text-3xl font-extrabold text-cyan-600">Are you ready to donate?</h1>
          <p class="italic text-gray-900">All money goes towards supporting no-cost.site</p>
        </div>

        <div class="grid items-center justify-between grid-cols-1 gap-6 lg:grid-cols-2">
          <div
            class="p-4 my-6 mb-6 space-y-2 text-black bg-cyan-100 rounded-lg ring-offset-2 ring-cyan-400 ring-4"
          >
            <b class="text-lg">Important:</b>
            <p>
              When donating, please input nothing else except your site tag in the donation message!
              Our system will automatically mark you as donor by scanning the donation message.
            </p>

            <div class="py-6" v-if="siteStore.isAuthenticated">
              <div class="flex flex-row gap-2">
                <b>Your site tag is:</b>
                <pre>{{ siteStore.tag }}</pre>
              </div>
              <p>(please, include that and nothing else in the donation message)</p>
            </div>
            <p v-else>
              <RouterLink
                class="text-cyan-600 hover:text-cyan-700 transition-color duration-500 underline"
                :to="{ name: 'login' }"
              >
                Log in to your settings
              </RouterLink>
              and your site tag will appear here.
            </p>

            <ul class="my-4 ml-6 space-y-1 list-disc">
              <li><b>Nickname</b> can be anything that you want.</li>
              <li>
                You can check <b>Private message</b> so only we can see your donation message/site
                name.
              </li>
            </ul>

            <p>
              If we can't find your site tag in the donation message, your site will not be
              automatically marked as donor. If you have donated and haven't received a thank-you
              E-mail within a day, please
              <RouterLink
                class="text-cyan-600 hover:text-cyan-700 transition-color duration-500 underline"
                :to="{ name: 'contact' }"
              >
                contact us
              </RouterLink>
              so that we can sort it out.
            </p>
          </div>

          <!-- TODO: update Ko-fi URL to no-cost.site's Ko-fi page -->
          <iframe
            id="kofiframe"
            src="https://ko-fi.com/freeflarum/?hidefeed=true&widget=true&embed=true&preview=true"
            class="w-full p-1 bg-gray-100 border-none"
            height="650"
            title="no-cost.site"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
