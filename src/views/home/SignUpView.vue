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
  <form method="POST" @submit.prevent="createSite($el)" class="max-w-screen-sm mx-auto px-6">
    <h1 class="mb-6 text-center big">Create your site</h1>

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
        class="w-full p-3 my-2 text-black bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none"
        required
      >
        <option value="flarum">Flarum (Forum)</option>
        <option value="mediawiki">MediaWiki (Wiki)</option>
        <option value="wordpress">WordPress (Blog/CMS)</option>
      </select>
    </div>

    <input type="hidden" name="parent_domain" value="no-cost.site" />

    <div class="mt-6">
      <button type="submit" class="button">Create site</button>
    </div>
  </form>
</template>
