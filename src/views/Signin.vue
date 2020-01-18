<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          エニプラメンバー管理
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="code"
              label="ユーザID"
              outlined
              required
            />
            <v-text-field
              v-model="password"
              label="パスワード"
              outlined
              required
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="signin">
            サインイン
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AuthService from '@/models/auth/AuthService'
import UserService from '@/models/user/UserService'

@Component
export default class Signin extends Vue {
  private code: string = ''
  private password: string = ''

  private async signin() {
    const { code, password } = this
    const user = UserService.newInstance()
    user.code = code
    user.password = password
    try {
      await AuthService.login(user)
      this.$router.push('/')
    } catch (err) {
      localStorage.removeItem('user-token')
      this.$store.commit('AUTH_ERROR')
      console.error(err)
    }
  }
}
</script>