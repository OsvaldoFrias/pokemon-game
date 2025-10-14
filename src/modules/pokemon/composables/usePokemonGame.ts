import { computed, onMounted, ref } from "vue";
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces";
import { pokemonApi } from "../api/pokemonApi";

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    const pokemonArray = response.data.results.map(pokemon => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2] ?? 0;
      return {
        id: +id,
        name: pokemon.name,
      };
    });
    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  }

  onMounted(async () => {
    pokemons.value = await getPokemons();
    // console.log(pokemons.value);
    getNextOptions();
    console.log(pokemonOptions.value);
  });

  return {
    gameStatus,
    isLoading,
  };
}
