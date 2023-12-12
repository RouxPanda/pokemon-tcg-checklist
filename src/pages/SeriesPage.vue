<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Sélectionner une Collection Pokémon</h1>
  
      <div v-for="(collections, series) in collectionsBySeries" :key="series">
        <h2 class="text-xl font-semibold mb-2">{{ series }} Collections</h2>

        <div class="grid grid-cols-5 gap-4">
          <div v-for="collection in collections" :key="collection.id" class="bg-gray-100 p-4 mb-4 rounded shadow">
            <router-link :to="{ name: 'Collection', params: { collectionId: collection.id } }">
              <div class="flex flex-col items-center">
                <img :src="collection.images.logo" alt="Collection Logo" class="h-16 mb-2" />
                <h3 class="text-lg font-semibold text-center">{{ collection.name }}</h3>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">

import type { Collection } from '@/models/PokemonCard';
import {SeriesService} from '@/services/SeriesService';

const collections = ref<Collection[]>([]);
const collectionsBySeries = ref<Record<string, Collection[]>>({});

const fetchCollections = async () => {
  try {
    let temp: Record<string, Collection[]> = {};
    collections.value = await SeriesService.fetchCollections();
    collections.value.forEach(collection => {
      if (!temp[collection.series]) {
        temp[collection.series] = [];
      }
      temp[collection.series].push(collection);
    });
    collectionsBySeries.value = temp;
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchCollections);
</script>

<style>
/* Styles pour la mise en page */
</style>
