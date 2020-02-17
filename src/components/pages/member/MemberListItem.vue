<template>
  <v-card
    hover
    outlined
    :loading="loading"
    @click="show"
  >
    <v-container>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ member.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ member.departmentName }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <Avatar
          v-model="member.avatar"
          :size="96"
        />
      </v-list-item>
      <v-dialog
        v-model="dialog"
        scrollable
        width="800"
      >
        <v-card :loading="loading">
          <v-card-title>
            {{ member.name }}
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  class="text-center"
                  cols="12"
                  sm="4"
                >
                  <Avatar v-model="member.avatar" />
                </v-col>
                <v-col
                  cols="12"
                  sm="8"
                >
                  <v-text-field
                    v-model="member.name"
                    label="ユーザ名"
                    outlined
                    readonly
                  />
                  <v-text-field
                    v-model="member.genderName"
                    label="性別"
                    outlined
                    readonly
                  />
                  <v-text-field
                    v-model="member.formattedBirthDate"
                    label="生年月日"
                    outlined
                    readonly
                  />
                  <v-text-field
                    v-model="member.formattedJoinedDate"
                    label="入社年月日"
                    outlined
                    readonly
                  />         
                  <v-text-field
                    v-model="member.departmentName"
                    label="所属部署"
                    outlined
                    readonly
                  />
                  <v-text-field
                    v-model="member.teamName"
                    label="所属チーム"
                    outlined
                    readonly
                  />
                  <v-textarea
                    v-model="member.specialty"
                    label="得意分野"
                    outlined
                    readonly
                  />
                  <v-textarea
                    v-model="member.selfAppeal"
                    label="自己アピール"
                    outlined
                    readonly
                    rows="10"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="cancel"
            >
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {Member} from '@/models/member/Member'
import MemberService from '@/models/member/MemberService'

@Component({
  components: {
    Avatar: () => import('@/components/modules/avatar/Avatar.vue'),
  }
})
export default class MemberListItem extends Vue {
  @Prop({type: Object, default: MemberService.newInstance()})
  private member: Member

  @Prop({type: Boolean, default: false})
  private loading: boolean

  private dialog: boolean = false

  private show() {
    this.dialog = true
  }
  private cancel() {
    this.dialog = false
  }
}
</script>
