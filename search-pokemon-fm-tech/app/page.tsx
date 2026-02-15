"use client";

import { ApolloClientProvider } from "@/graphql/apollo_provider";
import { SearchPokemon } from "@/components/pokemon_detail";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MoreDetail } from "@/components/more_detail";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON } from "@/graphql/queries";
import { PokemonData } from "@/types/pokemon_type";

interface PokemonVars {
  name: string;
}

function MainContent() {
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const { data, loading, error } = useQuery<PokemonData, PokemonVars>(GET_POKEMON, {
    variables: { name: name || "" },
    skip: !name,
  });

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      setSearch(lastSearch);
    }
  }, []);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDetail(false);
    if (search.trim()) {
      localStorage.setItem("lastSearch", search);
      router.push(`/?name=${search}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br text-gray-900">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Pokemon Search
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Find your favorite Pokemon and explore their stats.
        </p>

        <div className="w-full flex flex-col items-center gap-6">
          <form onSubmit={handleSubmit} className="w-full flex gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Pokemon (e.g., pikachu)..."
              className="flex-1 border-2 border-gray-200 rounded-2xl px-6 py-3 focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder:text-gray-400 text-lg shadow-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            >
              Search
            </button>
          </form>

          <div className="w-full mt-10">
            {detail ? (
              <MoreDetail data={data} loading={loading} error={error} />
            ) : (
              <SearchPokemon data={data} loading={loading} error={error} />
            )}
          </div>

          {detail ? (
            <button
              onClick={() => setDetail(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            >
              Back
            </button>
          ) : (
            <button
              onClick={() => setDetail(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            >
              More Detail
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <ApolloClientProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
        <MainContent />
      </Suspense>
    </ApolloClientProvider>
  );
}
