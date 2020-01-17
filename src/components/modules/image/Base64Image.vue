<template>
  <v-img :src="`data:image/png;base64, ${src}`" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Base64Image extends Vue {
  @Prop({ type: String, required: true})
  src: string;
}
</script>
