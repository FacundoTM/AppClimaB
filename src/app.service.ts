import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService, // Hacemos uso del HttpService
    private readonly configService: ConfigService, // Hacemos uso de las variables de entorno.
  ) {}

  async consultarClima(ciudad: string): Promise<any> {
    // Configuramos la URL de la API a consultar.
    const url = 'http://api.weatherapi.com/v1/current.json';

    // Llamamos al metodo get de configService para obtener la KEY de la API que está en las variables de entorno.
    const secret = this.configService.get('SECRET_KEY');

    // Configuramos los parametros para hacer la petición
    const params = {
      q: ciudad,
      key: secret,
      lang: 'es',
    };

    // Enivamos la petición a través de un try catch para tener el error mejor controlado y que no termine la aplicación.

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params,
        }),
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        'Bad Request, es requerido el campo CIUDAD.',
      );
    }
  }
}
