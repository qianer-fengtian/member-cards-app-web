export const DepartmentRules = () => ({
  name: [
    (v: string) => !!v || '部署名は必須です',
    (v: string) => v.length <= 10 || '部署名は10文字以下である必要があります',
  ],
})