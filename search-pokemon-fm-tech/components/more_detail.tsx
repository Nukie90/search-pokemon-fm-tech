import { PokemonData } from "@/types/pokemon_type";
import {
    PokemonHeader,
    PokemonTypes,
    PokemonImage,
    PokemonStats,
    PokemonPhysicalStats,
    PokemonCombatStats,
    PokemonResistances,
} from "./pokemon_parts";

interface MoreDetailProps {
    readonly data: PokemonData | undefined;
    readonly loading: boolean;
    readonly error: Error | undefined;
}

export function MoreDetail({ data, loading, error }: MoreDetailProps) {

    if (loading) return (
        <div className="flex flex-col items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 animate-pulse">Loading detailed stats...</p>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-center">
            <p className="font-bold">Error Occurred</p>
            <p className="text-sm">{error.message}</p>
        </div>
    );

    if (!data?.pokemon) return (
        <div className="text-center py-8 text-gray-400 italic">
            No Pokemon found with that name.
        </div>
    );

    return (
        <div className="flex flex-col items-center bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 shadow-inner w-full transform transition-all hover:shadow-xl">
            <PokemonHeader name={data.pokemon.name} number={data.pokemon.number} />
            <PokemonTypes types={data.pokemon.types} />
            <PokemonImage image={data.pokemon.image} name={data.pokemon.name} />
            <PokemonStats classification={data.pokemon.classification} />

            <div className="grid grid-cols-2 gap-8 w-full mb-8 mt-8">
                <PokemonPhysicalStats height={data.pokemon.height} weight={data.pokemon.weight} />
                <PokemonCombatStats
                    maxCP={data.pokemon.maxCP}
                    maxHP={data.pokemon.maxHP}
                    fleeRate={data.pokemon.fleeRate}
                />
            </div>

            <PokemonResistances
                resistant={data.pokemon.resistant}
                weaknesses={data.pokemon.weaknesses}
            />
        </div>
    );
}