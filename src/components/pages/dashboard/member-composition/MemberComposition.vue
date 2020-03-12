<template>
  <DashboardCard>
    <v-row>
      <v-col
        cols="4"
        md="2"
      >
        <DashboardCard
          title="社員数"
          height="120"
        >
          <div class="member-total">
            {{ total }}
          </div>
        </DashboardCard>
      </v-col>
      <v-col
        cols="4"
        md="2"
      >
        <DashboardCard
          title="男性社員数"
          height="120"
        >
          <div class="male-total">
            {{ maleTotal }}
          </div>
        </DashboardCard>
      </v-col>
      <v-col
        cols="4"
        md="2"
      >
        <DashboardCard
          title="女性社員数"
          height="120"
        >
          <div class="female-total">
            {{ femaleTotal }}
          </div>
        </DashboardCard>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <DashboardCard
          title="男女比"
          height="120"
        >
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
                :value="maleRatio"
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
  </DashboardCard>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    DashboardCard: () => import('@/components/pages/dashboard/DashboardCard.vue'),
  },
})
export default class MemberComposition extends Vue {
  @Prop({ type: Number, default: 0})
  private total: number

  @Prop({ type: Number, default: 0})
  private maleTotal: number

  @Prop({ type: Number, default: 0})
  private femaleTotal: number

  private get maleRatio() {
    if (this.total <= 0) return 0
    return (this.maleTotal / this.total) * 100
  }
}
</script>

<style lang="scss" scoped>
.member-total,
.male-total,
.female-total {
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