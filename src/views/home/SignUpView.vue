<script lang="ts">
import { defineComponent } from 'vue'

import FormFieldComponent from '@/components/FormFieldComponent.vue'

export default defineComponent({
  name: 'SignUpView',
  components: {
    FormFieldComponent,
  },
  methods: {
    async createSite(form: HTMLFormElement) {
      if (!form.reportValidity()) return

      let formData = new FormData(form)
      let data = await fetch(`${import.meta.env.VITE_API_URL}/v1/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag: formData.get('tag'),
          email: formData.get('email'),
          password: formData.get('password'),
          site_type: formData.get('site_type'),
          parent_domain: formData.get('parent_domain'),
        }),
      })

      let json = await data.json()
      if (data.ok) {
        alert(`Site created! It will be available at ${json['hostname']} shortly.`)
      } else {
        alert(`Error: ${json['detail']}`)
      }
    },
  },
})
</script>

<template>
  <div class="max-w-md mx-auto px-6">
    <div
      class="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h1 class="mb-8 text-center big text-3xl">Create your site</h1>

      <form method="POST" @submit.prevent="createSite($el)">
        <FormFieldComponent title="Tag" placeholder="Your site name" required />
        <FormFieldComponent type="email" title="Email" placeholder="Your admin email" required />
        <FormFieldComponent
          type="password"
          title="Password"
          placeholder="Choose a password"
          required
        />

        <div class="mt-4 space-y-2">
          <span class="text-sm font-medium">Application</span>
          <select
            name="site_type"
            class="w-full p-3 my-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-200 dark:border-gray-700"
            required
          >
            <option value="flarum">Flarum (Forum)</option>
            <option value="mediawiki">MediaWiki (Wiki)</option>
            <option value="wordpress">WordPress (Blog/CMS)</option>
          </select>
        </div>

        <input type="hidden" name="parent_domain" value="no-cost.site" />

        <div class="mt-8">
          <button type="submit" class="button w-full text-center">Create site</button>
        </div>
      </form>
    </div>
  </div>
</template>
