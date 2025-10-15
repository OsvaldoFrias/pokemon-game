<template>
  <section
    v-if="isLoading || randomPokemon?.id === undefined"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor...</h1>
    <h3 class="animate-pulse">Cargando Pokémon</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Cuál es este Pokémon?</h1>
    <h2 class="capitalize">{{ gameStatus }}</h2>
    <!-- Pokémon Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!-- Pokémon Options -->
    <PokemonOptions :options="options" @selected-option="checkAnswer" />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  gameStatus,
  isLoading,
  pokemonOptions: options,
  randomPokemon,
  checkAnswer,
} = usePokemonGame();
</script>
