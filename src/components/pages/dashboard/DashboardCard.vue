<template>
  <v-card
    outlined
    v-bind="$attrs"
  >
    <v-card-title class="title">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DashboardCard extends Vue {
  @Prop({type: String, default: ''})
  private title: string
}
</script>

<style lang="scss" scoped>
.title {
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>