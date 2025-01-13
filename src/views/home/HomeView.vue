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
        Fast: "You won't find better performance. Flarum is lightweight with blazing-fast response times.",
        Secure:
          'Solid SSL protection is standard with every forum. No eavesdropping, plus Google will like you for it.',
        'Free (as in beer)':
          'This service is paid for by donations. Our mission is to support new communities.',
        'Free (as in speech)':
          'Your community and your data is yours and you can always export it.',
        Safe: 'Daily backups have got you covered',
        Simple:
          'Getting tired of patches and upgrades? We do that for you. Plus: lots of extensions are included out of the box.',
      },
    }
  },
})
</script>

<template>
  <div>
    <RouterView />

    <div class="py-12 lg:py-20">
      <div class="max-w-screen-xl px-6 pb-12 mx-auto lg:px-8 xl:px-4 lg:pb-16 xl:pb-24">
        <div class="px-8 mb-6 text-center md:mb-8">
          <h1
            class="mb-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400 md:text-4xl lg:text-5xl md:mb-4"
          >
            Features
          </h1>
          <p class="text-lg text-gray-800 xl:text-xl dark:text-gray-200">
            Get to know Flarum better, the next-generation forum software that makes online
            discussion fun.
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
