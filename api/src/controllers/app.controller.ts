import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Article } from 'src/entities/Article';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getAllArticles(): Promise<void> {
    const allArticles = await this.appService.getAllArticles();

  }
}
