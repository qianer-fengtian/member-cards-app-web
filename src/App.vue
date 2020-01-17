<template>
  <v-app>
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
      dark
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span>
          エニプラメンバー管理
        </span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop()
  private souce: string

  private dialog: boolean = false
  private drawer: boolean = false
  
  get items(): Array<object> {
    return [
      {
        name: 'home',
        icon: 'mdi-account-search',
        text: '社員一覧をみる'
      },
      {
        name: 'quiz',
        icon: 'mdi-account-question',
        text: '自己紹介クイズ',
      },
      {
        name: 'member-list',
        icon: 'mdi-account-tie',
        text: '社員を編集する',
      },
      {
        name: 'department-list',
        icon: 'mdi-home-variant',
        text: '部署を編集する',
      },
    ];
  }
}
</script>