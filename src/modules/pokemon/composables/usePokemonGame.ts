import { computed, onMounted, ref } from "vue";
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces";
import { pokemonApi } from "../api/pokemonApi";
import confetti from 'canvas-confetti';


export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });
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

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);

    console.log(gameStatus.value);
  }

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value?.id === id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 100,
        spread: 150,
        origin: { y: 0.6 },
      });
    } else {
      gameStatus.value = GameStatus.Lost;
    }
  }


  onMounted(async () => {
    pokemons.value = await getPokemons();
    // console.log(pokemons.value);
    getNextRound();
    // console.log(pokemonOptions.value);
  });

  return {
    // Properties
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    // Methods
    checkAnswer,
    getNextRound,
  };
}
