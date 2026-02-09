<script lang="ts">
import { defineComponent } from 'vue'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    CardComponent,
  },
  data() {
    return {
      features: {
        'Three Apps':
          'Choose from Flarum, MediaWiki, or WordPress. Host your forum, wiki, or blog for free.',
        Secure:
          'Solid SSL protection is standard with every site. No eavesdropping, plus search engines will like you for it.',
        'Free (as in beer)':
          'This service is funded by donations. Our mission is to support new communities.',
        'Free (as in speech)':
          'Your community and your data is yours and you can always export it.',
        Safe: 'Daily backups have got you covered.',
        Simple: 'Getting tired of patches and upgrades? We do that for you.',
      },
    }
  },
})
</script>

<template>
  <div>
    <div class="py-12 text-center lg:py-20">
      <h1 class="big">Host your site for free</h1>
      <p class="my-6 text-lg text-gray-800 dark:text-gray-200">
        Choose from Flarum, MediaWiki, or WordPress. Create your site in minutes.
      </p>
      <RouterLink class="button" :to="{ name: 'signup' }">Get Started</RouterLink>
    </div>

    <div class="py-12 lg:py-20">
      <div class="max-w-screen-xl px-6 pb-12 mx-auto lg:px-8 xl:px-4 lg:pb-16 xl:pb-24">
        <div class="px-8 mb-6 text-center md:mb-8">
          <h1
            class="mb-2 text-3xl font-bold text-cyan-600 dark:text-cyan-400 md:text-4xl lg:text-5xl md:mb-4"
          >
            Features
          </h1>
          <p class="text-lg text-gray-800 xl:text-xl dark:text-gray-200">
            Everything you need to get your project online.
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:gap-12">
          <CardComponent v-for="(text, title) in features" :key="title">
            <h2>{{ title }}</h2>
            <p>{{ text }}</p>
          </CardComponent>
        </div>
      </div>
    </div>
  </div>
</template>
