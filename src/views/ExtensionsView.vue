<script lang="ts">
import { defineComponent } from 'vue'

import useExtensionsStore from '@/stores/extensionsStore'
import CardComponent from '@/components/CardComponent.vue'
import HeadingSectionComponent from '@/components/HeadingSectionComponent.vue'
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'ExtensionsView',
  components: {
    CardComponent,
    HeadingSectionComponent,
  },
  computed: {
    extensionsCount() {
      let count = 0
      for (const key in this.extensionsStore.data) {
        // @ts-ignore
        count += this.extensionsStore.data[key].length
      }

      return count
    },
    ...mapStores(useExtensionsStore),
  },
  beforeMount() {
    if (!this.extensionsStore.isLoaded) {
      this.extensionsStore
        .getExtensions()
        .then(
          () =>
            (this.extensionsStore.infoText = `There are ${this.extensionsCount} extensions available.`),
        )
    }
  },
})
</script>

<template>
  <div>
    <HeadingSectionComponent heading="Extensions" :description="extensionsStore.infoText" />

    <div v-for="(extensions, category) in extensionsStore.data" :key="category">
      <h2 class="mt-10 mb-6">{{ category.length > 0 ? category : 'Other' }}</h2>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CardComponent
          v-for="extension in extensions"
          :icon="extension.icon_name ? extension.icon_name.split(' ') : ['fas', 'question-circle']"
          :href="extension.url"
          :key="extension.id"
        >
          <h3>{{ extension.title }}</h3>
          <p>
            {{
              extension.description.length > 80
                ? extension.description.substring(0, 80) + '...'
                : extension.description
            }}
          </p>
        </CardComponent>
      </div>
    </div>
  </div>
</template>
