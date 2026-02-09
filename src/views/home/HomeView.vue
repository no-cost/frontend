<script lang="ts">
import { defineComponent } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  name: 'HomeView',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      features: [
        {
          icon: ['fas', 'layer-group'],
          title: 'Three Apps',
          text: 'Choose from Flarum, MediaWiki, or WordPress. Host your forum, wiki, or blog for free.',
        },
        {
          icon: ['fas', 'lock'],
          title: 'Secure',
          text: 'Solid SSL protection is standard with every site. No eavesdropping, plus search engines will like you for it.',
        },
        {
          icon: ['fas', 'gift'],
          title: 'Free (as in beer)',
          text: 'This service is funded by donations. Our mission is to support new communities.',
        },
        {
          icon: ['fas', 'code-branch'],
          title: 'Free (as in speech)',
          text: 'Your community and your data is yours and you can always export it.',
        },
        {
          icon: ['fas', 'shield-halved'],
          title: 'Safe',
          text: 'Daily backups have got you covered.',
        },
        {
          icon: ['fas', 'wand-magic-sparkles'],
          title: 'Simple',
          text: 'Getting tired of patches and upgrades? We do that for you.',
        },
      ],
    }
  },
})
</script>

<template>
  <div>
    <!-- hero -->
    <section
      class="relative py-20 md:py-32 text-center overflow-hidden -mx-4 -mt-6 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.12),_transparent_60%)]"></div>
      <div class="relative max-w-3xl mx-auto">
        <h1 class="big">Host your site for free</h1>
        <p class="my-6 text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
          Choose from Flarum, MediaWiki, or WordPress. Create your site in minutes &mdash; no
          strings attached.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <RouterLink class="button" :to="{ name: 'signup' }">Get Started</RouterLink>
          <RouterLink
            class="inline-block py-2.5 px-5 rounded-lg border border-gray-700 text-gray-300 hover:border-cyan-600 hover:text-cyan-400 transition-all font-semibold"
            :to="{ name: 'features' }"
          >
            Learn More
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- main features -->
    <section class="py-20 md:py-28 px-6">
      <div class="max-w-screen-lg mx-auto">
        <div class="mb-12 md:mb-16 text-center">
          <h1
            class="mb-3 text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
          >
            Why no-cost.site?
          </h1>
          <p class="text-lg text-gray-400">Everything you need to get your project online.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="flex gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <div class="shrink-0 mt-1">
              <div
                class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400"
              >
                <FontAwesomeIcon :icon="feature.icon" />
              </div>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ feature.title }}</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ feature.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
