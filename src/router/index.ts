import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',    
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/departments',
    name: 'department-list',
    component: () => import('../views/departments/DepartmentList.vue'),
  },
  {
    path: '/members',
    name: 'member-list',
    component: () => import('../views/members/MemberList.vue'),
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
