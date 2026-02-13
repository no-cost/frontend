<script lang="ts">
import AsyncButton from '@/components/AsyncButton.vue'
import useSiteStore from '@/stores/siteStore'
import { extractError } from '@/utils/api'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

type Feedback = { type: 'error' | 'success'; text: string } | null

export default defineComponent({
  name: 'SiteSettingsTab',
  components: { AsyncButton },
  data() {
    return {
      // per-section feedback
      domainFeedback: null as Feedback,
      skinFeedback: null as Feedback,
      brandingFeedback: null as Feedback,
      fixupFeedback: null as Feedback,

      // per-action busy states
      domainBusy: false,
      skinBusy: false,
      fixupBusy: false,

      // domain
      allowedDomains: [] as string[],
      customDomain: '',
      unlinkParentDomain: '',

      // mediawiki
      allowedSkins: [] as string[],
      currentSkin: '',
      currentLogo: null as string | null,
      currentFavicon: null as string | null,
      uploading: null as 'logo' | 'favicon' | null,
    }
  },
  computed: {
    ...mapStores(useSiteStore),
    isCustomDomainLinked(): boolean {
      return !this.allowedDomains.some(
        (d) => this.siteStore.hostname === `${this.siteStore.tag}.${d}`,
      )
    },
  },
  async mounted() {
    await this.loadAllowedDomains()
    if (this.siteStore.siteType === 'mediawiki') {
      await this.loadMediaWikiSettings()
    }
  },
  methods: {
    authHeaders(): Record<string, string> {
      return { Authorization: `Bearer ${this.siteStore.token}` }
    },

    async loadAllowedDomains() {
      try {
        const response = await fetch(`${API_URL}/v1/settings/allowed-domains`, {
          headers: this.authHeaders(),
        })
        if (!response.ok) return
        this.allowedDomains = await response.json()
        if (this.allowedDomains.length > 0) {
          this.unlinkParentDomain = this.allowedDomains[0]!
        }
      } catch {}
    },

    async linkDomain() {
      if (!this.customDomain.trim()) return
      this.domainFeedback = null
      this.domainBusy = true

      try {
        const response = await fetch(`${API_URL}/v1/settings/link-domain`, {
          method: 'POST',
          headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: this.customDomain.trim() }),
        })

        if (!response.ok) {
          this.domainFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        const data = await response.json()
        this.domainFeedback = { type: 'success', text: data.message }
        this.customDomain = ''
        await this.siteStore.getSiteData()
      } catch {
        this.domainFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.domainBusy = false
      }
    },

    async unlinkDomain() {
      this.domainFeedback = null
      this.domainBusy = true

      try {
        const response = await fetch(`${API_URL}/v1/settings/link-domain`, {
          method: 'DELETE',
          headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ parent_domain: this.unlinkParentDomain }),
        })

        if (!response.ok) {
          this.domainFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        const data = await response.json()
        this.domainFeedback = { type: 'success', text: data.message }
        await this.siteStore.getSiteData()
      } catch {
        this.domainFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.domainBusy = false
      }
    },

    async loadMediaWikiSettings() {
      try {
        const [settingsRes, skinsRes] = await Promise.all([
          fetch(`${API_URL}/v1/settings/mediawiki/`, { headers: this.authHeaders() }),
          fetch(`${API_URL}/v1/settings/mediawiki/default-skin`, {
            headers: this.authHeaders(),
          }),
        ])

        if (settingsRes.ok) {
          const settings = await settingsRes.json()
          this.currentSkin = settings.skin ?? ''
          this.currentLogo = settings.logo ?? null
          this.currentFavicon = settings.favicon ?? null
        }

        if (skinsRes.ok) {
          this.allowedSkins = await skinsRes.json()
        }
      } catch {}
    },

    async setSkin() {
      this.skinFeedback = null
      this.skinBusy = true

      try {
        const response = await fetch(`${API_URL}/v1/settings/mediawiki/default-skin`, {
          method: 'PATCH',
          headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ skin: this.currentSkin }),
        })

        if (!response.ok) {
          this.skinFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        const data = await response.json()
        this.skinFeedback = {
          type: 'success',
          text: `Default skin set to "${data.skin}". If you don't see the change, clear your browser cache.`,
        }
      } catch {
        this.skinFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.skinBusy = false
      }
    },

    async uploadBranding(event: Event, type: 'logo' | 'favicon') {
      const input = event.target as HTMLInputElement
      if (!input.files?.length) return

      this.brandingFeedback = null
      this.uploading = type

      const file = input.files[0]!
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch(`${API_URL}/v1/settings/mediawiki/${type}`, {
          method: 'PUT',
          headers: this.authHeaders(),
          body: formData,
        })

        if (!response.ok) {
          this.brandingFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        const data = await response.json()
        if (type === 'logo') this.currentLogo = data.logo
        else this.currentFavicon = data.favicon
        this.brandingFeedback = {
          type: 'success',
          text: `${type.charAt(0).toUpperCase() + type.slice(1)} updated.`,
        }
      } catch {
        this.brandingFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.uploading = null
        input.value = ''
      }
    },

    async runFixup() {
      this.fixupFeedback = null
      this.fixupBusy = true

      try {
        const response = await fetch(`${API_URL}/v1/settings/fixup`, {
          method: 'POST',
          headers: this.authHeaders(),
        })

        if (!response.ok) {
          this.fixupFeedback = { type: 'error', text: await extractError(response) }
          return
        }

        const data = await response.json()
        this.fixupFeedback = { type: 'success', text: data.message }
      } catch {
        this.fixupFeedback = { type: 'error', text: 'Network error. Please try again.' }
      } finally {
        this.fixupBusy = false
      }
    },

    brandingUrl(path: string): string {
      return `https://${this.siteStore.hostname}${path}`
    },
  },
})
</script>

