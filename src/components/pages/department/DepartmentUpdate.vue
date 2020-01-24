<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    width="800"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="success"
        v-on="on"
      >
        更新
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        部署を更新する
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="valid"
          ref="form"
          lazy-validation
        >
          <v-container>
            <v-text-field
              v-model="department.code"
              counter="20"
              label="部署コード"
              outlined
              required
              :rules="rule.code"
            />
            <v-text-field
              v-model="department.name"
              counter="10"
              label="部署名"
              outlined
              required
              :rules="rule.name"
            />
          </v-container>
        </v-form>        
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          @click="cancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="success"
          :disabled="!valid"
          :loading="loading"
          @click="update"
        >
          更新する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import DepartmentService from '@/models/department/DepartmentService'
import {Department} from '@/models/department/Department'
import {DepartmentRules} from '@/models/department/DepartmentRules'

@Component
export default class DepartmentUpdate extends Vue {
  @Prop({type: String, required: true})
  private id: string

  private department: Department = DepartmentService.newInstance()
  private dialog: boolean = false
  private valid: boolean = false
  private loading: boolean = false

  private get refs(): any {
    return this.$refs
  }

  private get rule() {
    return DepartmentRules()
  }

  @Watch('dialog')
  private async dialogChanged() {
    this.department = await DepartmentService.select(this.id)
  }

  private async update() {
    this.$emit('before')

    if (!this.refs.form.validate()) return

    try {
      this.loading = true
      await DepartmentService.update(this.department)
      this.$notify({
        type: 'success',
        text: '更新完了しました',
      });  
    } catch (err) {
      this.$notify({
        type: 'error',
        text: '更新に失敗しました',
      });
    } finally {
      this.loading = false
    }

    this.cancel()
    
    this.$emit('after')
  }

  private async cancel() {
    this.refs.form.resetValidation()
    this.dialog = false
  }
}
</script>
