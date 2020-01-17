<template>
  <section v-if="question">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <Avatar v-model="question.member.avatar" />
          </v-row>
          <v-row
            justify="center"
            v-for="(choice, index) in question.choices"
            :key="index"
          >
            <v-col
              :cols="12"
              :sm="8"
              :md="6"
              :lg="4"
            >
              <v-btn
                block
                :color="answered && choice === question.correct ? 'success' : answered && choice === yourChoice ? 'error' : 'primary'"
                :disabled="answered && choice !== question.correct && choice !== yourChoice"
                outlined
                @click="answer(choice)"
              >
                {{ choice }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <template v-if="answered">
          <v-btn
            block
            color="primary" 
            outlined
            @click="next"
          >
            次の問題へ
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { Question } from '@/models/quiz/Question'

@Component({
  components: {
    Avatar: () => import('@/components/modules/avatar/Avatar.vue'),
  },
})
export default class QuestionCard extends Vue {
  @Prop()
  private value!: Question;

  @Emit()
  private input(value: Question) {}

  private answered: boolean = false
  private yourChoice: string = ''

  private get question() {
    return this.value
  }

  private set question(v) {
    this.$emit('input', v)
  }

  private answer(choice: string) {
    if (this.answered) return;

    this.question.select(choice)

    if (this.question.judge()) {
      this.question.ok();
    } else {
      this.question.ng();
    }

    this.yourChoice = choice;
    this.answered = true;
  }

  private next() {
    this.answered = false;
    this.$emit('next');
  }
}
</script>