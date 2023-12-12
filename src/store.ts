import { defineStore } from 'pinia'
import type { CardInCollection } from '@/models/PokemonCard';
import { CardCondition } from '@/models/PokemonCard';

const versionString =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_VERSION + '-dev'
    : import.meta.env.VITE_APP_VERSION

export const useStore = defineStore('main', {
  state: () => ({
    debug: import.meta.env.MODE === 'development',
    version: versionString,
    isInitialized: false,
    isDarkTheme: false,
    cards: {} as Record<string, CardInCollection[]>,
  }),

  actions: {
    initApp() {
      this.isInitialized = true
      var local: string | null = "";
      if (local = localStorage.getItem('cards'))
      {
        this.cards = JSON.parse(local);
      }
      console.log(this.cards)
    },

    goToDemo(event: Event) {
      event.preventDefault()
      this.router.push('/demo/')
    },

    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },

    updateCardStock(collectionKey: string, id: string, quantity: number, condition: CardCondition, rarity: string) {
      // Vérifier si la clé de collection existe déjà
      if (!this.cards[collectionKey]) {
        this.cards[collectionKey] = [];
      }
    
      // Rechercher la carte dans le tableau correspondant à la clé de collection
      const cardIndex = this.cards[collectionKey].findIndex(card => card.id === id && card.rarity == rarity);
    
      if (cardIndex !== -1) {
        var card = this.cards[collectionKey][cardIndex].stock.find(card => card.condition == condition);
        if (card) {
          // Mettre à jour la carte existante
          card.quantity = quantity;
        } else {
          this.cards[collectionKey][cardIndex].stock.push({quantity, condition})
        }
      } else {
        // Ajouter une nouvelle carte à la collection
        this.cards[collectionKey].push({ id:id, rarity:rarity, stock:[{quantity, condition}] });
      }
    
      // Enregistrer les modifications dans le stockage local
      localStorage.setItem('cards', JSON.stringify(this.cards));
      console.log(this.cards);
    },
  },

  getters: {
    isReady: (state) => {
      return !state.isInitialized
    },

    getUsersSeries: (state) :string[] => {
      return Object.keys(state.cards);
    },

    getCard: (state) => {
      return (colectionId: string, cardId: string, rarity: string) => state.cards[colectionId] ? state.cards[colectionId].find((card) => card.id == cardId && card.rarity == rarity) : null;
    },

    getQuantity: (state) => {
      return (colectionId: string, cardId: string, rarity: string) =>
        state.cards[colectionId]
          ? state.cards[colectionId].find((card) => card.id == cardId && card.rarity == rarity)?.stock.reduce((total, stock) => {
                return total + stock.quantity;
            }, 0)
          : 0;
    },

    getStock: (state) => {
      return (colectionId: string, cardId: string, rarity: string, condition: CardCondition) => {
        const collection = state.cards[colectionId];
        const card = collection?.find((card) => card.id == cardId && card.rarity == rarity);
        const stock = card?.stock;

        return stock?.find(s => s.condition == condition) || null;
      };
    },
  },
})
