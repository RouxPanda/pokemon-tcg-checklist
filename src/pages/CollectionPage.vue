<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { PokemonCard, ApiResponse, CardInCollection } from '@/models/PokemonCard';
  import { CardCondition } from '@/models/PokemonCard';
  import { useStore } from '@/store';

  const store = useStore();
  const route = useRoute()
  const cards = ref<PokemonCard[]>([]);
  const conditionSelected = ref<CardCondition>(CardCondition.NearMint);
  const isLoading = ref(true);
  const collectionId = route.params.collectionId;
  const cardConditions: CardCondition[] = [
    CardCondition.NearMint,
    CardCondition.LightlyPlayed,
    CardCondition.ModeratelyPlayed,
    CardCondition.HeavilyPlayed,
    CardCondition.Damaged,
    CardCondition.Played,
  ];

  const fetchCards = async () => {
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${collectionId}`);
      const data: ApiResponse<PokemonCard> = await response.json();

      if (data.data && data.data.length > 0) {
        cards.value = data.data.sort((a, b) => a.number - b.number);
        cards.value = data.data.map(card => ({ ...card, quantity: cardStoreCard(card.id).quantity }));
      } else {
        console.warn('La réponse de l\'API ne contient pas de données.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes :', error);
    } finally {
      isLoading.value = false; // Met fin à l'état de chargement, que la requête ait réussi ou échoué
    }
  };
  const incrementStock = (card: PokemonCard) => {
    card.quantity += 1;
    store.updateCardStock(card.id, card.quantity, conditionSelected.value);
  };

  const decrementStock = (card: PokemonCard) => {
    if (card.quantity > 0) {
      card.quantity -= 1;
      store.updateCardStock(card.id, card.quantity, conditionSelected.value);
    }
  };
  
  const updateCondition = (event: any) => {
    conditionSelected.value = event.target.value;
  };
  onMounted(fetchCards);

  const cardStoreCard = (id: string): CardInCollection => store.cards.find(card => card.id === id) || { id, quantity: 0, condition: CardCondition.NearMint };
</script>

<template>
  <div class="p-4 mx-auto md:px-6 sm:rounded-md">
    <!-- Afficher le loader si la requête est en cours -->
    <div v-if="isLoading">Chargement en cours...</div>

    <div class="relative">
      <select v-model="conditionSelected" @change="updateCondition($event)">
        <option v-for="condition in cardConditions" :key="condition" :value="condition">{{ condition }}</option>
      </select>
      <span class="absolute right-2 top-0 bottom-0 flex items-center pointer-events-none">
        <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
        </svg>
      </span>
    </div>

    <!-- Afficher la liste des cartes si elle n'est pas vide -->
    <div v-if="!isLoading && cards.length > 0" class="grid grid-cols-5 gap-4">
      <div v-for="card in cards" :key="card.id" class="bg-white dark:bg-black p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">{{ card.name }}</h3>
        <img :src="card.images.small" alt="Card Image" class="mb-2 w-full object-cover" />
        <p class="text-sm text-gray-600">{{ card.cardmarket.prices.averageSellPrice }} $</p>
        <div class="flex justify-between items-center mt-2">
          <button @click="incrementStock(card)">+</button>
          <span>{{ card.quantity }}</span>
          <button @click="decrementStock(card)">-</button>
        </div>
      </div>
    </div>
  </div>
</template>
