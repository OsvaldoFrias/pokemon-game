import type { Pokemon } from "@/modules/pokemon/interfaces";
import { describe, expect, test } from "vitest";

describe('Pokemon interface', () => {
  const pokemon: Pokemon = {
    id: 1,
    name: 'Bulbasaur',
  };

  test('should have an id property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  })

  test('should have a name property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  })
})
