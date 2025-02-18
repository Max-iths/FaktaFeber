<script setup></script>

<template>
  <div id="app">
    <Navbar />

    <router-view></router-view>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style scoped>
html, body {
    overflow: auto;
}
</style>
