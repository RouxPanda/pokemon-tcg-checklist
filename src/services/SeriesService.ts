import { ApiResponse, CardCondition, CardInCollection, Collection, PokemonCard } from "@/models/PokemonCard";
import { useStore } from '@/store';
/**
 * Récupère les cartes d'une collection
 */
export const SeriesService = {
  async fetchCollections(): Promise<Collection[]> {
    try {
      const response = await fetch('https://api.pokemontcg.io/v2/sets'); // Remplacez l'URL par votre URL d'API
      const data: ApiResponse<Collection[]> = await response.json();
  
      if (data && data.data && data.data.length > 0) {
        return data.data.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      } else {
        throw new Error("La réponse de l'API ne contient pas de données de collection.");
      }
    } catch (error) {
      throw new Error('Erreur lors de la récupération des collections :'+ error);
    }
  },

  async fetchCollectionById(id:string) : Promise<Collection> {
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/sets/${id}`); // Remplacez l'URL par votre URL d'API
      const data: ApiResponse<Collection> = await response.json();
  
      if (data && data.data) {
        return data.data;
      } else {
        throw new Error("La réponse de l'API ne contient pas de données de collection.");
      }
    } catch (error) {
      throw new Error('Erreur lors de la récupération des collections :'+ error);
    }
  },

  async calculateCompletionPercentage(seriesId: string) {
    const store = useStore();
    const series = await this.fetchCollectionById(seriesId); // Remplacez par la méthode réelle de votre store
    if (!series) {
      console.error('Série non trouvée dans le store.');
      return null;
    }

    const totalCardsInSeries = series.total; // Remplacez par la propriété réelle dans votre objet série
    const totalCardsInCollection = store.cards[seriesId].length; // Remplacez par la méthode réelle de votre store

    if (totalCardsInSeries === 0) {
      console.error('Le nombre total de cartes dans la série est incorrect.');
      return null;
    }

    const completionPercentage = (totalCardsInCollection / totalCardsInSeries) * 100;
    return completionPercentage.toFixed(2); // Retourne le pourcentage avec deux décimales
  }
}
