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
    <div v-if="$props.icon" class="icon-wrap">
      <FontAwesomeIcon :icon="$props.icon" size="2x" />
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </a>
</template>

<style scoped>
@import 'tailwindcss';

a.card {
  @apply flex flex-row gap-5 items-start rounded-xl p-6 transition-all duration-200
    border border-gray-200 dark:border-gray-800
    bg-white dark:bg-gray-900
    hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/10 hover:-translate-y-0.5;
}

.icon-wrap {
  @apply text-cyan-500 shrink-0 mt-1;
}

.card-body {
  @apply min-w-0;
}
</style>
