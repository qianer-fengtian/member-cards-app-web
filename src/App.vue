<template>
  <v-app>
    <router-view />
    <notifications />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>