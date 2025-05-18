import { Pokemon, PokemonListResponse } from '~/types/pokemon';

/**
 * Base URL for the PokeAPI
 */
const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches a list of Pokemon with pagination
 * @param limit Number of Pokemon to fetch
 * @param offset Starting position
 * @returns Promise<PokemonListResponse>
 * @throws Error if the API call fails
 */
export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches detailed information about a specific Pokemon
 * @param nameOrId The name or ID of the Pokemon
 * @returns Promise<Pokemon>
 * @throws Error if the API call fails
 */
export async function getPokemonDetails(
  nameOrId: string | number
): Promise<Pokemon> {
  const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${response.statusText}`);
  }

  return response.json();
} 