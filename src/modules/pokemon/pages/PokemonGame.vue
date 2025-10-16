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
    <div class="h-20">
      <button v-if="gameStatus !== GameStatus.Playing" @click="getNextRound(4)">
        Volver a jugar
      </button>
    </div>
    <!-- Pokémon Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!-- Pokémon Options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
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
  getNextRound,
} = usePokemonGame();
</script>

<style scoped>
@reference "../../../assets/styles.css";

button {
  @apply bg-blue-500 text-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-blue-900;
}
</style>
