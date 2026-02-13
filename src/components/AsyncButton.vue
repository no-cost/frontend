<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AsyncButton',
  props: {
    busy: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as () => 'button' | 'submit',
      default: 'button',
    },
  },
})
</script>

<template>
  <button
    :type="type"
    :disabled="busy || disabled"
    :class="{ 'opacity-60 cursor-not-allowed': busy }"
  >
    <template v-if="busy">Working...</template>
    <slot v-else />
  </button>
</template>
