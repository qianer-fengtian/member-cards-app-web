<template>
  <div>
    <v-avatar
      color="grey lighten-2"
      :size="size"
    >
      <template v-if="value">
        <Base64Image :src="value" />
      </template>
      <span v-else>256KB以下</span>
      <v-icon
        aria-hidden="true"
        class="icon"
        :size="iconSize"
        @click="upload"
      >
        mdi-upload
      </v-icon>
    </v-avatar>
    <input
      ref="input"
      accept="image/*"
      class="input"
      type="file"
      @change="inputAvatarFile"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

interface HTMLElementEvent<T extends HTMLElement> extends Event {
  srcElement: T
}

@Component({
  components: {
    Base64Image: () => import('@/components/modules/image/Base64Image.vue'),
  }
})
export default class AvatarUpload extends Vue {
  @Prop({ type: String, required: true})
  private value: string

  @Prop({ type: Number, default: 128})
  private size: number

  private fileReader: FileReader = new FileReader()

  private get refs(): any {
    return this.$refs
  }

  private get iconSize() {
    return this.size / 4 * 3
  }

  created() {
    this.fileReader.addEventListener('load', this.setAvatarFile)
  }

  beforeDestroy() {
    this.fileReader.removeEventListener('load', this.setAvatarFile)
  }

  private upload() {
    this.refs.input.click()
  }

  private inputAvatarFile(input: HTMLElementEvent<HTMLInputElement>) {
    if (input && input.srcElement) {
      const files = input.srcElement.files
      if (files) {
        if (files.length === 0) return

        if (!/image\/.*/.test(files[0].type)) return

       const fileSize = (files[0].size / 1024)
        if (fileSize > 256) return
        
        this.fileReader.readAsDataURL(files[0])
      }
    }
  }

  private setAvatarFile() {
    if (typeof this.fileReader.result === 'string') {
      const result = this.fileReader.result
      const firstIndex = result.indexOf(',') + 1
      this.$emit('input', result.slice(firstIndex))
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 0.5 ease;
  &:hover {
    opacity: 1;
  }
}

.input {
  display: none;
}
</style>