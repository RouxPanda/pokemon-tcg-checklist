<script setup lang="ts">
  import { Collection } from '@/models/PokemonCard';
  import { useStore } from '@/store';
  import { SeriesService } from '@/services/SeriesService'

  const store = useStore();
  const userSeries = ref<Collection[]>([]);
  
  const fetchSeriesFromApi = async () => {
    try {
      for (const id of store.getUsersSeries) {
        console.log(id)
        var serie = await SeriesService.fetchCollectionById(id);
        if (serie) {
          userSeries.value.push(serie);
        }
        calculateCompletionPercentage();
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la série depuis l\'API', error);
      return null;
    }
  };

  const onInit = () => {
    fetchSeriesFromApi();
  };


  const calculateCompletionPercentage = () => {
    userSeries.value.forEach(serie => {
      const totalCardsInSeries = serie.total; // Remplacez par la propriété réelle dans votre objet série
      const totalCardsInCollection = store.cards[serie.id].length; // Remplacez par la méthode réelle de votre store

      if (totalCardsInSeries === 0) {
        console.error('Le nombre total de cartes dans la série est incorrect.');
      }

      serie.percentage = (totalCardsInCollection / totalCardsInSeries) * 100;
    });
  }
  onMounted(onInit)
</script>

<template>
  <div class="p-4 mx-auto md:px-6 sm:rounded-md">
    <h1 class="text-3xl font-bold mb-4">Votre Nom de Site</h1>

    <!-- Section des séries en cours -->
    <div v-if="userSeries.length > 0">
      <h2 class="text-xl font-semibold mb-2">Vos Séries en Cours</h2>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="serie in userSeries" :key="serie.id" class="bg-white p-4 rounded shadow">
          <router-link :to="{ name: 'Collection', params: { collectionId: serie.id } }">
            <div class="flex flex-col items-center">
              <img :src="serie.images.logo" alt="Collection Logo" class="h-16 mb-2" />
              <h3 class="text-lg font-semibold text-center">{{ serie.name }}</h3>
              <h3 v-if="serie.percentage" class="text-lg text-center">{{ serie.percentage.toFixed(0) }}%</h3>
              <ProgressBar :completion-percentage="serie.percentage" />
            </div>
          </router-link>
        </div>
      </div>
      <router-link :to="'series'">
        <button class="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
          Explorer d'autres séries
        </button>
      </router-link>
    </div>

    <!-- Sélection aléatoire de séries pour habiller -->
    <!-- <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">Séries pour Habiller</h2>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="randomSeries in randomSeriesList" :key="randomSeries.id" class="bg-white p-4 rounded shadow">
          <h3 class="text-lg font-semibold mb-2">{{ randomSeries.name }}</h3>
          Autres informations sur la série si nécessaire 
        </div>
      </div>
    </div> -->
  </div>
</template>
