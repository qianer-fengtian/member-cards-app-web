<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>
            自己紹介クイズ
          </v-card-title>
          <v-card-text>
            <v-form
              v-model="valid"
              ref="form"
              lazy-validation
            >
              <v-text-field
                v-model="numOfQuestions"
                label="設問数"
                outlined
                required
                type="number"
                :rules="rule.numOfQuestions"
              />
              <v-text-field
                v-model="numOfChoices"
                label="選択肢の数"
                outlined
                required
                type="number"
                :rules="rule.numOfChoices"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              large
              rounded
              @click="start"
            >
              クイズをはじめる
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { QuizRules } from '@/models/quiz/QuizRules'

@Component
export default class Quiz extends Vue {
  private valid: boolean = false
  private numOfQuestions: number = 10
  private numOfChoices: number = 3
  
  private get refs(): any {
    return this.$refs
  }

  private get rule() {
    return QuizRules()
  }

  private start() {
    this.$router.push({
      name: 'answer-sheets',
      params: {
        numOfQuestions: String(this.numOfQuestions),
        numOfChoices: String(this.numOfChoices),
      }
    })
  }
}
</script>
