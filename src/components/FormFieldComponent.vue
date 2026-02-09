<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormFieldComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    autocomplete: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
    },
  },
})
</script>

<template>
  <div class="space-y-1.5 mt-4">
    <label class="text-sm font-medium text-gray-300" :for="$props.title.toLowerCase()">
      {{ $props.title }}
    </label>
    <input
      class="form-field"
      :id="$props.title.toLowerCase()"
      :name="$props.title.toLowerCase()"
      :value
      :placeholder
      :type
      :autocomplete
      :required
    />
  </div>
</template>

<style scoped>
@import 'tailwindcss';

.form-field {
  @apply w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white
    border border-gray-200 dark:border-gray-700
    focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
    placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors;
}
</style>
