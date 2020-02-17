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
    <v-card :loading="initing">
      <v-card-title>
        メンバーを更新する
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
                  v-model="member.name"
                  counter="10"
                  label="ユーザ名"
                  outlined
                  required
                  :disabled="initing"
                  :rules="rule.name"
                />
                <v-select
                  v-model="member.gender"
                  label="性別"
                  item-text="name"
                  item-value="id"
                  outlined
                  required
                  :items="genders"
                />
                <DatePicker
                  v-model="member.formattedBirthDate"
                  label="生年月日"
                  outlined
                  required
                  :rules="rule.birthDate"
                />
                <DatePicker
                  v-model="member.formattedJoinedDate"
                  label="入社年月日"
                  outlined
                  required
                  :rules="rule.joinedDate"
                />
                <v-select
                  v-model="member.departmentId"
                  label="所属部署"
                  item-text="name"
                  item-value="id"
                  outlined
                  required
                  :disabled="initing"
                  :items="departments"
                  :rules="rule.departmentId"
                />
                <v-select
                  v-model="member.teamId"
                  label="所属チーム"
                  item-text="name"
                  item-value="id"
                  outlined
                  :disabled="initing"
                  :items="teams"
                />
                <v-textarea
                  v-model="member.specialty"
                  counter="100"
                  label="得意分野"
                  outlined
                  :disabled="initing"
                  :rules="rule.specialty"
                />
                <v-textarea
                  v-model="member.selfAppeal"
                  counter="1000"
                  label="自己アピール"
                  outlined
                  rows="10"
                  :disabled="initing"
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
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {Member, genders} from '@/models/member/Member'
import {MemberRules} from '@/models/member/MemberRules'
import MemberService from '@/models/member/MemberService'
import {Department} from '@/models/department/Department'
import DepartmentService from '@/models/department/DepartmentService'
import {Team} from '@/models/team/Team'
import TeamService from '@/models/team/TeamService'

@Component({
  components: {
    AvatarUpload: () => import('@/components/modules/avatar/AvatarUpload.vue'),
    DatePicker: () => import('@/components/modules/picker/DatePicker.vue'),
  },
})
export default class MemberUpdate extends Vue {
  @Prop({type: String, required: true})
  private id: string

  private member: Member = MemberService.newInstance()
  private departments: Array<Department> = []
  private teams: Array<Team> = []
  private dialog: boolean = false
  private valid: boolean = false
  private initing: boolean = false
  private loading: boolean = false

  private get refs(): any {
    return this.$refs
  }

  private get rule() {
    return MemberRules()
  }

  private get genders() {
    return genders
  }

  @Watch('dialog')
  private async dialogChanged() {
    try {
      this.initing = true
      this.member = await MemberService.select(this.id)
    } catch (err) {
      this.$notify({
        type: 'error',
        text: 'メンバーの情報がありません',
      });
      this.cancel()
    } finally {
      this.initing = false
    }
  }

  async created() {
    this.departments = await DepartmentService.search()
    this.teams = await TeamService.search()
  }

  private async update() {
    this.$emit('before')

    if (!this.refs.form.validate()) return

    try {
      this.loading = true
      await MemberService.update(this.member)
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
