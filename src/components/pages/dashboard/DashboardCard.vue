<template>
  <v-card
    class="wrapper"
    flat
  >
    <v-card
      outlined
      v-bind="$attrs"
    >
      <v-card-title>
        <div class="card-title">
          <v-icon
            v-if="icon"
            large
            left
          >
            mdi-{{ icon }}
          </v-icon>
          <span class="title">
            {{ title }}
          </span>
        </div>
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DashboardCard extends Vue {
  @Prop({type: String, default: ''})
  private title: string

  @Prop({type: String, default: ''})
  private icon: string
}
</script>

<style lang="scss" scoped>
.wrapper {
  background: linear-gradient(135deg, rgba(0,166,237,1) 0%, rgba(136,73,194,1) 63%, rgba(246,81,29,1) 100%);
  padding: 1px;
}
.card-title {
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>