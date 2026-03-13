<script lang="ts">
import { defineComponent } from 'vue'

import HeadingSectionComponent from '@/components/HeadingSectionComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  name: 'FeaturesView',
  components: {
    FontAwesomeIcon,
    HeadingSectionComponent,
  },
  computed: {
    apps(): {
      name: string
      icon: string[]
      descriptionKey: string
      featuresKeys: string[]
      url: string
    }[] {
      return [
        {
          name: 'Flarum',
          icon: ['fas', 'comments'],
          descriptionKey: 'featuresPage.apps.flarum.description',
          featuresKeys: [
            'featuresPage.apps.flarum.features.extensions',
            'featuresPage.apps.flarum.features.mobile',
            'featuresPage.apps.flarum.features.seo',
            'featuresPage.apps.flarum.features.permissions',
          ],
          url: 'https://flarum.org',
        },
        {
          name: 'MediaWiki',
          icon: ['fas', 'book'],
          descriptionKey: 'featuresPage.apps.mediawiki.description',
          featuresKeys: [
            'featuresPage.apps.mediawiki.features.richText',
            'featuresPage.apps.mediawiki.features.versionHistory',
            'featuresPage.apps.mediawiki.features.templates',
            'featuresPage.apps.mediawiki.features.multiLanguage',
          ],
          url: 'https://www.mediawiki.org',
        },
        {
          name: 'WordPress',
          icon: ['fab', 'wordpress'],
          descriptionKey: 'featuresPage.apps.wordpress.description',
          featuresKeys: [
            'featuresPage.apps.wordpress.features.themes',
            'featuresPage.apps.wordpress.features.blockEditor',
            'featuresPage.apps.wordpress.features.media',
            'featuresPage.apps.wordpress.features.userRoles',
          ],
          url: 'https://wordpress.org',
        },
      ]
    },
  },
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-6">
    <HeadingSectionComponent
      :heading="$t('featuresPage.heading')"
      :description="$t('featuresPage.description')"
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
          <p class="mt-1 text-gray-500 dark:text-gray-400">{{ $t(app.descriptionKey) }}</p>

          <h6 class="mt-3 font-semibold text-gray-700 dark:text-gray-300">
            {{ $t('featuresPage.featuresLabel') }}
          </h6>
          <ul class="mt-3 text-gray-500 dark:text-gray-400">
            <li
              v-for="featureKey in app.featuresKeys"
              :key="featureKey"
              class="text-sm px-2.5 py-1 list-disc list-inside"
            >
              {{ $t(featureKey) }}
            </li>
          </ul>
        </div>
      </a>
    </div>
  </div>
</template>
