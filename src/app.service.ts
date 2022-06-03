import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as pokemonSDK from 'pokemon';

@Injectable()
export class AppService {
  constructor(@Inject('pokemon') private readonly pokemon: typeof pokemonSDK) {
    console.log(pokemon);
  }

  async getPokemonById(id: number) {
    try {
      const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      return await results.json();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getPokemonBySDK(id: number) {
    return this.pokemon.getName(id);
  }
}
