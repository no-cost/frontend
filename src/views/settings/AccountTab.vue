<script lang="ts">
import AsyncButton from '@/components/AsyncButton.vue'
import FormFieldComponent from '@/components/FormFieldComponent.vue'
import useSiteStore from '@/stores/siteStore'
import { extractError } from '@/utils/api'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

type Feedback = { type: 'error' | 'success'; text: string } | null

export default defineComponent({
  name: 'AccountTab',
  components: { FormFieldComponent, AsyncButton },
  data() {
    return {
      passwordFeedback: null as Feedback,
      emailFeedback: null as Feedback,
      exportFeedback: null as Feedback,
      deleteFeedback: null as Feedback,
      passwordBusy: false,
      emailBusy: false,
      exportBusy: false,
      deleteBusy: false,
    }
  },
  computed: {
    ...mapStores(useSiteStore),
  },
  methods: {
    authHeaders(): Record<string, string> {
      return { Authorization: `Bearer ${this.siteStore.token}` }
    },

    async changePassword(form: HTMLFormElement) {
      if (!form.reportValidity()) return

      const formData = new FormData(form)
      const newPassword = formData.get('new password') as string
      const confirmPassword = formData.get('confirm password') as string

      if (newPassword !== confirmPassword) {
        this.passwordFeedback = { type: 'error', text: 'Passwords do not match.' }
        return
      }

      this.passwordFeedback = null
      this.passwordBusy = true

      try {
        const response = await fetch(`${API_URL}/v1/account/change-password`, {
          method: 'POST',
          headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({
            old_password: formData.get('current password'),
            new_password: newPassword,
          }),
        })

        if (!response.ok) {
          this.passwordFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        const data = await response.json()
        this.passwordFeedback = { type: 'success', text: data.message }
        form.reset()
      } catch {
        this.passwordFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.passwordBusy = false
      }
    },

    async changeEmail(form: HTMLFormElement) {
      if (!form.reportValidity()) return
      this.emailFeedback = null
      this.emailBusy = true

      const formData = new FormData(form)
      try {
        const response = await fetch(`${API_URL}/v1/account/change-email`, {
          method: 'POST',
          headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.get('new e-mail'),
            password: formData.get('password'),
          }),
        })

        if (!response.ok) {
          this.emailFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        const data = await response.json()
        this.emailFeedback = { type: 'success', text: data.message }
        form.reset()
      } catch {
        this.emailFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.emailBusy = false
      }
    },

    async exportData() {
      this.exportFeedback = null
      this.exportBusy = true

      try {
        const response = await fetch(`${API_URL}/v1/account/export/token`, {
          method: 'POST',
          headers: this.authHeaders(),
        })

        if (!response.ok) {
          this.exportFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        const { token } = await response.json()
        window.open(`${API_URL}/v1/account/export?token=${encodeURIComponent(token)}`, '_self')
        this.exportFeedback = { type: 'success', text: 'Download started.' }
      } catch {
        this.exportFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.exportBusy = false
      }
    },

    async deleteAccount() {
      if (
        !confirm(
          'Are you sure? This action cannot be undone. Your site and all its data will be permanently deleted.',
        )
      )
        return

      this.deleteFeedback = null
      this.deleteBusy = true

      try {
        const response = await fetch(`${API_URL}/v1/account/`, {
          method: 'DELETE',
          headers: this.authHeaders(),
        })

        if (!response.ok) {
          this.deleteFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        await this.siteStore.logout()
        this.$router.push({ name: 'home' })
      } catch {
        this.deleteFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.deleteBusy = false
      }
    },
  },
})
</script>

<template>
  <div class="space-y-6">
    <!-- change password -->
    <section
      class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h2 class="mb-4">Change Password</h2>
      <form @submit.prevent="changePassword($event.target as HTMLFormElement)">
        <FormFieldComponent
          type="password"
          title="Current Password"
          placeholder="Your current password"
          autocomplete="current-password"
          required
        />
        <FormFieldComponent
          type="password"
          title="New Password"
          placeholder="Choose a new password"
          autocomplete="new-password"
          required
        />
        <FormFieldComponent
          type="password"
          title="Confirm Password"
          placeholder="Confirm new password"
          autocomplete="new-password"
          required
        />
        <AsyncButton type="submit" class="button mt-4" :busy="passwordBusy"
          >Change Password</AsyncButton
        >
        <p
          v-if="passwordFeedback"
          class="pl-3 mt-4 text-sm text-left border-l-2"
          :class="
            passwordFeedback.type === 'error'
              ? 'text-red-400 border-red-500'
              : 'text-green-400 border-green-500'
          "
        >
          {{ passwordFeedback.text }}
        </p>
      </form>
    </section>

    <!-- change email -->
    <section
      class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h2 class="mb-2">Change E-mail</h2>
      <p class="text-sm text-gray-400 mb-4">A confirmation link will be sent to the new address.</p>
      <form @submit.prevent="changeEmail($event.target as HTMLFormElement)">
        <FormFieldComponent
          type="email"
          title="New E-mail"
          placeholder="new@example.com"
          required
        />
        <FormFieldComponent
          type="password"
          title="Password"
          placeholder="Current password"
          autocomplete="current-password"
          required
        />
        <AsyncButton type="submit" class="button mt-4" :busy="emailBusy">Change E-mail</AsyncButton>
        <p
          v-if="emailFeedback"
          class="pl-3 mt-4 text-sm text-left border-l-2"
          :class="
            emailFeedback.type === 'error'
              ? 'text-red-400 border-red-500'
              : 'text-green-400 border-green-500'
          "
        >
          {{ emailFeedback.text }}
        </p>
      </form>
    </section>

    <!-- export data -->
    <section
      class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h2 class="mb-2">Export Data</h2>
      <p class="text-sm text-gray-400 mb-4">Download your site data as a .tar.gz archive.</p>
      <AsyncButton class="button" :busy="exportBusy" @click="exportData()"
        >Download Export</AsyncButton
      >
      <p
        v-if="exportFeedback"
        class="pl-3 mt-4 text-sm text-left border-l-2"
        :class="
          exportFeedback.type === 'error'
            ? 'text-red-400 border-red-500'
            : 'text-green-400 border-green-500'
        "
      >
        {{ exportFeedback.text }}
      </p>
    </section>

    <!-- delete account -->
    <section class="p-6 rounded-2xl border border-red-500/30 bg-white dark:bg-gray-900">
      <h2 class="mb-2 text-red-400">Delete Account</h2>
      <p class="text-sm text-gray-400 mb-4">
        Permanently delete your site and all associated data. This cannot be undone.
      </p>
      <AsyncButton
        class="inline-block py-2.5 px-5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-all cursor-pointer border-none"
        :busy="deleteBusy"
        @click="deleteAccount()"
      >
        Delete My Site
      </AsyncButton>
      <p
        v-if="deleteFeedback"
        class="pl-3 mt-4 text-sm text-left text-red-400 border-l-2 border-red-500"
      >
        {{ deleteFeedback.text }}
      </p>
    </section>
  </div>
</template>
