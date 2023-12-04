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

import type { ApiResponse, Collection } from '@/models/PokemonCard';
const collections = ref<Collection[]>([]);
const collectionsBySeries = ref<Record<string, Collection[]>>({});

const fetchCollections = async () => {
  try {
    const response = await fetch('https://api.pokemontcg.io/v2/sets'); // Remplacez l'URL par votre URL d'API
    const data: ApiResponse<Collection> = await response.json();

    if (data && data.data && data.data.length > 0) {
      let collectionsBrut = data.data.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      let truc: Record<string, Collection[]> = {};
      collectionsBrut.forEach(collection => {
        if (!truc[collection.series]) {
          truc[collection.series] = [];
        }
        truc[collection.series].push(collection);
      });
      collectionsBySeries.value = truc
    } else {
      console.warn("La réponse de l'API ne contient pas de données de collection.");
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des collections :', error);
  }
}

onMounted(fetchCollections);
</script>

<style>
/* Styles pour la mise en page */
</style>
