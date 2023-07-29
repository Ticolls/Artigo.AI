import { Injectable, OnModuleInit } from '@nestjs/common';
import { Article } from 'src/entities/Article';
import { PrismaService } from 'src/prisma/prisma.service';
import { scrapingScielo } from 'src/scraping/scielo';

@Injectable()
export class ScraperService implements OnModuleInit {

    constructor(private prisma: PrismaService) { }

    async scrapScieloArticles(): Promise<void> {


        try {
            const scieloData = await scrapingScielo();
            const articles: Article[] = scieloData.map((data) => new Article(data.title, data.authors, data.PDFUrl));

            for (const article of articles) {
                await this.prisma.article.create({
                    data: {
                        title: article.title,
                        pdfUrl: article.pdfUrl,
                        authors: {
                            createMany: {
                                data: article.authors,
                            }
                        }
                    }
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    async onModuleInit() {
        const interval = 1000 * 60 * 60 * 24; // 24 horas | 1 dia

        await this.scrapScieloArticles();

        setInterval(async () => await this.scrapScieloArticles(), interval);
    }

}
