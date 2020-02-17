<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    width="800"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        v-on="on"
      >
        新規登録
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        部署を登録する
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="valid"
          ref="form"
          lazy-validation
        >
          <v-container>
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
          color="primary"
          @click="cancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!valid"
          :loading="loading"
          @click="register"
        >
          登録する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import DepartmentService from '@/models/department/DepartmentService'
import {Department} from '@/models/department/Department'
import {DepartmentRules} from '@/models/department/DepartmentRules'

@Component
export default class DepartmentRegister extends Vue {
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
  private dialogChanged() {
    this.department = DepartmentService.newInstance()
  }

  private async register() {
    this.$emit('before')

    if (!this.refs.form.validate()) return
    
    try {
      this.loading = true
      await DepartmentService.register(this.department)
      this.$notify({
        type: 'success',
        text: '登録完了しました',
      });
    } catch (err) {
      this.$notify({
        type: 'error',
        text: '登録に失敗しました',
      });
    } finally {
      this.loading = false
    }

    this.cancel()
    
    this.$emit('after')
  }

  private cancel() {
    this.refs.form.resetValidation()
    this.dialog = false
  }
}
</script>
