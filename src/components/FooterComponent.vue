<script lang="ts">
import { defineComponent } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { type Locale, LOCALES, setLocale } from '@/i18n'
import { isDark, toggleTheme } from '@/utils/theme'

export default defineComponent({
  name: 'FooterComponent',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      dark: isDark(),
      locales: LOCALES,
    }
  },
  computed: {
    currentYear(): number {
      return new Date().getFullYear()
    },
    currentLocale(): Locale {
      return this.$i18n.locale as Locale
    },
    linkGroups(): Record<string, Record<string, string | undefined>> {
      return {
        [this.$t('footer.nocostSite')]: {
          [this.$t('footer.github')]: 'https://github.com/no-cost',
          [this.$t('footer.donate')]: this.$router
            .getRoutes()
            .find((route) => route.name == 'donate')?.path,
        },
        [this.$t('footer.resources')]: {
          Flarum: 'https://flarum.org',
          MediaWiki: 'https://www.mediawiki.org',
          WordPress: 'https://wordpress.org',
        },
        [this.$t('footer.about')]: {
          [this.$t('header.contact')]: '/contact',
          [this.$t('header.features')]: '/features',
        },
        [this.$t('footer.legal')]: {
          [this.$t('footer.privacyPolicy')]: '/privacy',
          [this.$t('footer.termsOfService')]: '/terms',
        },
      }
    },
  },
  methods: {
    toggleTheme() {
      toggleTheme()
      this.dark = isDark()
    },
    changeLocale(event: Event) {
      const locale = (event.target as HTMLSelectElement).value as Locale
      setLocale(locale)
    },
  },
})
</script>

<template>
  <footer
    class="relative bottom-0 w-full pt-16 pb-12 mt-24 text-gray-500 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
  >
    <div class="grid max-w-7xl mx-auto px-8 grid-cols-2 gap-8 md:grid-cols-4">
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
      class="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800"
    >
      <div class="text-sm text-center text-gray-500 dark:text-gray-400">
        <p>{{ $t('footer.copyright', { year: currentYear }) }}</p>
        <p class="mt-1 italic">{{ $t('footer.disclaimer') }}</p>

        <div class="mt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            @click="toggleTheme"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            :aria-label="dark ? $t('footer.switchToLight') : $t('footer.switchToDark')"
          >
            <FontAwesomeIcon :icon="['fas', dark ? 'sun' : 'moon']" />
            <span>{{ dark ? $t('footer.lightTheme') : $t('footer.darkTheme') }}</span>
          </button>

          <div class="inline-flex items-center gap-1.5">
            <FontAwesomeIcon
              :icon="['fas', 'globe']"
              class="text-gray-500 dark:text-gray-400 text-sm"
            />
            <select
              :value="currentLocale"
              @change="changeLocale"
              class="bg-transparent text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer focus:outline-none"
              :aria-label="$t('footer.language')"
            >
              <option v-for="l in locales" :key="l.code" :value="l.code">{{ l.label }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import 'tailwindcss';
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

a[href] {
  @apply text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm;
}

select option {
  @apply bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300;
}
</style>
