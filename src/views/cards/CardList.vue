<template>
  <v-container fluid>
    <v-row>
      <template v-for="member in members">
        <v-col
          :key="member.id"
          sm="6"
          md="4"
          lg="3"
        >
          <MemberListItem
            :member="member"
            :loading="loading"
          />
        </v-col> 
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DepartmentService from '@/models/department/DepartmentService'
import MemberService from '@/models/member/MemberService'
import {Member} from '@/models/member/Member'

@Component({
  components: {
    MemberListItem: () => import('@/components/pages/member/MemberListItem.vue'),
  },
})
export default class MemberList extends Vue {
  private loading: boolean = false
  private members: Array<Member> = []

  async created() {
    this.members = Array(20).join(',').split(',').map(() => this.getDummyMember())

    try {
      this.loading = true
      this.members = await MemberService.search()
    } catch (err) {
      this.$notify({
        type: 'error',
        text: 'メンバーカードの取得に失敗しました',
      });      
      this.members = []
    } finally {
      this.loading = false
    }
  }

  getDummyMember() {
    const member = MemberService.newInstance()
    member.name = '-'
    return member
  }
}
</script>
