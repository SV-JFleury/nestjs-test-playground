import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('pokemon/:id')
  async getPokemonById(@Param('id') id) {
    return await this.appService.getPokemonById(id);
  }

  @Get('pokemonBySDK/:id')
  async getPokemonBySDK(@Param('id') id) {
    return await this.appService.getPokemonBySDK(id);
  }

  @Get('getAddress/:lat/:lng')
  async getAddress(@Param('lat') lat, @Param('lng') lng) {
    return await this.appService.getAddress(lat, lng);
  }
}
