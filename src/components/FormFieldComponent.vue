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
  <div class="space-y-2">
    <span>{{ $props.title }}</span>
    <input
      class="form-field"
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
  @apply my-2 p-3 w-full text-black bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none;
}
</style>
