<script lang="ts">
import { defineComponent } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'ContactView',
  components: {
    FontAwesomeIcon,
    CardComponent,
  },
})
</script>

<template>
  <div class="mx-[10vw]">
    <div class="mb-8">
      <div class="flex flex-col max-w-screen-sm gap-4 mx-auto text-center">
        <h1 class="text-4xl font-bold text-cyan-500">Support</h1>
        <p class="text-lg">
          Are you experiencing issues? You may contact us at the links below.
        </p>
      </div>

      <div
        class="p-6 mx-auto my-12 space-y-4 text-black bg-cyan-500 rounded-lg ring-4 ring-blue-500 ring-offset-gray-100 dark:ring-offset-gray-900 ring-offset-4"
      >
        <p>
          <b>Note:</b> no-cost.site is an independent hosting service. We can help with
          platform-related issues, but we cannot fix bugs in third-party software. In such cases, we
          can provide logs and stack traces for you to share with the software's maintainer.
        </p>
      </div>

      <div class="grid justify-center grid-cols-1 gap-6 md:grid-cols-2">
        <CardComponent :icon="['fas', 'comment']" href="https://github.com/nocost-site">
          <h1>GitHub</h1>
          <p>Report issues and contribute on GitHub</p>
        </CardComponent>

        <CardComponent :icon="['fas', 'envelope']" href="mailto:info@no-cost.site">
          <h1>E-mail</h1>
          <p>For private inquiries.</p>
        </CardComponent>
      </div>
    </div>
  </div>
</template>
