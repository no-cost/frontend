<script lang="ts">
import { defineComponent } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  name: 'CardComponent',
  components: {
    FontAwesomeIcon,
  },
  props: {
    icon: {
      type: Object,
      required: false,
    },
    href: {
      type: String,
      required: false,
    },
    target: {
      type: String,
      default: '_blank',
    },
  },
})
</script>

<template>
  <a class="card" :href :target>
    <div v-if="$props.icon">
      <FontAwesomeIcon :icon="$props.icon" size="3x" />
    </div>
    <div>
      <slot></slot>
    </div>
  </a>
</template>

<style scoped>
@import 'tailwindcss';

a.card {
  @apply flex flex-row gap-4 items-center rounded-lg p-6 transition-colors
    bg-gradient-to-tl from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700
    hover:from-gray-200 hover:to-gray-400 dark:hover:from-gray-800 dark:hover:to-gray-600;
}
</style>
