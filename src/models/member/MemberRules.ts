export const MemberRules = () => ({
  name: [
    (v: string) => !!v || 'ユーザ名は必須です',
    (v: string) => v.length <= 10 || 'ユーザ名は10文字以下である必要があります',
  ],
  birthDate: [
    (v: string) => !!v || '生年月日は必須です',
  ],
  joinedDate: [
    (v: string) => !!v || '入社年月日は必須です',
  ],
  departmentId: [
    (v: string) => !!v || '所属部署は必須です',
  ],
  specialty: [
    (v: string) => v.length <= 100 || '得意分野は100文字以下である必要があります',
  ],
  selfAppeal: [
    (v: string) => v.length <= 1000 || '自己アピールは1000文字以下である必要があります',
  ]
})