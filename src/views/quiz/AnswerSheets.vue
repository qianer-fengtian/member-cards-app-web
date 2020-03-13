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
          <template v-for="question in questions">
            <v-card
              :key="question.id"
              class="ma-2"
            >
              <v-card-title>
                <template v-if="question.result">
                  <v-icon color="success">mdi-check</v-icon>
                </template>
                <template v-if="!question.result">
                  <v-icon color="error">mdi-close</v-icon>
                </template>
                あなたの答え: {{ question.choice }}
              </v-card-title>
              <v-card-text>
                <MemberListItem :member="question.member" />
              </v-card-text>
            </v-card>
          </template>
          <v-btn
            color="primary"
            @click="start"
          >
            もう一度やる
          </v-btn>
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
import DepartmentService from '@/models/department/DepartmentService'
import TeamService from '@/models/team/TeamService'

@Component({
  components: {
    Avatar: () => import('@/components/modules/avatar/Avatar.vue'),
    MemberListItem: () => import('@/components/pages/member/MemberListItem.vue'),
    QuestionCard: () => import('@/components/pages/quiz/QuestionCard.vue'),
  },
})
export default class AnswerSheets extends Vue {
  private members: Array<Member> = []
  private questions: Array<Question> = []
  private departmentNameMap: Map<string, string> = new Map()
  private teamNameMap: Map<string, string> = new Map()
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
    this.currentIndex = 0
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
