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
    class="relative bottom-0 w-full pt-16 pb-12 mt-24 text-gray-500 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
  >
    <div class="grid max-w-screen-xl mx-auto px-8 grid-cols-2 gap-8 md:grid-cols-4">
      <div v-for="(link, group) in linkGroups" :key="group">
        <h4 class="text-sm text-cyan-400 font-semibold tracking-wide">
          {{ group }}
        </h4>
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
      class="max-w-screen-xl mx-auto px-8 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800"
    >
      <div class="text-sm text-center text-gray-400">
        <p>
          Copyright &copy;
          <span>{{ aktualnyRok }}</span> no-cost.site.
        </p>
        <p class="mt-1 italic">
          no-cost.site is an independent hosting service and is not affiliated with Flarum,
          MediaWiki, or WordPress.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import 'tailwindcss';

a[href] {
  @apply text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm;
}
</style>
