<template>
  <div>
    <router-link to="/">Shoutbox</router-link>
    <router-view v-slot="{ Component }">
      <loading-zone>
        <working-zone>
          <component :is="Component" />
        </working-zone>
      </loading-zone>
    </router-view>
  </div>
</template>

<script>
import { useMeta, useActiveMeta } from 'vue-meta'

export default {
  setup () {
    const { meta } = useMeta({
      title: 'Live Change Framework Example',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    })
    const metadata = useActiveMeta()
    return { metadata }
  },
  metaInfo() {
    return {
      title: 'Live Change Framework Example',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    }
  },
  computed: {
    api() {
      return this.$api
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
