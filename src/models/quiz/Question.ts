export type QuestionResponse = {
  id: string
  index: number
  member: object
  choices: Array<string>
  correct: string
}

export class Question {
  id: string
  index: number
  member: object
  choices: Array<string>
  choice: string
  correct: string
  result: boolean
  
  static getInstance(res: QuestionResponse): Question {
    const question = new Question()
    question.id = res.id
    question.index = res.index
    question.member = res.member
    question.choices = res.choices
    question.correct = res.correct
    question.result = false
    return question
  }

  select(choice: string) {
    if (this.choices.includes(choice)) {
      this.choice = choice;
    } else {
      throw new Error();
    }
  }

  judge(): boolean {
    return this.correct === this.choice;
  }

  ok() {
    this.result = true;
  }

  ng() {
    this.result = false;
  }
}