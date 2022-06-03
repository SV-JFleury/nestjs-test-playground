import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as pokemonSDK from 'pokemon';
@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, { provide: 'pokemon', useFactory: () => pokemonSDK }],
})
export class AppModule {}
