import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/vueUse/ProductsView.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/vueUse/ProductView.vue'),
    },
    {
      path: '/productsWithoutVueUse',
      name: 'productsWithoutVueUse',
      component: () => import('@/views/withoutVueUse/ProductsWithoutVueUseView.vue'),
    },
    {
      path: '/productWithoutVueUse/:id',
      name: 'productWithoutVueUse',
      component: () => import('@/views/withoutVueUse/ProductWithoutVueUseView.vue'),
    },
  ],
})

export default router
