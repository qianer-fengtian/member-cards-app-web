<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <template v-if="!loading && !finished">
          <section>
            <h1>
              {{ currentIndex + 1 }} / {{ questions.length }}
            </h1>
            <QuestionCard
              v-if="currentQuestion"
              v-model="currentQuestion"
              @next="next"
            />
          </section>
        </template>
        <template v-if="finished">
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="question in questions"
                :key="question.id"
                color="primary"
              >
                <Avatar
                  v-model="question.member.avatar"
                  :size="64"
                />
                <v-list-item-content>
                  <v-list-item-title v-text="question.correct"></v-list-item-title>
                  <v-list-item-subtitle>
                    あなたの答え: {{ question.choice }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer />
                <v-list-item-icon>
                  <template v-if="question.result">
                    <v-icon color="success">mdi-check</v-icon>
                  </template>
                  <template v-if="!question.result">
                    <v-icon color="error">mdi-close</v-icon>
                  </template>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Member } from '@/models/member/Member'
import MemberService from '@/models/member/MemberService'
import { Question } from '@/models/quiz/Question'
import QuestionService from '@/models/quiz/QuestionService'

@Component({
  components: {
    Avatar: () => import('@/components/modules/avatar/Avatar.vue'),
    QuestionCard: () => import('@/components/pages/quiz/QuestionCard.vue'),
  },
})
export default class AnswerSheets extends Vue {
  private members: Array<Member> = []
  private questions: Array<Question> = []
  private finished = false
  private loading = true
  private currentIndex: number = 0
  private numOfQuestions: number = 0
  private numOfChoices: number = 0

  private get currentQuestion() {
    if (this.questions.length > 0) {
      return this.questions[this.currentIndex]
    } else {
      return null
    }
  }
  async created() {
    this.members = await MemberService.search()
    this.numOfQuestions = +this.$route.params.numOfQuestions
    this.numOfChoices = +this.$route.params.numOfChoices
    this.start()
  }

  private start() {
    this.loading = true
    this.questions = QuestionService.generateQuestions(this.members, this.numOfQuestions, this.numOfChoices)
    this.loading = false
    this.finished = false
  }


  private next() {
    if (this.currentIndex + 1 < this.numOfQuestions) {
      this.currentIndex++
    } else {
      this.finished = true
    }
  }
}  
</script>
