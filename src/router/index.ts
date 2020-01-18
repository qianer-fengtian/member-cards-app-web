import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const ifNotAuthenticated = (to: Route, from: Route, next: Function) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to: Route, from: Route, next: Function) => {
  console.log(store.getters.isAuthenticated)
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/signin')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/member-cards',
        name: 'member-cards',    
        component: () => import('@/views/members/MemberCardList.vue'),
      },
      {
        path: '/members',
        name: 'member-list',
        component: () => import('@/views/members/MemberList.vue'),
      },
      {
        path: '/departments',
        name: 'department-list',
        component: () => import('@/views/departments/DepartmentList.vue'),
      },
      {
        path: '/quiz',
        name: 'quiz',
        component: () => import('@/views/quiz/Quiz.vue'),
      },
      {
        path: '/answers',
        name: 'answer-sheets',
        component: () => import('@/views/quiz/AnswerSheets.vue'),
      },      
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/Signin.vue'),
    beforeEnter: ifNotAuthenticated,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
