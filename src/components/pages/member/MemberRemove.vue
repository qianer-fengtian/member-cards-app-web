<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    width="800"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="warning"
        v-on="on"
      >
        削除
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        メンバーを削除する
      </v-card-title>
      <v-card-text>
        <v-alert
          color="warning"
          outlined
        >
          本当にユーザID: {{member.code}} を削除しますか？
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="warning"
          outlined
          @click="cancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="warning"
          outlined
          :loading="loading"
          @click="remove"
        >
          削除する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import MemberService from '@/models/member/MemberService'
import {Member} from '@/models/member/Member'

@Component
export default class MemberRemove extends Vue {
  @Prop({type: String, required: true})
  private id: string

  private member: Member = MemberService.newInstance()
  private dialog: boolean = false
  private loading: boolean = false

  @Watch('dialog')
  private async dialogChanged() {
    this.member = await MemberService.select(this.id)
  }

  private async remove() {
    this.$emit('before')

    try {
      this.loading = true
      await MemberService.remove(this.member)
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }

    this.cancel()

    this.$emit('after')
  }

  private cancel() {
    this.dialog = false
  }
}
</script>
