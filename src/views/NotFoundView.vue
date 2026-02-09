<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundView',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
    <h1
      class="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
    >
      404
    </h1>
    <p class="mt-4 text-lg text-gray-400">
      Page not found.
      <RouterLink :to="{ name: 'home' }">Return to home</RouterLink>.
    </p>
  </div>
</template>
