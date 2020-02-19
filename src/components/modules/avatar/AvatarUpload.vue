<template>
  <div>
    <v-avatar
      color="grey lighten-2"
      :size="size"
    >
      <template v-if="value">
        <Base64Image :src="value" />
      </template>
      <span v-else>画像</span>
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

  private image = new Image()

  private get refs(): any {
    return this.$refs
  }

  private get iconSize() {
    return this.size / 4 * 3
  }

  private get compressedSize() {
    return 300
  }

  created() {
    this.fileReader.addEventListener('load', this.setAvatarFile)
    this.image.addEventListener('load', this.setImage)
  }

  beforeDestroy() {
    this.fileReader.removeEventListener('load', this.setAvatarFile)
    this.image.removeEventListener('load', this.setImage)
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

        this.fileReader.readAsDataURL(files[0])
      }
    }
  }

  private setAvatarFile() {
    if (typeof this.fileReader.result === 'string') {
      this.image.src = this.fileReader.result
    }
  }

  private setImage() {
    let ratio = 0
    let width = this.compressedSize
    let height = this.compressedSize

    if (this.image.width > this.image.height) {
      ratio = this.image.height / this.image.width
      height = height * ratio
    } else {
      ratio = this.image.width / this.image.height      
      width = width * ratio
    }

    const canvasEl = document.createElement('canvas')
    canvasEl.height = height
    canvasEl.width = width
    
    const ctx = canvasEl.getContext('2d')
    if (ctx) {
      ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, width, height)
      const result = canvasEl.toDataURL('image/jpg')
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