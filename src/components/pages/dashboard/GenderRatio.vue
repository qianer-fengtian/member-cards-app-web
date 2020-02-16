<template>
  <v-card
    class="gender-ratio"
    outlined
  >
    <v-card-title class="title">
      男女比
    </v-card-title>
    <v-card-text>
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
      <v-row
        align="center"
        class="gender-ratio__malevsfemale"
      >
        <v-col cols="2">
          <span class="gender-ratio__male">
            {{ maleTotal }}
          </span>
        </v-col>
        <v-col>
          :
        </v-col>
        <v-col cols="2">
          <span class="gender-ratio__female">
            {{ femaleTotal }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class GenderRatio extends Vue {
  @Prop({type: Number, default: 0})
  private maleTotal: number

  @Prop({type: Number, default: 0})
  private femaleTotal: number

  private get maleFemaletotal() {
    return this.maleTotal + this.femaleTotal
  }

  private get maleRatio() {
    if (this.maleFemaletotal <= 0) return 0
    return (this.maleTotal / this.maleFemaletotal) * 100
  }
}
</script>

<style lang="scss" scoped>
.gender-ratio {
  &__malevsfemale {
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
  }
  &__male, &__female {
    font-size: 24px;
  }
  &__male {
    color: #2196F3;
  }
  &__female {
    color: #F44336;
  }
}
</style>