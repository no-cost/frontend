import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import App from '@/App.vue'
import router from '@/router'

import useForumStore from '@/stores/forumStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const forumStore = useForumStore()
forumStore.loadSavedToken()
forumStore.getForumData()

library.add(fas, fab, far)

app.mount('#app')
