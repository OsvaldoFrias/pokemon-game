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
    const [results] = withSetup(usePokemonGame);

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

  test('should correcly handle getNextRoud', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    results.gameStatus.value = GameStatus.Won;

    results.getNextRound(5);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonOptions.value).toHaveLength(5);
  })

  test('should correcly handle getNextRound and return different pokemons', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const firstOptions = results.pokemonOptions.value.map((p: any) => p.name);

    results.getNextRound();
    // expect(results.pokemonOptions.value).not.toEqual(firstOptions);

    const secondOptions = [...results.pokemonOptions.value];

    secondOptions.forEach((element, idx) => {
      expect(element.name).not.toBe(firstOptions[idx].name);
    });
  });

  test('should correcly handle incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(100000000);

    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should correcly handle correct answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(randomPokemon.value.id);

    expect(gameStatus.value).toBe(GameStatus.Won);
  });
})
