<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="$value"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="$attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="$value"
      :day-format="(v) => new Date(v).getDate()"
      locale="ja"
      @input="menu = false"
    />
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DatePicker extends Vue {
  @Prop({ type: String, required: true})
  private value: string

  private menu: boolean = false

  get $value() {
    return this.value
  }

  set $value(v) {
    this.$emit('input', v)
  }
}
</script>
