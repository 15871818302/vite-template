import { createWebHistory, type RouteRecordRaw, createRouter } from 'vue-router'

// 读取modules下面的文件
const routes: RouteRecordRaw[] = []
// 使用vite中的方法
const modules:any = import.meta.glob('./modules/*.ts', { eager: true, import: 'default' })

for (const path in modules) {
  routes.push(...modules[path])
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
