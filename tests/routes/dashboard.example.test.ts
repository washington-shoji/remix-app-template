import { test, expect, describe, vi, beforeEach } from 'vitest';
import { loader } from '../../app/routes/dashboard.example-get';
import * as pokemonService from '../../app/services/pokemon.server';

/**
 * Mock data for testing
 */
const mockPokemonList = {
  count: 1281,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const mockPokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
  ],
};

const mockPokemonDetails2 = {
  id: 2,
  name: 'ivysaur',
  height: 10,
  weight: 130,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
  ],
};

/**
 * Mock the Pokemon service functions
 */
vi.mock('../../app/services/pokemon.server', () => ({
  getPokemonList: vi.fn(),
  getPokemonDetails: vi.fn(),
}));

describe('Dashboard Example Route', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  test('loader returns correct data structure with default Pokemon', async () => {
    // Setup mocks
    vi.mocked(pokemonService.getPokemonList).mockResolvedValue(mockPokemonList);
    vi.mocked(pokemonService.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    // Create mock request
    const request = new Request('http://example.com/dashboard/example-get?page=1');

    // Call loader
    const response = await loader({ request, context: {}, params: {} });
    const data = await response.json();

    // Assert correct data structure
    expect(data).toEqual({
      pokemonList: mockPokemonList,
      featuredPokemon: mockPokemonDetails,
      pagination: {
        currentPage: 1,
        totalPages: 107,
        hasNextPage: true,
        hasPrevPage: false,
      },
    });

    // Verify correct Pokemon was fetched
    expect(pokemonService.getPokemonDetails).toHaveBeenCalledWith(1);
  });

  test('loader handles selected Pokemon', async () => {
    // Setup mocks
    vi.mocked(pokemonService.getPokemonList).mockResolvedValue(mockPokemonList);
    vi.mocked(pokemonService.getPokemonDetails).mockResolvedValue(mockPokemonDetails2);

    // Create mock request with selected Pokemon
    const request = new Request('http://example.com/dashboard/example-get?page=1&pokemon=2');

    // Call loader
    const response = await loader({ request, context: {}, params: {} });
    const data = await response.json();

    // Assert correct Pokemon was featured
    expect(data.featuredPokemon).toEqual(mockPokemonDetails2);
    expect(pokemonService.getPokemonDetails).toHaveBeenCalledWith(2);
  });

  test('loader handles pagination correctly', async () => {
    // Setup mocks
    vi.mocked(pokemonService.getPokemonList).mockResolvedValue(mockPokemonList);
    vi.mocked(pokemonService.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    // Test page 2 with selected Pokemon
    const request = new Request('http://example.com/dashboard/example-get?page=2&pokemon=1');
    const response = await loader({ request, context: {}, params: {} });
    const data = await response.json();

    // Assert pagination values
    expect(data.pagination).toEqual({
      currentPage: 2,
      totalPages: 107,
      hasNextPage: true,
      hasPrevPage: true,
    });

    // Verify correct offset was used
    expect(pokemonService.getPokemonList).toHaveBeenCalledWith(12, 12);
  });

  test('loader handles API errors', async () => {
    // Setup mock to throw error
    vi.mocked(pokemonService.getPokemonList).mockRejectedValue(new Error('API Error'));
    vi.mocked(pokemonService.getPokemonDetails).mockRejectedValue(new Error('API Error'));

    try {
      // Create mock request
      const request = new Request('http://example.com/dashboard/example?page=1');
      await loader({ request, context: {}, params: {} });
      throw new Error('Expected loader to throw');
    } catch (error) {
      const responseError = error as Response;
      expect(responseError).toBeInstanceOf(Response);
      expect(responseError.status).toBe(500);
      expect(await responseError.text()).toBe('Failed to load Pokemon data');
    }
  });

  test('loader uses default page 1 and Pokemon 1 when no params', async () => {
    // Setup mocks
    vi.mocked(pokemonService.getPokemonList).mockResolvedValue(mockPokemonList);
    vi.mocked(pokemonService.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    // Create mock request without params
    const request = new Request('http://example.com/dashboard/example');
    const response = await loader({ request, context: {}, params: {} });
    const data = await response.json();

    // Assert default values
    expect(data.pagination.currentPage).toBe(1);
    expect(data.featuredPokemon.id).toBe(1);
    expect(pokemonService.getPokemonList).toHaveBeenCalledWith(12, 0);
    expect(pokemonService.getPokemonDetails).toHaveBeenCalledWith(1);
  });
}); 