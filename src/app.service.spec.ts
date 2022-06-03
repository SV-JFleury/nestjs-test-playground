import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import * as pokemonSDK from 'pokemon';
import { mockDeep } from 'jest-mock-extended';

describe('AppService', () => {
  let appService: AppService;

  const pokemonMock = mockDeep<typeof pokemonSDK>();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: 'pokemon', useFactory: () => pokemonMock },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  // EASY MODE
  describe('getPokemon', () => {
    it('should return a pokemon', async () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve({ name: 'Pikachu' }),
        });
      });
      expect(await appService.getPokemonById(1)).toEqual({ name: 'Pikachu' });
    });

    it('should throw an error', async () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.reject(),
        });
      });
      expect(
        async () => await appService.getPokemonById(999999),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // MEDIUM MODE
  describe('getPokemonBySDK', () => {
    //Bulbasaur
    it('should return a pokemon', async () => {
      pokemonMock.getName.mockReturnValueOnce('toto');

      const pokemon = await appService.getPokemonBySDK(1);

      expect(pokemon).toEqual('toto');
      expect(pokemonMock.getName).toHaveBeenCalledTimes(1);
    });
  });

  // HARD MODE
  // Google API
});
