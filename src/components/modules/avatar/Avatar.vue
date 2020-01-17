<template>
  <v-avatar
    color="grey lighten-2"
    :size="size"
  >
    <template v-if="value">
      <Base64Image :src="value" />
    </template>
    <template v-if="!value">
      <v-icon
        aria-hidden="true"
        class="icon"
        :size="iconSize"
      >
        mdi-account
      </v-icon>
    </template>
  </v-avatar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    Base64Image: () => import('@/components/modules/image/Base64Image.vue'),
  }
})
export default class Avatar extends Vue {
  @Prop({ type: String, required: true})
  private value: string

  @Prop({ type: Number, default: 128})
  private size: number

  private get iconSize() {
    return this.size / 4 * 3
  }
}
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  top: 0;
  left: 0;
}
</style>