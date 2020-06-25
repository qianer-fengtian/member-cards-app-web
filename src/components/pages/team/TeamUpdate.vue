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
        チームを更新する
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
              :disabled="initing"
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
import {Team} from '@/models/team/Team'
import {TeamRules} from '@/models/team/TeamRules'
import TeamService from '@/models/team/TeamService'
import {Member} from '@/models/member/Member'
import MemberService from '@/models/member/MemberService'

@Component
export default class TeamUpdate extends Vue {
  @Prop({type: String, required: true})
  private id: string

  @Prop({type: Array, default: () => []})
  private members: Array<Member>
  
  private team: Team = TeamService.newInstance()
  private dialog: boolean = false
  private valid: boolean = false
  private initing: boolean = false
  private loading: boolean = false

  private get refs(): any {
    return this.$refs
  }

  private get rule() {
    return TeamRules()
  }

  @Watch('dialog')
  private async dialogChanged() {
    try {
      this.initing = true
      this.team = await TeamService.select(this.id)
    } catch (err) {
      this.$notify({
        type: 'error',
        text: 'チームの情報がありません',
      });
      this.cancel()
    } finally {
      this.initing = false
    }
  }

  private async update() {
    this.$emit('before')

    if (!this.refs.form.validate()) return

    try {
      this.loading = true
      await TeamService.update(this.team)
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
