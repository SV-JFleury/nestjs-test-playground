import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as pokemonSDK from 'pokemon';
import { Client } from '@googlemaps/google-maps-services-js';

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

  async getAddress(lat: string, lng: string) {
    const client = new Client({});
    client
      .elevation({
        params: {
          locations: [
            { lat: 48.856614, lng: 2.3522219 },
            { lat: 21.0726562, lng: 55.4893023 },
          ], // Paris, Piton des neiges (REUNION)
          key: '',
          client_id: '',
          client_secret: '',
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        console.log(r.data.results[0].elevation);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(lat, lng);
    return '';
  }
}
