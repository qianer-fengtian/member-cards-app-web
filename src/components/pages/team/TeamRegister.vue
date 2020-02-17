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
        チームを登録する
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="valid"
          ref="form"
          lazy-validation
        >
          <v-container>
            <v-text-field
              v-model="team.name"
              counter="10"
              label="チーム名"
              outlined
              required
              :rules="rule.name"
            />
            <v-select
              v-model="team.leaderId"
              label="リーダー名"
              item-text="name"
              item-value="id"
              outlined
              required
              :items="members"
              :rules="rule.leaderId"
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
import {Team} from '@/models/team/Team'
import {TeamRules} from '@/models/team/TeamRules'
import TeamService from '@/models/team/TeamService'
import {Member} from '@/models/member/Member'
import MemberService from '@/models/member/MemberService'

@Component
export default class TeamRegister extends Vue {
  private team: Team = TeamService.newInstance()
  private members: Array<Member> = []
  private dialog: boolean = false  
  private valid: boolean = false
  private loading: boolean = false

  private get refs(): any {
    return this.$refs
  }

  private get rule() {
    return TeamRules()
  }

  @Watch('dialog')
  private dialogChanged() {
    this.team = TeamService.newInstance()
  }

  async created() {
    this.members = await MemberService.search()
  }

  private async register() {
    this.$emit('before')

    if (!this.refs.form.validate()) return
    
    try {
      this.loading = true
      await TeamService.register(this.team)
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
