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
    cards: [] as CardInCollection[],
  }),

  actions: {
    initApp() {
      this.isInitialized = true
      this.cards = JSON.parse(localStorage.getItem('cards') || '[]');
      console.log(this.cards)
    },

    increment(value = 1) {
      this.count += value
    },

    goToDemo(event: Event) {
      event.preventDefault()
      this.router.push('/demo/')
    },

    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },

    addCard(card: CardInCollection) {
      this.cards.push(card);
    },

    updateCardStock(id: string, quantity: number, condition: CardCondition) {
      const cardIndex = this.cards.findIndex(card => card.id === id);
      if (cardIndex !== -1) {
        this.cards[cardIndex].quantity = quantity;
        this.cards[cardIndex].condition = condition;
      } else {
        this.cards.push({ id, quantity: quantity, condition: condition } as CardInCollection)
      }
      localStorage.setItem('cards', JSON.stringify(this.cards))
    },
  },

  getters: {
    isReady: (state) => {
      return !state.isInitialized
    },
  },
})
