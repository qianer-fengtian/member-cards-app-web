export const TeamRules = () => ({
  name: [
    (v: string) => !!v || 'チーム名は必須です',
    (v: string) => v.length <= 10 || 'チーム名は10文字以下である必要があります',
  ],
  leaderId: [
    (v: string) => !!v || 'リーダーは必須です',
  ],
})