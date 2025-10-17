import { describe, expect, test } from "vitest";
import { mount } from '@vue/test-utils';
import PokemonPicture from "@pokemon/components/PokemonPicture.vue";

describe('<PokemonPicture />', () => {
  const pokemonId = 25;
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

  test('should render hidden image when showPokemon props is false', () => {
    const wrapper = mount(PokemonPicture, { props: { showPokemon: false, pokemonId } });

    // console.log(wrapper.html());

    const image = wrapper.find('img');
    const attributes = image.attributes();

    // expect(image.exists()).toBe(true);
    // expect(image.attributes('src')).toBe(imageSource);

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        src: imageSource,
      }),
    );
  });

  test('should render image when showPokemon props is true', () => {
    const wrapper = mount(PokemonPicture, { props: { showPokemon: true, pokemonId } });

    // console.log(wrapper.html());

    const image = wrapper.find('img');
    const attributes = image.attributes();

    // expect(image.exists()).toBe(true);
    // expect(image.attributes('src')).toBe(imageSource);

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'fade-in h-[200px]',
        src: imageSource,
      }),
    );
  });
})
