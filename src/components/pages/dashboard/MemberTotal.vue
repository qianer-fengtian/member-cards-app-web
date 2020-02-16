<template>
  <v-card
    class="member-total"
    outlined
  >
    <v-card-title class="title">
      社員数
    </v-card-title>
    <v-card-text>
      <div class="member-total__value">
        <span>{{ total }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MemberTotal extends Vue {
  @Prop({type: Number, default: 0})
  private total: number
}
</script>

<style lang="scss" scoped>
.member-total {
  &__value {
    $border-width: 2px;
    $color: $primary;
    $width: 96px;
    $height: 96px;

    border-radius: 50%;
    border-top:$border-width solid $color;
    box-sizing: border-box;
    margin: auto;
    position: relative;
    width: $width;
    height: $height;
    &::before, &::after {
      box-sizing: border-box;
      border-radius: 50%;
      content: '';
      position: absolute;
      left: 0;
      top: -$border-width;
      width: $width;
      height: $height;
    }
    &::before {
      border-top: $border-width solid $color;
      transform: rotate(120deg);
    }
    &::after {
      border-top: $border-width solid $color;
      transform: rotate(240deg);
    }
    span {
      color: $secondary;
      font-size: 2rem;
      font-weight: bold;
      line-height: $height;
      position: absolute;
      text-align: center;
      width: $width;
      height: $height;
    }
  }
}
</style>