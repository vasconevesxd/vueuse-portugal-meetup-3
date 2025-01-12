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
      component: () => import('@/views/ProductsView.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
    },
    {
      path: '/productsWithoutVueUse',
      name: 'productsWithoutVueUse',
      component: () => import('@/views/ProductsWithoutVueUseView.vue'),
    },
    {
      path: '/productWithoutVueUse/:id',
      name: 'productWithoutVueUse',
      component: () => import('@/views/ProductWithoutVueUseView.vue'),
    },
  ],
})

export default router
