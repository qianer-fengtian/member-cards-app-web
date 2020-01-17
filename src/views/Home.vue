<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row>
      <template v-for="member in members">
        <v-col
          :key="member.id"
          sm="6"
          md="4"
          lg="3"
        >
          <MemberListItem :member="member" />
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
  private members: Array<Member> = []

  async beforeCreate() {
    this.members = await MemberService.search()
  }
}
</script>
