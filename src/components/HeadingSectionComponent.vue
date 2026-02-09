<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadingSectionComponent',
  props: {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
})
</script>

<template>
  <div class="space-y-2 text-center">
    <h1 class="font-bold">{{ $props.heading }}</h1>
    <p class="text-lg" v-if="$props.description">{{ $props.description }}</p>
  </div>
</template>
