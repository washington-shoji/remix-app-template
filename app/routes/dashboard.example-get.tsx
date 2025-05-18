import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigation, Link, useSearchParams } from '@remix-run/react';
import * as pokemonService from '~/services/pokemon.server';
import type { Pokemon, PokemonListResponse } from '~/types/pokemon';

/**
 * Loader function that fetches data server-side
 * This is called before the component renders
 * 
 * Key concepts demonstrated:
 * 1. URL parameter handling
 * 2. Error handling
 * 3. Data transformation
 * 4. Type safety
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // Get page and selected Pokemon from URL search params
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') || '1');
  const selectedPokemonId = url.searchParams.get('pokemon') || '1';
  const limit = 12;
  const offset = (page - 1) * limit;

  try {
    // Fetch Pokemon list and selected Pokemon's details in parallel
    const [listResponse, selectedPokemon] = await Promise.all([
      pokemonService.getPokemonList(limit, offset),
      pokemonService.getPokemonDetails(Number(selectedPokemonId))
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(listResponse.count / limit);

    // Return JSON response with type safety
    return json({
      pokemonList: listResponse,
      featuredPokemon: selectedPokemon,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    // Handle errors appropriately
    console.error('Failed to load Pokemon data:', error);
    throw new Response('Failed to load Pokemon data', { status: 500 });
  }
}

/**
 * Example component demonstrating:
 * 1. Using loader data with type safety
 * 2. Loading states
 * 3. Error boundaries
 * 4. Pagination
 * 5. Responsive design
 */
export default function DashboardExampleGet() {
  const {
    pokemonList,
    featuredPokemon,
    pagination
  } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  // Function to preserve current page when selecting a Pokemon
  const getSelectedPokemonUrl = (pokemonId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('pokemon', pokemonId);
    return `?${newSearchParams.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Pokemon API Example
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {pokemonList.results.length} of {pokemonList.count} Pokemon
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
        </div>
      </div>

      {/* Featured Pokemon Card */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Featured Pokemon</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            #{featuredPokemon.id}
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={featuredPokemon.sprites.front_default}
              alt={featuredPokemon.name}
              className="w-32 h-32 object-contain bg-gray-50 rounded-lg dark:bg-gray-700"
            />
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium dark:text-white">
                  {featuredPokemon.height / 10}m
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold capitalize mb-2 dark:text-white">
              {featuredPokemon.name}
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                {featuredPokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Weight: {featuredPokemon.weight / 10}kg
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pokemon List */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-6 dark:text-white">Pokemon List</h2>
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${isLoading ? 'opacity-50' : ''}`}>
          {pokemonList.results.map((pokemon) => {
            const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
            const isSelected = pokemonId === searchParams.get('pokemon');
            return (
              <Link
                key={pokemon.name}
                to={getSelectedPokemonUrl(pokemonId!)}
                className={`p-4 border rounded-lg transition-all dark:border-gray-700 group ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">#{pokemonId}</div>
                  <p className={`text-lg font-medium capitalize ${
                    isSelected
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`}>
                    {pokemon.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <Link
            to={`?page=${pagination.currentPage - 1}${searchParams.get('pokemon') ? `&pokemon=${searchParams.get('pokemon')}` : ''}`}
            className={`px-4 py-2 rounded-lg ${
              pagination.hasPrevPage
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            } transition-colors`}
            aria-disabled={!pagination.hasPrevPage}
          >
            ← Previous
          </Link>
          <div className="text-sm font-medium dark:text-white">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <Link
            to={`?page=${pagination.currentPage + 1}${searchParams.get('pokemon') ? `&pokemon=${searchParams.get('pokemon')}` : ''}`}
            className={`px-4 py-2 rounded-lg ${
              pagination.hasNextPage
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            } transition-colors`}
            aria-disabled={!pagination.hasNextPage}
          >
            Next →
          </Link>
        </div>
      </div>
    </div>
  );
}