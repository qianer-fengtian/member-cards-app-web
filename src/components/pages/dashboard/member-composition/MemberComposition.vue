<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <DashboardCard
        icon="account-tie"
        title="社員数"
      >
        <div class="total member-total">
          {{ statistics.total }}
        </div>
      </DashboardCard>
    </v-col>
    <v-col
      cols="6"
      md="4"
    >
      <DashboardCard
        icon="human-male"
        title="男性社員数"
      >
        <div class="total male-total">
          {{ statistics.maleTotal }}
        </div>
      </DashboardCard>
    </v-col>
    <v-col
      cols="6"
      md="4"
    >
      <DashboardCard
        icon="human-female"
        title="女性社員数"
      >
        <div class="total female-total">
          {{ statistics.femaleTotal }}
        </div>
      </DashboardCard>
    </v-col>
    <v-col cols="12">
      <DashboardCard title="男女比">
        <v-row align="center">
          <v-col
            class="text-center"
            cols="2"
          >
            <v-icon color="blue">
              mdi-human-male
            </v-icon>
          </v-col>
          <v-col>
            <v-progress-linear
              background-color="red"
              color="blue"
              height="10"
              :value="statistics.maleRatio"
            />
          </v-col>
          <v-col
            class="text-center"
            cols="2"
          >
            <v-icon color="red">
              mdi-human-female
            </v-icon>
          </v-col>
        </v-row>
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
  },
})
export default class MemberComposition extends Vue {
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

.member-total {
  color: $accent;
}

.male-total {
  color: #2196F3;
}

.female-total {
  color: #F44336;
}

.gender-ratio {
  margin: auto;
  text-align: center;
}
</style>