<template>
  <div class="space-y-6">
    <!-- custom domain -->
    <section
      class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h2 class="mb-4">Custom Domain</h2>

      <template v-if="siteStore.isDonor">
        <template v-if="isCustomDomainLinked">
          <p class="text-sm text-gray-400 mb-4">
            Your site is currently using the custom domain
            <strong class="text-gray-200">{{ siteStore.hostname }}</strong
            >.
          </p>

          <div v-if="allowedDomains.length > 1" class="mb-4">
            <label class="text-sm font-medium text-gray-300 block mb-1.5"
              >Revert to parent domain</label
            >
            <select
              v-model="unlinkParentDomain"
              class="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-200 dark:border-gray-700"
            >
              <option v-for="d in allowedDomains" :key="d" :value="d">
                {{ siteStore.tag }}.{{ d }}
              </option>
            </select>
          </div>

          <AsyncButton class="button" :busy="domainBusy" @click="unlinkDomain()">
            Unlink Custom Domain
          </AsyncButton>
        </template>

        <template v-else>
          <p class="text-sm text-gray-400 mb-4">
            Point a CNAME record for your domain to
            <code class="text-cyan-400">{{ siteStore.hostname }}</code> before linking.
          </p>

          <div class="mb-4">
            <label class="text-sm font-medium text-gray-300 block mb-1.5">Domain</label>
            <input
              v-model="customDomain"
              type="text"
              placeholder="wiki.example.com"
              class="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <AsyncButton
            class="button"
            :busy="domainBusy"
            :disabled="!customDomain.trim()"
            @click="linkDomain()"
          >
            Link Domain
          </AsyncButton>
        </template>
      </template>

      <p v-else class="text-sm text-gray-400">
        Custom domains are available to
        <RouterLink :to="{ name: 'donate' }">donors</RouterLink> (7 &euro; or more).
      </p>

      <p
        v-if="domainFeedback"
        class="pl-3 mt-4 text-sm text-left border-l-2"
        :class="
          domainFeedback.type === 'error'
            ? 'text-red-400 border-red-500'
            : 'text-green-400 border-green-500'
        "
      >
        {{ domainFeedback.text }}
      </p>
    </section>

    <!-- mediawiki settings -->
    <section
      v-if="siteStore.siteType === 'mediawiki'"
      class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h2 class="mb-4">MediaWiki Settings</h2>

      <!-- default skin -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-300 block mb-1.5">Default Skin</label>
        <div class="flex gap-3">
          <select
            v-model="currentSkin"
            class="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-200 dark:border-gray-700"
          >
            <option v-for="skin in allowedSkins" :key="skin" :value="skin">{{ skin }}</option>
          </select>
          <AsyncButton class="button" :busy="skinBusy" :disabled="!currentSkin" @click="setSkin()">
            Save
          </AsyncButton>
        </div>
        <p
          v-if="skinFeedback"
          class="pl-3 mt-3 text-sm text-left border-l-2"
          :class="
            skinFeedback.type === 'error'
              ? 'text-red-400 border-red-500'
              : 'text-green-400 border-green-500'
          "
        >
          {{ skinFeedback.text }}
        </p>
      </div>

      <!-- logo -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-300 block mb-1.5">Logo</label>
        <div v-if="currentLogo" class="mb-2">
          <img
            :src="brandingUrl(currentLogo)"
            alt="Current logo"
            class="h-16 rounded border border-gray-700"
          />
        </div>
        <p v-if="uploading === 'logo'" class="text-sm text-gray-400 mb-1">Uploading...</p>
        <input
          v-else
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          class="text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-cyan-400 hover:file:bg-gray-700 file:cursor-pointer"
          @change="uploadBranding($event, 'logo')"
        />
      </div>

      <!-- favicon -->
      <div>
        <label class="text-sm font-medium text-gray-300 block mb-1.5">Favicon</label>
        <div v-if="currentFavicon" class="mb-2">
          <img
            :src="brandingUrl(currentFavicon)"
            alt="Current favicon"
            class="h-8 rounded border border-gray-700"
          />
        </div>
        <p v-if="uploading === 'favicon'" class="text-sm text-gray-400 mb-1">Uploading...</p>
        <input
          v-else
          type="file"
          accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml"
          class="text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-cyan-400 hover:file:bg-gray-700 file:cursor-pointer"
          @change="uploadBranding($event, 'favicon')"
        />
      </div>

      <p
        v-if="brandingFeedback"
        class="pl-3 mt-4 text-sm text-left border-l-2"
        :class="
          brandingFeedback.type === 'error'
            ? 'text-red-400 border-red-500'
            : 'text-green-400 border-green-500'
        "
      >
        {{ brandingFeedback.text }}
      </p>
    </section>

    <!-- maintenance -->
    <section
      class="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <h2 class="mb-2">Maintenance</h2>
      <p class="text-sm text-gray-400 mb-4">Run migrations and clear caches for your site.</p>
      <AsyncButton class="button" :busy="fixupBusy" @click="runFixup()">Run Fixup</AsyncButton>
      <p
        v-if="fixupFeedback"
        class="pl-3 mt-4 text-sm text-left border-l-2"
        :class="
          fixupFeedback.type === 'error'
            ? 'text-red-400 border-red-500'
            : 'text-green-400 border-green-500'
        "
      >
        {{ fixupFeedback.text }}
      </p>
    </section>
  </div>
</template>
