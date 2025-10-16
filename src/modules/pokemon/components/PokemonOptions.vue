<template>
  <section class="mt-5 flex flex-col">
    <button
      v-for="{ name, id } in options"
      :key="id"
      @click="$emit('selectedOption', id)"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100 disabled:text-gray-500',
        {
          correct: id === correctAnswer && blockSelection,
          incorrect: id !== correctAnswer && blockSelection,
        },
      ]"
      :disabled="blockSelection"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Pokemon } from '../interfaces';

const blocked = computed(() => props.blockSelection);

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
}

const props = defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
@reference "../../../assets/styles.css";

button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply !bg-blue-500 !text-white cursor-not-allowed;
}

.incorrect {
  @apply !bg-red-100 !opacity-70 cursor-not-allowed;
}
</style>
