<script setup lang="ts">
  import { useStore } from '@/store'
  const store = useStore();

const route = useRoute()

useHead({
  title: () => route.meta.title || 'Ntm darmanin',
  meta: [
    {
      property: 'og:title',
      content: () => route.meta.title,
    },
    {
      name: 'twitter:title',
      content: () => route.meta.title,
    },
  ],
})

//const VERSION = import.meta.env.VITE_APP_VERSION
const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined
const thisYear = new Date().getFullYear()
</script>
<template>
  <div :class="{ 'dark': store.isDarkTheme }" class="relative py-8">
    <div
      class="absolute inset-0 bg-[url(/img/grid.svg)] bg-top dark:bg-black [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div
      class="container relative mx-auto bg-white dark:bg-slate-800 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
    >
    
      <header class="px-4 pt-6 prose-sm md:px-6 md:prose">
        <router-link to="/">
          <h1>Pokemon Card list</h1>
        </router-link>
        <button @click="store.toggleTheme">Basculer le thème</button>
        <div>{{ store.isDarkTheme }}</div>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <footer class="py-6 text-sm text-center text-gray-700 dark:text-white">
        <p>
          Vite-ts-tailwind-starter by
          <a class="underline" href="https://twitter.com/uninen">@Uninen</a> &copy; 2020-{{
            thisYear
          }}.
          <template v-if="BUILD_DATE"> Site built {{ BUILD_DATE.toLocaleDateString() }}. </template>
          <template v-else> Development mode. </template>
        </p>
      </footer>
    </div>
  </div>
</template>
