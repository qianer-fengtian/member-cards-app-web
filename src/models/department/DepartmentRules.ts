export const DepartmentRules = () => ({
  code: [
    (v: string) => !!v || '部署コードは必須です',
    (v: string) => v.length <= 20 || '部署コードは20文字以下である必要があります',
  ],
  name: [
    (v: string) => !!v || '部署名は必須です',
    (v: string) => v.length <= 10 || '部署名は10文字以下である必要があります',
  ],
})