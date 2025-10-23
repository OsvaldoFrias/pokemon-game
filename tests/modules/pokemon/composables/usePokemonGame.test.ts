import { describe, expect, test } from "vitest";
import { flushPromises } from "@vue/test-utils";
import MockAdapter from "axios-mock-adapter";

import { usePokemonGame } from "@pokemon/composables/usePokemonGame";
import { withSetup } from "../../../utils/with-setup";
import { GameStatus } from "@pokemon/interfaces";
import { pokemonApi } from "@pokemon/api/pokemonApi";
import { pokemonListFake } from "../../../data/fake-pokemons";

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake
});

describe('usePokemonGame', () => {
  test('should initialize with correct default values', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [results, app] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBeUndefined();

    await flushPromises();

    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  })
})
