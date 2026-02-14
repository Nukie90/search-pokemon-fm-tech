export interface PokemonData {
    pokemon: {
        id: string;
        name: string;
        number: string;
        classification: string;
        types: string[];
        image: string;
        attacks: {
            fast: { name: string; type: string; damage: number }[];
            special: { name: string; type: string; damage: number }[];
        };
        evolutions: { id: string; name: string; number: string; image: string }[];
        weight: {
            minimum: string;
            maximum: string;
        };
        height: {
            minimum: string;
            maximum: string;
        };
        resistant: string[];
        weaknesses: string[];
        fleeRate: number;
        maxCP: number;
        maxHP: number;
    };
}