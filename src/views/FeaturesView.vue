<script lang="ts">
import { defineComponent } from 'vue'

import CardComponent from '@/components/CardComponent.vue'
import HeadingSectionComponent from '@/components/HeadingSectionComponent.vue'

export default defineComponent({
  name: 'FeaturesView',
  components: {
    CardComponent,
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
            'Real-time discussions',
            'Extensions ecosystem',
            'Mobile-friendly',
            'SEO optimized',
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
  <div>
    <HeadingSectionComponent
      heading="Features"
      description="Choose the right application for your project."
    />

    <div class="grid grid-cols-1 gap-8 mt-10 md:grid-cols-3">
      <CardComponent v-for="app in apps" :key="app.name" :icon="app.icon" :href="app.url">
        <h2>{{ app.name }}</h2>
        <p>{{ app.description }}</p>
        <ul class="mt-2 ml-4 space-y-1 text-sm list-disc">
          <li v-for="feature in app.features" :key="feature">{{ feature }}</li>
        </ul>
      </CardComponent>
    </div>
  </div>
</template>
