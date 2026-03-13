<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    FontAwesomeIcon,
  },
  computed: {
    features(): { icon: string[]; titleKey: string; textKey: string }[] {
      return [
        {
          icon: ['fas', 'layer-group'],
          titleKey: 'home.features.threeApps.title',
          textKey: 'home.features.threeApps.text',
        },
        {
          icon: ['fas', 'lock'],
          titleKey: 'home.features.secure.title',
          textKey: 'home.features.secure.text',
        },
        {
          icon: ['fas', 'gift'],
          titleKey: 'home.features.freeBeer.title',
          textKey: 'home.features.freeBeer.text',
        },
        {
          icon: ['fas', 'code-branch'],
          titleKey: 'home.features.freeSpeech.title',
          textKey: 'home.features.freeSpeech.text',
        },
        {
          icon: ['fas', 'shield-halved'],
          titleKey: 'home.features.safe.title',
          textKey: 'home.features.safe.text',
        },
        {
          icon: ['fas', 'wand-magic-sparkles'],
          titleKey: 'home.features.simple.title',
          textKey: 'home.features.simple.text',
        },
      ]
    },
  },
})
</script>

<template>
  <div>
    <!-- hero -->
    <section
      class="relative py-20 md:py-32 text-center overflow-hidden -mx-4 -mt-6 px-6 bg-linear-to-b from-gray-100 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_60%)]"
      ></div>
      <div class="relative max-w-3xl mx-auto">
        <h1 class="big">{{ $t('home.heroTitle') }}</h1>
        <p class="my-6 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          {{ $t('home.heroDescription') }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <RouterLink class="button" :to="{ name: 'signup' }">{{
            $t('home.getStarted')
          }}</RouterLink>
          <RouterLink
            class="inline-block py-2.5 px-5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-600 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all font-semibold"
            :to="{ name: 'features' }"
          >
            {{ $t('home.learnMore') }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- main features -->
    <section class="py-20 md:py-28 px-6">
      <div class="max-w-screen-lg mx-auto">
        <div class="mb-12 md:mb-16 text-center">
          <h1
            class="mb-3 text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-500 dark:from-cyan-400 to-blue-500 dark:to-blue-400"
          >
            {{ $t('home.whyTitle') }}
          </h1>
          <p class="text-lg text-gray-500 dark:text-gray-400">
            {{ $t('home.whySubtitle') }}
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:gap-8">
          <div
            v-for="feature in features"
            :key="feature.titleKey"
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
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                {{ $t(feature.titleKey) }}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ $t(feature.textKey) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
