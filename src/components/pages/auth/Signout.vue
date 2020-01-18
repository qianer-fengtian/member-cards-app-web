<template>
  <v-icon @click="signout">
    mdi-logout
  </v-icon>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AuthService from '@/models/auth/AuthService'

@Component
export default class Signout extends Vue {
  private async signout() {
    try {
      await AuthService.logout()
      this.$router.push('/signin')
    } catch (err) {
      localStorage.removeItem('user-token')
      this.$store.commit('AUTH_ERROR')
      console.error(err)
    }
  }
}
</script>
