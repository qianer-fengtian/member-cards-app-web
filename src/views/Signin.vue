<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-card
          class="signin-card"
          outlined
          :loading="loading"
        >
          <v-card-title class="title">
            Anyplus++
          </v-card-title>
          <v-form              
            v-model="valid"
            ref="form"
            lazy-validation
            @submit.prevent="signin"
          >
            <v-card-text>
              <v-text-field
                v-model="code"
                class="mt-2 mb-2"
                hide-details
                label="ユーザID"
                outlined
                required
                :disabled="loading"
                :rules="rule.code"
              />
              <v-text-field
                v-model="password"
                class="mt-2 mb-2"
                hide-details
                label="パスワード"
                outlined
                required
                type="password"
                :disabled="loading"
                :rules="rule.password"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                color="primary"
                outlined
                rounded
                type="submit"
                :disabled="!valid || loading"
              >
                サインイン
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AuthService from '@/models/auth/AuthService'
import UserService from '@/models/user/UserService'
import { UserRules } from '@/models/user/UserRules'

@Component
export default class Signin extends Vue {
  private loading = false
  private valid = false
  private code = ''
  private password = ''

  private get refs(): any {
    return this.$refs
  }

  private get rule() {
    return UserRules()
  }

  private async signin() {
    const { code, password } = this

    const user = UserService.newInstance()
    user.code = code
    user.password = password

    if (!this.refs.form.validate()) {
      this.$notify({
        type: 'error',
        title: '入力エラー',
        text: 'ユーザID・パスワードを入力してください',
      });
      return
    }

    try {
      this.loading = true
      await AuthService.login(user)
      this.$router.push('/dashboard')
      this.$notify({
        type: 'success',
        title: '認証成功',
        text: 'サインインしました',
      });
    } catch (err) {
      localStorage.removeItem('user-token')
      this.$store.commit('AUTH_ERROR')
      this.$notify({
        type: 'error',
        title: '認証失敗',
        text: 'ユーザIDまたはパスワードが違います',
      });
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: $primary;
}
</style>