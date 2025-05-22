import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Hacemos uso del decorador POST para crear una consulta, a traves del body le enviamos la 'ciudad' en este caso.
  @Post('consultarClima')
  async consultarClima(@Body('ciudad') ciudad: string) {
    return await this.appService.consultarClima(ciudad);
  }
}
