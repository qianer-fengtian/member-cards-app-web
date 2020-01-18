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
        メンバーを登録する
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="valid"
          ref="form"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col
                class="text-center"
                cols="12"
                sm="4"
              >
                <AvatarUpload v-model="member.avatar" />
              </v-col>
              <v-col
                cols="12"
                sm="8"
              >
                <v-text-field
                  v-model="member.code"
                  counter="50"
                  label="ユーザID"
                  outlined
                  required
                  :rules="rule.code"
                />
                <v-text-field
                  v-model="member.name"
                  counter="10"
                  label="ユーザ名"
                  outlined
                  required
                  :rules="rule.name"
                />
                <v-select
                  v-model="member.departmentId"
                  label="所属部署"
                  item-text="name"
                  item-value="id"
                  outlined
                  required
                  :items="departments"
                  :rules="rule.departmentId"
                />
                <v-textarea
                  v-model="member.specialty"
                  counter="100"
                  label="得意分野"
                  outlined
                  :rules="rule.specialty"
                />
                <v-textarea
                  v-model="member.selfAppeal"
                  counter="1000"
                  label="自己アピール"
                  outlined
                  rows="10"
                  :rules="rule.selfAppeal"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          outlined
          @click="cancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          outlined
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
import { Member } from '@/models/member/Member'
import { MemberRules } from '@/models/member/MemberRules'
import MemberService from '@/models/member/MemberService'
import { Department } from '@/models/department/Department'
import DepartmentService from '@/models/department/DepartmentService'

@Component({
  components: {
    AvatarUpload: () => import('@/components/modules/avatar/AvatarUpload.vue'),
  },
})
export default class MemberRegister extends Vue {
  private member: Member = MemberService.newInstance()
  private departments: Array<Department> = []
  private dialog: boolean = false
  private loading: boolean = false
  private valid: boolean = false

  private get refs(): any {
    return this.$refs
  }

  private get rule() {
    return MemberRules()
  }

  @Watch('dialog')
  private dialogChanged() {
    this.member = MemberService.newInstance()
  }

  async created() {
    this.departments = await DepartmentService.search()
  }

  private async register() {
    this.$emit('before')

    if (!this.refs.form.validate()) return

    try {
      this.loading = true
      await MemberService.register(this.member)    
    } catch (err) {
      console.error(err)
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