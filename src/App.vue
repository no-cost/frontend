<script lang="ts">
import { defineComponent } from 'vue'

import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
})
</script>

<template>
  <div>
    <HeaderComponent />

    <main class="mx-4">
      <RouterView />
    </main>

    <FooterComponent />
  </div>
</template>
