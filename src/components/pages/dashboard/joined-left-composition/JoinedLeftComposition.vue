<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <DashboardCard
        icon="account-group"
        title="総入社数"
      >
        <div class="total joined-total">
          {{ statistics.joinedTotal }}
        </div>
      </DashboardCard>
    </v-col>
    <v-col
      cols="6"
      md="4"
    >
      <DashboardCard
        icon="leaf"
        title="新卒入社数"
      >
        <div class="total new-graduates-total">
          {{ statistics.newGraduates }}
        </div>
      </DashboardCard>            
    </v-col>
    <v-col
      cols="6"
      md="4"
    >
      <DashboardCard
        icon="leaf-maple"
        title="中途入社数"
      >
        <div class="total mid-careers-total">
          {{ statistics.midCareers }}
        </div>
      </DashboardCard>            
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <DashboardCard
        icon="account-convert"
        title="直近3年の入社数"
      >
        <v-row>
          <div class="total last-years-joined-total">
            {{ statistics.lastThreeYearsJoinedTotal }}
            <span class="caption">(入社)</span>
          </div>
          <!-- <div class="total last-years-left-total">
            {{ statistics.lastThreeYearsLeftTotal }}
            <span class="caption">(退社)</span>
          </div> -->
        </v-row>
      </DashboardCard>
    </v-col>
    <v-col
      cols="12"
      md="8"
    >
      <DashboardCard title="年度別人数">
        <NumberOfTurnoverPerYear :statistics="statistics" />
      </DashboardCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Statistics } from '@/models/statistics/Statistics'

@Component({
  components: {
    DashboardCard: () => import('@/components/pages/dashboard/DashboardCard.vue'),
    NumberOfTurnoverPerYear: () => import('@/components/pages/dashboard/joined-left-composition/NumberOfTurnoverPerYear.vue'),
  },
})
export default class JoinedLeftComposition extends Vue {
  @Prop({ type: Object, required: true })
  private statistics: Statistics
}
</script>

<style lang="scss" scoped>
.total {
  margin: auto;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
}

.joined-total {
  color: $success;
}

.new-graduates-total {
  color: #AEEA00;
}

.mid-careers-total {
  color: #9C27B0;
}

.last-years-joined-total {
  color: $success;
}

.last-years-left-total {
  color: $error;
}

</style>