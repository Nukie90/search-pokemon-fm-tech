import React from 'react';
import { PokemonData } from "@/types/pokemon_type";

interface PokemonHeaderProps {
    name: string;
    number: string;
}

export const PokemonHeader = React.memo(({ name, number }: PokemonHeaderProps) => (
    <div className="flex flex-col items-center mb-6">
        <span className="text-gray-400 font-mono text-xl mb-1">#{number}</span>
        <h2 className="text-5xl font-black text-gray-900 capitalize tracking-tighter">
            {name}
        </h2>
    </div>
));

interface PokemonImageProps {
    image: string;
    name: string;
}

export const PokemonImage = React.memo(({ image, name }: PokemonImageProps) => (
    <div className="relative group">
        <div className="absolute -inset-4 bg-blue-400 opacity-20 blur-3xl group-hover:opacity-30 transition-opacity rounded-full"></div>
        <img
            src={image}
            alt={name}
            className="relative w-64 h-64 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-500 ease-out"
        />
    </div>
));

interface PokemonTypesProps {
    types: string[];
}

export const PokemonTypes = React.memo(({ types }: PokemonTypesProps) => (
    <div className="flex gap-3 mb-8">
        {types.map(type => (
            <span
                key={type}
                className="px-5 py-2 bg-white text-blue-600 rounded-2xl shadow-sm border border-blue-100 text-sm font-bold uppercase tracking-widest"
            >
                {type}
            </span>
        ))}
    </div>
));

interface PokemonStatsProps {
    classification: string;
}

export const PokemonStats = React.memo(({ classification }: PokemonStatsProps) => (
    <div className="flex flex-col items-center gap-4 mt-8">
        <h3 className="text-2xl font-bold text-gray-900">Classification</h3>
        <p className="px-5 py-2 bg-white text-blue-600 rounded-2xl shadow-sm border border-blue-100 text-sm font-bold uppercase tracking-widest">
            {classification}
        </p>
    </div>
));

interface PokemonAttacksProps {
    attacks: PokemonData['pokemon']['attacks'];
}

export const PokemonAttacks = React.memo(({ attacks }: PokemonAttacksProps) => (
    <div className="flex gap-4 mt-12">
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-100 pb-2">Fast Attacks</h3>
            <div className="flex flex-col items-center gap-2">
                {attacks?.fast?.map((attack) => (
                    <div
                        key={attack.name}
                        className="px-5 py-2 bg-white text-blue-600 rounded-2xl shadow-sm border border-blue-100 text-sm font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors"
                    >
                        {attack.name} - {attack.type} ({attack.damage})
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-100 pb-2">Special Attacks</h3>
            <div className="flex flex-col items-center gap-2">
                {attacks?.special?.map((attack) => (
                    <div
                        key={attack.name}
                        className="px-5 py-2 bg-white text-blue-600 rounded-2xl shadow-sm border border-blue-100 text-sm font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors"
                    >
                        {attack.name} - {attack.type} ({attack.damage})
                    </div>
                ))}
            </div>
        </div>
    </div>
));

interface PokemonEvolutionsProps {
    evolutions: PokemonData['pokemon']['evolutions'];
}

export const PokemonEvolutions = React.memo(({ evolutions }: PokemonEvolutionsProps) => {
    if (!evolutions || evolutions.length === 0) return null;
    return (
        <div className="flex flex-col items-center gap-4 mt-12">
            <h3 className="text-2xl font-bold text-gray-900">Evolutions</h3>
            <div className="flex gap-4">
                {evolutions.map((evolution) => (
                    <div key={evolution.id} className="flex flex-col items-center gap-2">
                        <img
                            src={evolution.image}
                            alt={evolution.name}
                            className="w-32 h-32 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                        />
                        <span className="text-gray-400 font-mono text-xl mb-1">#{evolution.number}</span>
                        <h3 className="text-2xl font-bold text-gray-900 capitalize tracking-tighter">
                            {evolution.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
});

interface PokemonPhysicalStatsProps {
    height: PokemonData['pokemon']['height'];
    weight: PokemonData['pokemon']['weight'];
}

export const PokemonPhysicalStats = React.memo(({ height, weight }: PokemonPhysicalStatsProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Physical Stats</h3>
        <div className="space-y-3">
            <div className="flex flex-col">
                <span className="text-gray-500">Height</span>
                <span className="font-mono font-bold text-gray-900">{height.minimum} - {height.maximum}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-gray-500">Weight</span>
                <span className="font-mono font-bold text-gray-900">{weight.minimum} - {weight.maximum}</span>
            </div>
        </div>
    </div>
));

interface PokemonCombatStatsProps {
    maxCP: number;
    maxHP: number;
    fleeRate: number;
}

export const PokemonCombatStats = React.memo(({ maxCP, maxHP, fleeRate }: PokemonCombatStatsProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Combat Stats</h3>
        <div className="space-y-3">
            <div className="flex justify-between">
                <span className="text-gray-500">Max CP</span>
                <span className="font-mono font-bold text-blue-600">{maxCP}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Max HP</span>
                <span className="font-mono font-bold text-green-600">{maxHP}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Flee Rate</span>
                <span className="font-mono font-bold text-red-500">{fleeRate}</span>
            </div>
        </div>
    </div>
));

interface PokemonResistancesProps {
    resistant: string[];
    weaknesses: string[];
}

export const PokemonResistances = React.memo(({ resistant, weaknesses }: PokemonResistancesProps) => (
    <div className="w-full space-y-6">
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 ml-2">Resistant To</h3>
            <div className="flex flex-wrap gap-2">
                {resistant.map((type) => (
                    <span key={type} className="px-4 py-1.5 bg-green-100 text-green-700 rounded-xl text-sm font-semibold border border-green-200">
                        {type}
                    </span>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 ml-2">Weak Against</h3>
            <div className="flex flex-wrap gap-2">
                {weaknesses.map((type) => (
                    <span key={type} className="px-4 py-1.5 bg-red-100 text-red-700 rounded-xl text-sm font-semibold border border-red-200">
                        {type}
                    </span>
                ))}
            </div>
        </div>
    </div>
));
