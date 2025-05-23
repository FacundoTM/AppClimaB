import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Hacemos uso del decorador POST para crear una consulta, a traves del body le enviamos la 'ciudad' en este caso.
  @Get('clima/:ciudad')
  async consultarClima(@Param('ciudad') ciudad: string) {
    return await this.appService.consultarClima(ciudad);
  }
}
