<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-item
            :key="item.text"
            link
            :to="{ name: item.name }"
            :hidden="item.hidden"
          >
            <v-list-item-action>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
          Anyplus++
      </v-toolbar-title>
      <v-spacer />
      <Signout />
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AuthService from '@/models/auth/AuthService'

@Component({
  components: {
    Signout: () => import('@/components/pages/auth/Signout.vue'),
  },
})
export default class App extends Vue {
  private dialog = false
  private drawer = false
  private isAdmin = false

  async created() {
    this.isAdmin = await AuthService.isAdmin()
  }

  get items(): Array<object> {
    return [
      {
        name: 'home',
        icon: 'mdi-account-search',
        text: '社員一覧をみる',
        hidden: false,        
      },
      {
        name: 'quiz',
        icon: 'mdi-account-question',
        text: '自己紹介クイズ',
        hidden: false,        
      },
      {
        name: 'member-list',
        icon: 'mdi-account-tie',
        text: '社員を編集する',
        hidden: !this.isAdmin,
      },
      {
        name: 'department-list',
        icon: 'mdi-home-variant',
        text: '部署を編集する',
        hidden: !this.isAdmin,
      },
    ];
  }
}
</script>

<style lang="scss" scoped>
.navigation-drawer {
  background-color: $primary !important;
}
</style>