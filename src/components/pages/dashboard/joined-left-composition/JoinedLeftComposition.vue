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
        cols="12"
        md="6"
      >
        <DashboardCard title="年度別人数">
          <NumberOfTurnoverPerYear
            :number-of-joined-per-year="numberOfJoinedPerYear"
            :number-of-left-per-year="numberOfLeftPerYear"
          />
        </DashboardCard>
      </v-col>
    </v-row>
  </DashboardCard>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    DashboardCard: () => import('@/components/pages/dashboard/DashboardCard.vue'),
    NumberOfTurnoverPerYear: () => import('@/components/pages/dashboard/joined-left-composition/NumberOfTurnoverPerYear.vue'),
  },
})
export default class JoinedLeftComposition extends Vue {
  @Prop({ type: Object, default: {}})
  private numberOfJoinedPerYear: object

  @Prop({ type: Object, default: {}})
  private numberOfLeftPerYear: object

  private get joinedTotal() {
    return Object.values(this.numberOfJoinedPerYear).reduce((a, b) => a + b, 0)
  }

  private get leftTotal() {
    return Object.values(this.numberOfLeftPerYear).reduce((a, b) => a + b, 0)
  }
}
</script>

<style lang="scss" scoped>
.joined-total,
.left-total,
.retention-rate {
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
</style>