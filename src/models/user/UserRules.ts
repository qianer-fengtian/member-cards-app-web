export const UserRules = () => ({
  code: [
    (v: string) => !!v || 'ユーザIDは必須です',
    (v: string) => /^[0-9A-Za-z]+$/.test(v) || 'ユーザIDは英数字のみ入力できます',
    (v: string) => v.length <= 10 || 'ユーザIDは10文字以下である必要があります',
  ],
  password: [
    (v: string) => !!v || 'パスワードは必須です',
    (v: string) => /^[0-9A-Za-z]+$/.test(v) || 'パスワードは英数字のみ入力できます',
    (v: string) => v.length <= 255 || 'パスワードは255文字以下である必要があります',
  ],
})