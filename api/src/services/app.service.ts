import { Injectable } from '@nestjs/common';
import { ArticleResponseDTO } from 'src/dtos/ArticleResponseDTO';

import { Article } from 'src/entities/Article';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) { }

  async getAllArticles(): Promise<ArticleResponseDTO[]> {
    const articles: Article[] = await this.prisma.article.findMany({
      include: {
        authors: true
      }
    })

    const articlesDTO: ArticleResponseDTO[] = articles.map(article => new ArticleResponseDTO(article));

    return articlesDTO;
  }

  async findArticleById(id: number): Promise<ArticleResponseDTO> {

    const article: Article = await this.prisma.article.findUnique({
      where: {
        id: id
      },
      include: {
        authors: true
      }
    });

    const articleDTO = new ArticleResponseDTO(article);

    return articleDTO;
  }
}
