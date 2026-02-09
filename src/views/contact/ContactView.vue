<script lang="ts">
import { defineComponent } from 'vue'

import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'ContactView',
  components: {
    CardComponent,
  },
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-6">
    <div class="mb-10 text-center">
      <h1 class="big text-3xl">Support</h1>
      <p class="text-lg text-gray-400">
        Experiencing issues? Reach out through one of the channels below.
      </p>
    </div>

    <div
      class="p-5 mb-10 text-sm rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-gray-300"
    >
      <b class="text-cyan-400">Note:</b> no-cost.site is an independent hosting service. We can
      help with platform-related issues, but we cannot fix bugs in third-party software. In such
      cases, we can provide logs and stack traces for you to share with the software's maintainer.
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <CardComponent :icon="['fab', 'github']" href="https://github.com/nocost-site">
        <h3 class="font-semibold">GitHub</h3>
        <p class="text-sm text-gray-400">Report issues and contribute</p>
      </CardComponent>

      <CardComponent :icon="['fas', 'envelope']" href="mailto:info@no-cost.site">
        <h3 class="font-semibold">E-mail</h3>
        <p class="text-sm text-gray-400">For private inquiries</p>
      </CardComponent>
    </div>
  </div>
</template>
