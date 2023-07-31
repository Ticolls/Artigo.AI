import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiTags } from '@nestjs/swagger';
import { Param } from '@nestjs/common/decorators';
import { ArticleResponseDTO } from 'src/dtos/ArticleResponseDTO';

@ApiTags("article")
@Controller("article")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getAllArticles(): Promise<ArticleResponseDTO[]> {

    try {
      const allArticles = await this.appService.getAllArticles();

      return allArticles;
    } catch (e) {
      console.log(e);
    }

  }

  @Get(":id")
  async getArticleById(@Param("id") id: number): Promise<ArticleResponseDTO> {

    try {
      const article = await this.appService.findArticleById(Number(id));

      return article;
    }
    catch (e) {
      console.log(e);
    }

  }
}
