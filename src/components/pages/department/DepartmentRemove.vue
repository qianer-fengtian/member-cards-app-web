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
        部署を削除する
      </v-card-title>
      <v-card-text>
        <v-alert
          color="warning"
          outlined
        >
          本当に部署: {{ department.name }} を削除しますか？
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="warning"
          @click="cancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="warning"
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
import DepartmentService from '@/models/department/DepartmentService'
import {Department} from '@/models/department/Department'

@Component
export default class DepartmentRemove extends Vue {
  @Prop({type: String, required: true})
  private id: string

  private department: Department = DepartmentService.newInstance()
  private dialog: boolean = false
  private loading: boolean = false

  @Watch('dialog')
  private async dialogChanged() {
    this.department = await DepartmentService.select(this.id)
  }

  private async remove() {
    this.$emit('before')

    try {
      this.loading = true
      await DepartmentService.remove(this.department)
      this.$notify({
        type: 'success',
        text: '削除完了しました',
      });  
    } catch (err) {
      this.$notify({
        type: 'error',
        text: '削除に失敗しました',
      });
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
