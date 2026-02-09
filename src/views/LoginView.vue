<script lang="ts">
import { defineComponent } from 'vue'

import useSiteStore from '@/stores/siteStore'
import { mapStores } from 'pinia'
import FormFieldComponent from '@/components/FormFieldComponent.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    FormFieldComponent,
  },
  data() {
    return {
      info: null as null | string,
    }
  },
  computed: {
    ...mapStores(useSiteStore),
  },
  methods: {
    async login(form: HTMLFormElement) {
      if (!form.reportValidity()) return
      const formData = new FormData(form)

      // TODO: update when backend auth endpoint is available
      const request = await fetch(`${import.meta.env.VITE_API_URL}/v1/account/login`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      const response = await request.json()
      if (response['errors'] !== undefined) {
        this.info = response['errors'][0]
        return
      }

      this.siteStore.saveToken(response['token'], formData.get('remember') === 'on')
      await this.siteStore.getSiteData()

      this.$router.push({ name: 'settings' })
    },
  },
  beforeMount() {
    if (this.siteStore.isAuthenticated) {
      this.$router.push({ name: 'settings' })
    }
  },
})
</script>

<template>
  <form
    class="mx-auto w-80"
    method="POST"
    @submit.prevent="login($el)"
  >
    <div class="mb-4">
      <FormFieldComponent
        placeholder="Site tag"
        title="Username"
        autocomplete="username"
        required
      />
      <br />

      <FormFieldComponent
        placeholder="Your admin account password"
        type="password"
        title="Password"
        autocomplete="current-password"
        required
      />
      <br />
    </div>

    <div class="flex flex-col mb-12 justify-evenly">
      <div>
        <input type="checkbox" name="remember" class="mr-2" />
        <label for="remember">Remember Me</label>
      </div>
    </div>

    <p class="pl-2 mb-4 text-left text-gray-700 border-l-2 border-cyan-500 dark:text-gray-300">
      {{ info }}
    </p>
    <a href="#" class="button" @click="login($el)"> Login </a>
  </form>
</template>
