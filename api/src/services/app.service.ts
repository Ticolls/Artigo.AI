import { Injectable } from '@nestjs/common';

import { Article } from 'src/entities/Article';
import { scrapingScielo } from 'src/scraping/scielo';

@Injectable()
export class AppService {
  async getAllArticles(): Promise<Article[]> {
    const scieloData = await scrapingScielo();

    const articles: Article[] = scieloData.map((data) => new Article(data.title, data.authors, data.PDFUrl));

    return articles;
  }
}
