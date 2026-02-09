<script lang="ts">
import { defineComponent } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  name: 'HeaderComponent',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      mobileMenuOpen: false,
      links: {
        Home: ['fas', 'home'],
        Features: ['fas', 'star'],
        Contact: ['fas', 'envelope'],
        Settings: ['fas', 'user'],
      },
    }
  },
})
</script>

<template>
  <header
    class="flex flex-row flex-wrap justify-between px-6 py-5 md:items-center md:space-x-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50"
  >
    <a href="/">
      <span class="sr-only">no-cost.site</span>
      <img src="/logo.svg" width="140" height="35" class="w-auto h-8" alt="no-cost.site Logo" />
    </a>

    <button
      @click="mobileMenuOpen = !mobileMenuOpen"
      class="self-center inline-block w-8 h-8 p-1 text-gray-600 bg-gray-200 rounded focus:outline-none md:hidden dark:bg-gray-800 dark:text-gray-400 hover:text-gray-500"
      aria-label="Open Mobile Menu"
    >
      <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>

    <nav
      class="fixed left-0 z-50 flex-col w-full px-6 py-4 mt-2 font-medium rounded-lg shadow-lg md:shadow-none md:relative top-16 md:top-0 md:flex md:flex-row md:space-x-6 md:w-auto md:rounded-none md:bg-transparent"
      :class="mobileMenuOpen ? 'flex bg-white dark:bg-gray-950' : 'hidden'"
    >
      <RouterLink
        v-for="(icon, title) in links"
        :key="title"
        :to="{ name: title.toLowerCase() }"
        @click="mobileMenuOpen = false"
      >
        <a class="flex items-center space-x-2 py-2 md:py-0">
          <FontAwesomeIcon class="text-cyan-500 text-sm" :icon />
          <span>{{ title }}</span>
        </a>
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
@import 'tailwindcss';

a {
  @apply text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors;
}

.router-link-active a {
  @apply text-cyan-500 dark:text-cyan-400;
}
</style>
