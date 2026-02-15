import { client } from "../graphql/apollo_client";
import { GET_POKEMON } from "../graphql/queries";
import { PokemonData } from "../types/pokemon_type";
import fetch from "cross-fetch";

// Setup global fetch for Apollo Client to work in Node environment
if (!global.fetch) {
    global.fetch = fetch as any;
}

describe("Pokemon GraphQL Integration Tests", () => {
    // Increase timeout for network requests
    jest.setTimeout(15000);

    test("Successfully fetches Bulbasaur and verifies types", async () => {
        const { data } = await client.query<PokemonData>({
            query: GET_POKEMON,
            variables: { name: "Bulbasaur" }
        });

        expect(data.pokemon).toBeDefined();
        expect(data.pokemon.name).toBe("Bulbasaur");
        expect(data.pokemon.types).toContain("Grass");
        expect(data.pokemon.types).toContain("Poison");
    });

    test("Successfully fetches Charmander and verifies type", async () => {
        const { data } = await client.query<PokemonData>({
            query: GET_POKEMON,
            variables: { name: "Charmander" }
        });

        expect(data.pokemon).toBeDefined();
        expect(data.pokemon.name).toBe("Charmander");
        expect(data.pokemon.types).toContain("Fire");
    });

    test("Successfully fetches Squirtle and verifies type", async () => {
        const { data } = await client.query<PokemonData>({
            query: GET_POKEMON,
            variables: { name: "Squirtle" }
        });

        expect(data.pokemon).toBeDefined();
        expect(data.pokemon.name).toBe("Squirtle");
        expect(data.pokemon.types).toContain("Water");
    });

    test("Returns null for non-existent Pokemon", async () => {
        const { data } = await client.query<PokemonData>({
            query: GET_POKEMON,
            variables: { name: "Hello" }
        });

        expect(data.pokemon).toBeNull();
    });
});
