export enum CardCondition {
    NearMint = 'Near Mint',
    LightlyPlayed = 'Lightly Played',
    ModeratelyPlayed = 'Moderately Played',
    HeavilyPlayed = 'Heavily Played',
    Damaged = 'Damaged',
    Played = 'Played',
}

// Modèle pour une attaque
interface Attack {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
}

// Modèle pour une faiblesse
interface Weakness {
    type: string;
    value: string;
}

// Modèle pour un ensemble
interface CardSet {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
        unlimited: string;
        expanded: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
        symbol: string;
        logo: string;
    };
}

// Modèle principal pour une carte
interface PokemonCard {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    types: string[];
    evolvesTo: string[];
    rules: string[];
    attacks: Attack[];
    weaknesses: Weakness[];
    retreatCost: string[];
    convertedRetreatCost: number;
    set: CardSet;
    number: number;
    artist: string;
    rarity: string;
    nationalPokedexNumbers: number[];
    quantity: number,
    legalities: {
        unlimited: string;
        expanded: string;
    };
    images: {
        small: string;
        large: string;
    };
    tcgplayer: {
        url: string;
        updatedAt: string;
        prices: {
            normal: {
                low: number;
                mid: number;
                high: number;
                market: number;
                directLow: number;
            };
            reverseHolofoil: {
                low: number;
                mid: number;
                high: number;
                market: number;
                directLow: number;
            };
            holofoil: {
                low: number;
                mid: number;
                high: number;
                market: number;
                directLow: number;
            };
        };
    };
    cardmarket: {
        url: string;
        updatedAt: string;
        prices: {
            averageSellPrice: number;	
            lowPrice: number;	
            trendPrice: number;	
            germanProL: number;
            suggestedPri: number;
            reverseHoloSell: number;
            reverseHoloLow: number;	
            reverseHoloTrend: number;	
            lowPriceExPlus: number;	
            avg1: number;	
            avg7: number;	
            avg30: number;	
            reverseHoloAvg1: number;	
            reverseHoloAvg7: number;	
            reverseHoloAvg30: number;
        };
    };
}

// Modèle pour la réponse API complète
interface ApiResponse<T> {
    data: T[];
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;
}

interface CardInCollection {
    id: string;
    quantity: number;
    condition: CardCondition;
}

interface Collection {
    id: string;
    name: string;
    series: string;
    printedTotal: number,
    total: number,
    legalities: {
        unlimited: string,
        standard: string,
        expanded: string
    },
    ptcgoCode: string
    releaseDate: string
    updatedAt: string
    images: {
      logo: string;
      symbol: string
    };
}

export type { PokemonCard, ApiResponse, CardInCollection, Collection };
