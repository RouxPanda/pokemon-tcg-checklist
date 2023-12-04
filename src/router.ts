import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import SeriesPage from '@/pages/SeriesPage.vue'
import CollectionPage from '@/pages/CollectionPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'Ntm darmanin',
    },
  },
  { 
    path: '/series', 
    component: SeriesPage 
  },
  { 
    path: '/collection/:collectionId', 
    name: 'Collection', 
    component: CollectionPage 
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
