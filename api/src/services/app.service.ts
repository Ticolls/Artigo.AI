import { Injectable } from '@nestjs/common';

import { Article } from 'src/entities/Article';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) { }

  async getAllArticles(): Promise<Article[] | void> {
    const articles = this.prisma.article.findMany()

    console.log(articles);
  }
}
