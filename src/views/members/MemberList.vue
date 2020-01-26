<template>
  <v-card>
    <v-card-title>
      メンバーリスト
    </v-card-title>
    <v-card-text>
      <v-data-table
        sort-by="code"
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import MemberService from '@/models/member/MemberService'
import { Member } from '@/models/member/Member'

@Component({
  components: {
    MemberRegister: () => import('@/components/pages/member/MemberRegister.vue'),
    MemberRemove: () => import('@/components/pages/member/MemberRemove.vue'),
    MemberUpdate: () => import('@/components/pages/member/MemberUpdate.vue'),
  },
})
export default class MemberList extends Vue {
  private members: Array<Member> = []
  private dialog: boolean = false
  private loading: boolean  = false
  private keyword: string = ''
  
  private get headers() {
    return [
      {
        value: 'action',
        sortable: false,
      },
      {
        text: 'ユーザID',
        align: 'left',
        value: 'code',
        width: 150,
      },
      {
        text: '名前',
        align: 'center',
        value: 'name',
        width: 150,
      },
      {
        text: '生年月日',
        align: 'center',
        value: 'formattedBirthDate',
        width: 100,
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
