<template>
  <v-card>
    <v-card-title>
      部署リスト
    </v-card-title>
    <v-card-text>
      <v-data-table
        sort-by="name"
        loading-text="検索中..."
        :headers="headers"
        :items="departments"
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
            <DepartmentRegister @after="search" />
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <DepartmentUpdate
            :id="item.id"
            @after="search"
          />
          <DepartmentRemove
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
import DepartmentService from '@/models/department/DepartmentService'
import { Department } from '@/models/department/Department'

@Component({
  components: {
    DepartmentRegister: () => import('@/components/pages/department/DepartmentRegister.vue'),
    DepartmentRemove: () => import('@/components/pages/department/DepartmentRemove.vue'),
    DepartmentUpdate: () => import('@/components/pages/department/DepartmentUpdate.vue'),
  },
})
export default class DepartmentList extends Vue {
  private departments: Array<Department> = []
  private dialog: boolean = false
  private loading: boolean  = false
  private keyword: string = ''
  
  get headers(): Array<object> {
    return [
      {
        value: 'action',
        sortable: false,
      },
      {
        text: '部署名',
        value: 'name',
      },
    ];
  }

  async created() {
    this.search()
  }

  private async search() {
    try {
      this.loading = true
      this.departments = await DepartmentService.search()
    } catch (err) {
      this.$notify({
        type: 'error',
        text: '部署の取得に失敗しました',
      });      
      this.departments = []
    } finally {
      this.loading = false
    }
  }
}
</script>
