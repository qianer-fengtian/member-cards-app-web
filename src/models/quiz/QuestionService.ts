import { Member } from '@/models/member/Member'
import { Question } from '@/models/quiz/Question'
import uuidv4 from 'uuid/v4'

export default {
  newInstance(): Question {
    return Question.getInstance({
      id: uuidv4(),
      index: 0,
      member: {},
      choices: [],
      correct: '',
    })
  },

  generateQuestions(
    members: Array<Member> = [],
    numOfQuestions: number = 5,
    numOfChoices: number = 3) {
    const questions: Array<Question> = []
    
    let index = 0
    const shuffledSlicedMembers: Array<Member> = this.shuffle(members).slice(0, numOfQuestions)
    for (const member of shuffledSlicedMembers) {
      const choices = this.shuffle([member, ...this.shuffle(members).filter(m => m.id !== member.id).slice(0, numOfChoices-1)]).map((e) => e.name)
      const correct = member.name
      const question = Question.getInstance({
          id: uuidv4(),
          index,
          member,
          choices,
          correct
        })

      index++
      questions.push(question)
    }

    return questions;
  },

  shuffle(members: Array<Member>): Array<Member> {
    const shuffledMembers = Array.from(members)
    for (let i = shuffledMembers.length - 1; i >= 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1))
      const tmp = shuffledMembers[i]
      shuffledMembers[i] = shuffledMembers[rand]
      shuffledMembers[rand] = tmp
    }
    return shuffledMembers
  }
}