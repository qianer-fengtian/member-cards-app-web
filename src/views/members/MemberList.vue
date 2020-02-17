<template>
  <v-card>
    <v-card-title>
      メンバーリスト
    </v-card-title>
    <v-card-text>
      <v-data-table
        sort-by="formattedRegisteredDate"
        sort-desc
        loading-text="検索中..."
        :headers="headers"
        :items="members"
        :loading="loading"
        :search="keyword"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="keyword"
              append-icon="mdi-magnify"
              label="検索"
              hide-details
            />
            <v-spacer />
            <MemberRegister @after="search" />
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <MemberUpdate
            :id="item.id"
            @after="search"
          />
          <MemberRemove
            :id="item.id"
            @after="search"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {Member} from '@/models/member/Member'
import MemberService from '@/models/member/MemberService'
import DepartmentService from '@/models/department/DepartmentService'
import TeamService from '@/models/team/TeamService'

@Component({
  components: {
    MemberRegister: () => import('@/components/pages/member/MemberRegister.vue'),
    MemberRemove: () => import('@/components/pages/member/MemberRemove.vue'),
    MemberUpdate: () => import('@/components/pages/member/MemberUpdate.vue'),
  },
})
export default class MemberList extends Vue {
  private members: Array<Member> = []
  private departmentNameMap: Map<string, string> = new Map()
  private teamNameMap: Map<string, string> = new Map()
  private dialog: boolean = false
  private loading: boolean  = false
  private keyword: string = ''
  
  private get headers() {
    return [
      {
        value: 'action',
        sortable: false,
        width: 100,
      },
      {
        text: '名前',
        value: 'name',
        width: 150,
      },
      {
        text: '性別',
        align: 'center',
        value: 'genderName',
        width: 100,
      },
      {
        text: '生年月日',
        align: 'center',
        value: 'formattedBirthDate',
        width: 100,
      },
      {
        text: '入社年月日',
        align: 'center',
        value: 'formattedJoinedDate',
        width: 120,
      },
      {
        text: '所属部署',
        align: 'center',
        value: 'departmentName',
        width: 200,
      },
      {
        text: '所属チーム',
        align: 'center',
        value: 'teamName',
        width: 200,
      },
      {
        text: '得意分野',
        value: 'specialty',
        width: 500,
      },
      {
        text: '自己アピール',
        value: 'selfAppeal',
        width: 500,
      },
      {
        text: '登録年月日',
        align: 'center',
        value: 'formattedRegisteredDate',
        width: 120,
      },
      {
        text: '更新年月日',
        align: 'center',
        value: 'formattedModifiedDate',
        width: 120,
      },
    ];
  }

  created() {
    this.search()
  }

  private async search() {
    try {
      this.loading = true
      this.members = await MemberService.search()
      this.departmentNameMap = await DepartmentService.getNameMap()
      this.teamNameMap = await TeamService.getNameMap()
      this.members.forEach(member => {
        member.departmentName = this.departmentNameMap.get(member.departmentId) || ''
        member.teamName = this.teamNameMap.get(member.teamId) || ''
      })
    } catch (err) {
      this.$notify({
        type: 'error',
        text: 'メンバーの取得に失敗しました',
      });      
      this.members = []
    } finally {
      this.loading = false
    }
  }
}
</script>
