import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Article } from 'src/entities/Article';

@Controller("article")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getAllArticles(): Promise<Article[]> {
    const allArticles = await this.appService.getAllArticles();

    return allArticles;
  }
}
