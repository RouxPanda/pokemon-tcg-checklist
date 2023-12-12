import { ApiResponse, CardCondition, CardInCollection, PokemonCard } from "@/models/PokemonCard";
import { useStore } from '@/store';

/**
 * Récupère les cartes d'une collection
 */
export const CollectionService = {
  async fetchCards (idCollection:string): Promise<PokemonCard[]> {
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${idCollection}`);
      const data: ApiResponse<PokemonCard[]> = await response.json();

      if (data.data && data.data.length > 0) {
        return data.data;
      } else {
        throw new Error('La réponse de l\'API ne contient pas de données.');
      }
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cartes :'+ error);
    }
  }
}