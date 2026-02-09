<script lang="ts">
import { defineComponent } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import HeadingSectionComponent from '@/components/HeadingSectionComponent.vue'

export default defineComponent({
  name: 'FeaturesView',
  components: {
    FontAwesomeIcon,
    HeadingSectionComponent,
  },
  data() {
    return {
      apps: [
        {
          name: 'Flarum',
          icon: ['fas', 'comments'],
          description: 'A modern, fast forum platform. Perfect for building online communities.',
          features: [
            'Vast extension ecosystem',
            'Mobile-friendly',
            'SEO optimized',
            'Permissions & groups system',
          ],
          url: 'https://flarum.org',
        },
        {
          name: 'MediaWiki',
          icon: ['fas', 'book'],
          description: 'The wiki software that powers Wikipedia. Ideal for knowledge bases.',
          features: [
            'Rich text editing',
            'Version history',
            'Templates',
            'Multi-language support',
          ],
          url: 'https://www.mediawiki.org',
        },
        {
          name: 'WordPress',
          icon: ['fab', 'wordpress'],
          description: "The world's most popular CMS. Great for blogs and websites.",
          features: ['Themes and plugins', 'Block editor', 'Media management', 'User roles'],
          url: 'https://wordpress.org',
        },
      ],
    }
  },
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-6">
    <HeadingSectionComponent
      heading="Features"
      description="Choose the right application for your project."
    />

    <div class="flex flex-col gap-6 mt-12">
      <a
        v-for="app in apps"
        :key="app.name"
        :href="app.url"
        target="_blank"
        class="card flex gap-6 items-start p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/10 hover:-translate-y-0.5 transition-all duration-200"
      >
        <div
          class="shrink-0 w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500"
        >
          <FontAwesomeIcon :icon="app.icon" size="xl" />
        </div>
        <div>
          <h2 class="font-semibold">{{ app.name }}</h2>
          <p class="mt-1 text-gray-500 dark:text-gray-400">{{ app.description }}</p>

          <h6 class="mt-3 font-semibold text-gray-600 dark:text-gray-300">Features:</h6>
          <ul class="mt-3 text-gray-500 dark:text-gray-400">
            <li
              v-for="feature in app.features"
              :key="feature"
              class="text-sm px-2.5 py-1 list-disc list-inside"
            >
              {{ feature }}
            </li>
          </ul>
        </div>
      </a>
    </div>
  </div>
</template>
