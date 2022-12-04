import { type RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = [{
  path: '/',
  component: ()=>import('@/views/dashboard/index.vue')
}]

export default routes
