<template>
  <v-card>
    <v-card-title>
      メンバーリスト
    </v-card-title>
    <v-card-text>
      <v-data-table
        hide-default-footer
        sort-by="registeredDate"
        sort-desc
        loading-text="検索中..."
        :headers="headers"
        :items="members"
        :items-per-page="itemsPerPage"
        :loading="loading"
        :page.sync="page"
        :search="keyword"
        @page-count="pageCount = $event"
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
      <v-pagination
        v-model="page"
        :length="pageCount"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {Member, joiningForms } from '@/models/member/Member'
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
  private page = 1
  private pageCount = 0
  private itemsPerPage = 10
  
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
        text: '退社年月日',
        align: 'center',
        value: 'formattedLeftDate',
        width: 120,
      },
      {
        text: '所属部署',
        align: 'left',
        value: 'departmentName',
        width: 200,
      },
      {
        text: '所属チーム',
        align: 'left',
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
    ];
  }

  created() {
    this.search()
  }

  private async search() {
    try {
      this.loading = true
      this.members = await MemberService.search()
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
