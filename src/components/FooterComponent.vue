<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterComponent',
  data() {
    return {
      linkGroups: {
        'no-cost.site': {
          GitHub: 'https://github.com/nocost-site',
          Donate: this.$router.getRoutes().find((route) => route.name == 'donate')?.path,
        },
        Resources: {
          Flarum: 'https://flarum.org',
          MediaWiki: 'https://www.mediawiki.org',
          WordPress: 'https://wordpress.org',
        },
        About: {
          Contact: '/contact',
          Features: '/features',
        },
        Legal: {
          'Privacy Policy': '/privacy',
          'Terms of Service': '/terms',
        },
      },
    }
  },
  computed: {
    aktualnyRok(): number {
      return new Date().getFullYear()
    },
  },
})
</script>

<template>
  <footer
    class="relative bottom-0 w-full py-12 mt-24 text-gray-500 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 xl:pb-24"
  >
    <div class="grid max-w-screen-xl grid-cols-2 md:grid-cols-4">
      <div v-for="(link, group) in linkGroups" :key="group" class="mx-auto">
        <h1 class="text-xl font-bold text-cyan-500">{{ group }}</h1>
        <nav class="mt-4">
          <ul class="space-y-2">
            <li v-for="(href, title) in link" :key="href">
              <a :href>{{ title }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center max-w-screen-xl px-8 mx-auto mt-16 space-y-4 md:flex-row lg:mt-20"
    >
      <div class="flex flex-col space-y-4 text-sm text-center">
        <div>
          <p>
            Copyright &copy; 2025 ‐
            <span>{{ aktualnyRok }}</span> no-cost.site.
          </p>
          <p class="italic">
            no-cost.site is an independent hosting service and is not affiliated with Flarum,
            MediaWiki, or WordPress.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import 'tailwindcss';

a[href] {
  @apply text-gray-900 dark:text-gray-100;
}
</style>
