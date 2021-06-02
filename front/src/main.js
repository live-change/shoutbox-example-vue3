import { createSSRApp } from 'vue'
import { createMetaManager } from 'vue-meta'

import { registerComponents, validators } from '@live-change/vue3-components'
import ReactiveDaoVue from '@live-change/dao-vue3'

import App from './App.vue'
import { createRouter } from './router'


// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp(api) {
  const app = createSSRApp(App)
  app.config.devtools = true

  api.installInstanceProperties(app.config.globalProperties)
  app.config.globalProperties.$validators = validators
  registerComponents(app) 
  app.use(ReactiveDaoVue, { dao: api })
  
  const router = createRouter()
  app.use(router)

  const meta = createMetaManager({
    isSSR: import.meta.env.SSR
  })
  app.use(meta)

  return { app, router }
}
