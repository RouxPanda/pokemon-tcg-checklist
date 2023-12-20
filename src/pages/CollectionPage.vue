<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { PokemonCard } from '@/models/PokemonCard';
  import { CardCondition } from '@/models/PokemonCard';
  import { useStore } from '@/store';
  import { CollectionService } from '@/services/CollectionService'

  const store = useStore();
  const route = useRoute()
  const cards = ref<PokemonCard[]>([]);
  const filteredCards = ref<PokemonCard[]>([]);
  const conditionSelected = ref<CardCondition>(CardCondition.NearMint);
  const isLoading = ref(true);
  const raritiesFilter = ref<Record<string, boolean>>({});
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
    isLoading.value = true;
    try {
      cards.value = await CollectionService.fetchCards(collectionId.toString());
      raritiesFilter.value = getUniqueRarities();
      filteredCards.value = cards.value
    } catch (err) {
      console.error(err);
    }
    finally {
      isLoading.value = false;
    }
  };

  const incrementStock = (card: PokemonCard, collectionId: string, rarity: string) => {
    var cardInStore = store.getStock(collectionId.toString(), card.id, rarity, conditionSelected.value);
    store.updateCardStock(collectionId, card.id, cardInStore ? cardInStore.quantity+1 : 1, conditionSelected.value, rarity);
  };

  const decrementStock = (card: PokemonCard, collectionId: string, rarity: string) => {
    var cardInStore = store.getStock(collectionId.toString(), card.id, rarity, conditionSelected.value);
    if (card.quantity > 0) {
      store.updateCardStock(collectionId, card.id, cardInStore ? cardInStore.quantity-1 : 0, conditionSelected.value, rarity);
    }
  };
  
  const updateCondition = (event: any) => {
    conditionSelected.value = event.target.value;
  };

  const getUniqueRarities = (): Record<string, boolean> => {
    // Créer un Set pour stocker les raretés uniques
    const uniqueRarities = {} as Record<string, boolean>;

    // Parcourir les cartes pour ajouter les raretés au Set
    cards.value.forEach(card => {
      uniqueRarities[card.rarity] = true;
    });

    // Convertir le Set en tableau
    return uniqueRarities;
  };

  const updateRarityFilter = () => {
    // Filtrer la liste originale sans la modifier
    filteredCards.value = cards.value.filter(card => raritiesFilter.value[card.rarity]);
  };

  const selectAllRarities = () => {
    // Sélectionner toutes les raretés
    Object.keys(raritiesFilter.value).forEach(rarity => raritiesFilter.value[rarity] = true);
    updateRarityFilter();
  };

  const deselectAllRarities = () => {
    // Désélectionner toutes les raretés
    Object.keys(raritiesFilter.value).forEach(rarity => raritiesFilter.value[rarity] = false);
    updateRarityFilter();
  };

  onMounted(fetchCards);

  const reset = () => {
    localStorage.clear();
    console.log("clear done");
  };
</script>

<template>
  <div class="p-4 mx-auto md:px-6 sm:rounded-md">
    <!-- Afficher le loader si la requête est en cours -->
    <div v-if="isLoading">Chargement en cours...</div>
    <button v-on:click="reset" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      reset
    </button>
    <div class="relative">
      <select v-model="conditionSelected" @change="updateCondition($event)">
        <option v-for="condition in cardConditions" :key="condition" :value="condition">{{ condition }}</option>
      </select>
      <!-- <span class="absolute right-2 top-0 bottom-0 flex items-center pointer-events-none">
        <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
        </svg>
      </span> -->
    </div>

    <!-- Filtrer par rareté -->
    <div v-if="!isLoading && cards.length > 0" class="mt-4">
      <img :src="cards[0].set.images.logo" alt="Collection Logo" class="h-32 mx-auto mb-2" />
      <label class="block font-medium text-gray-700">Filtrer par rareté :</label>
      <div class="flex space-x-4 mt-2">
        <!-- Bouton pour tout sélectionner -->
        <button @click="selectAllRarities" class="text-blue-500 hover:underline focus:outline-none">
          Tout sélectionner
        </button>
        <!-- Bouton pour tout désélectionner -->
        <button @click="deselectAllRarities" class="text-blue-500 hover:underline focus:outline-none">
          Tout désélectionner
        </button>
        <label v-for="(isChecked, rarity) in raritiesFilter" :key="rarity" class="flex items-center">
          <input
            type="checkbox"
            v-model="raritiesFilter[rarity]"
            class="form-checkbox text-blue-500"
            @change="updateRarityFilter"
          />
          <span class="ml-2">{{ rarity }}</span>
        </label>
      </div>
    </div>

    <!-- Afficher la liste des cartes si elle n'est pas vide -->
    <div v-if="!isLoading && filteredCards.length > 0" class="grid grid-cols-5 gap-4">
      <div v-for="card in filteredCards" :key="card.id" class="bg-white dark:bg-black p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">{{ card.name }}</h3>
        <img :src="card.images.small" alt="Card Image" class="mb-2 w-full object-cover" />
        <p class="text-sm text-gray-600">{{ card.cardmarket.prices.averageSellPrice }} $</p>
        
        <!-- Mention des différentes formes -->
        <div v-if="card.tcgplayer" v-for="(rarity, key) in card.tcgplayer.prices">
          <p class="text-sm" v-if="card.tcgplayer.prices[key]">Forme: {{key}}</p>
          <div v-if="card.tcgplayer.prices[key]" class="flex justify-between items-center mt-2">
            <button @click="incrementStock(card, collectionId.toString(), key)">+</button>
            <span>{{ store.getQuantity(collectionId.toString(), card.id, key) ?? 0 }}</span>
            <button @click="decrementStock(card, collectionId.toString(), key)">-</button>
          </div>
        </div>
        <div v-else class="flex justify-between items-center mt-2">
          <button @click="incrementStock(card, collectionId.toString(), 'unknow')">+</button>
          <span>{{ card.quantity }}</span>
          <button @click="decrementStock(card, collectionId.toString(), 'unknow')">-</button>
        </div>
      </div>
    </div>
  </div>
</template>
