<template>
  <DashboardCard>
    <v-row>
      <v-col
        cols="4"
        md="2"
      >
        <DashboardCard
          title="総入社数"
          height="120"
        >
          <div class="joined-total">
            {{ joinedTotal }}
          </div>
        </DashboardCard>
      </v-col>
      <v-col
        cols="4"
        md="2"
      >
        <DashboardCard
          title="総退社数"
          height="120"
        >
          <div class="left-total">
            {{ leftTotal }}
          </div>
        </DashboardCard>
      </v-col>
      <v-col
        cols="4"
        md="2"
      >
        <DashboardCard
          title="定着率"
          height="120"
        >
          <div class="retention-rate">
            %
          </div>
        </DashboardCard>
      </v-col>
      <v-col
        cols="4"
        md="2"
      >
        <DashboardCard
          title="新卒入社数"
          height="120"
        >
          <div class="new-graduates-total">
            {{ newGraduates }}
          </div>
        </DashboardCard>            
      </v-col>
      <v-col
        cols="4"
        md="2"
      >
        <DashboardCard
          title="中途入社数"
          height="120"
        >
          <div class="mid-careers-total">
            {{ newGraduates }}
          </div>
        </DashboardCard>            
      </v-col>
      <v-col cols="12">
        <DashboardCard title="年度別人数">
          <NumberOfTurnoverPerYear
            :numbers-of-employments="numbersOfEmployments"
            :numbers-of-retirements="numbersOfRetirements"
          />
        </DashboardCard>
      </v-col>
    </v-row>
  </DashboardCard>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { NumberOfEmployment, NumberOfRetirement } from '@/models/statistics/Statistics'

@Component({
  components: {
    DashboardCard: () => import('@/components/pages/dashboard/DashboardCard.vue'),
    NumberOfTurnoverPerYear: () => import('@/components/pages/dashboard/joined-left-composition/NumberOfTurnoverPerYear.vue'),
  },
})
export default class JoinedLeftComposition extends Vue {
  @Prop({ type: Number, default: 0 })
  private newGraduates: number

  @Prop({ type: Number, default: 0 })
  private midCareers: number

  @Prop({ type: Array, default: [] })
  private numbersOfEmployments: Array<NumberOfEmployment>

  @Prop({ type: Array, default: [] })
  private numbersOfRetirements: Array<NumberOfRetirement>

  private get joinedTotal() {
    return this.numbersOfEmployments.map(e => e.total).reduce((a, b) => a + b, 0)
  }

  private get leftTotal() {
    return this.numbersOfRetirements.map(e => e.total).reduce((a, b) => a + b, 0)
  }
}
</script>

<style lang="scss" scoped>
.joined-total,
.left-total,
.retention-rate,
.new-graduates-total,
.mid-careers-total {
  margin: auto;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
}

.joined-total {
  color: $success;
}

.left-total {
  color: $error;
}

.retention-rate {
  color: $accent;
}

.new-graduates-total {
  color: #AEEA00;
}

.mid-careers-total {
  color: #9C27B0;
}
</style>