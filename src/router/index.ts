import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import store from '@/store'
import AuthService from '@/models/auth/AuthService'

Vue.use(VueRouter)

const ifNotAuthenticated = (to: Route, from: Route, next: Function) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to: Route, from: Route, next: Function) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/signin')
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',    
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/cards',
        name: 'card-list',    
        component: () => import('@/views/cards/CardList.vue'),
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
        path: '/teams',
        name: 'team-list',
        component: () => import('@/views/teams/TeamList.vue'),
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

const AUTHORIZED_VIEWS = [
  'member-list',
  'department-list',
]

router.beforeEach(async (to: Route, from: Route, next: Function) => {
  if (to.name && AUTHORIZED_VIEWS.includes(to.name)) {
    const isAdmin = await AuthService.isAdmin()
    next(isAdmin)
  } else {
    next()
  }
})

export default router
