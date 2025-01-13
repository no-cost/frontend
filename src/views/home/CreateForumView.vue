<script lang="ts">
import { defineComponent } from 'vue'

import SlideshowComponent from '@/components/SlideshowComponent.vue'

export default defineComponent({
  name: 'CreateForumView',
  components: {
    SlideshowComponent,
  },
})
</script>

<template>
  <div class="flex flex-col items-center gap-12 justify-evenly lg:flex-row">
    <SlideshowComponent
      :images="[
        { image_url: '/img/coffeetime.png', forum_url: 'https://coffeetime.flarum.cloud/' },
        { image_url: '/img/equinemarkt.png', forum_url: 'https://www.equinemarkt.nl/' },
        { image_url: '/img/olympusdao.png', forum_url: 'https://www.unitedbsd.com/' },
        { image_url: '/img/automad.png', forum_url: 'https://discuss.automad.org/' },
        { image_url: '/img/wohnwagen.png', forum_url: 'https://www.fahrradwagen.com/' },
      ]"
    />

    <div class="mb-6 text-center text-gray-700 lg:text-right dark:text-gray-300">
      <h1 class="big">Create a forum in under 5 minutes</h1>
      <div class="my-6 space-y-4">
        <p class="text-lg">Creating a Flarum forum was never easier!</p>
        <p class="text-lg">
          Start building your community today with
          <a href="https://flarum.org">Flarum</a>
          - one of the fastest and most modern open source forum frameworks available. It's free,
          fast, and you can download your data and move out at anytime.
        </p>
      </div>

      <RouterLink class="button" :to="{ name: 'signup' }"> Create a Flarum forum </RouterLink>
    </div>
  </div>
</template>
