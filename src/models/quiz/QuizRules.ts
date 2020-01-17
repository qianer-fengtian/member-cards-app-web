export const QuizRules = () => ({
  numOfQuestions: [
    (v: number) => !!v || '設問数は必須です',
    (v: number) => 3 <= v && v <= 20|| '設問数は 3 個以上 20 個以下までの範囲で指定してください',
  ],
  numOfChoices: [
    (v: number) => !!v || '選択肢の数は必須です',
    (v: number) => 2 <= v && v <= 5|| '選択肢の数は 2 個以上 5 個以下までの範囲で指定してください',
  ],
})