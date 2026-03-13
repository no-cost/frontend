<script lang="ts">
import { defineComponent } from 'vue'

import CardComponent from '@/components/CardComponent.vue'
import HeadingSectionComponent from '@/components/HeadingSectionComponent.vue'

export default defineComponent({
  name: 'ContactView',
  components: {
    CardComponent,
    HeadingSectionComponent,
  },
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-6">
    <HeadingSectionComponent
      :heading="$t('contactPage.heading')"
      :description="$t('contactPage.description')"
    />

    <div
      class="p-5 my-10 text-sm rounded-xl border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/20 text-gray-600 dark:text-gray-300"
    >
      <i18n-t keypath="contactPage.note" tag="span">
        <template #bold>
          <b class="text-cyan-400">{{ $t('contactPage.noteBold') }}</b>
        </template>
      </i18n-t>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <CardComponent :icon="['fab', 'github']" href="https://github.com/no-cost">
        <h3 class="font-semibold">{{ $t('contactPage.githubTitle') }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ $t('contactPage.githubDescription') }}
        </p>
      </CardComponent>

      <CardComponent :icon="['fas', 'envelope']" href="mailto:info@no-cost.site">
        <h3 class="font-semibold">{{ $t('contactPage.emailTitle') }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ $t('contactPage.emailDescription') }}
        </p>
      </CardComponent>
    </div>
  </div>
</template>
