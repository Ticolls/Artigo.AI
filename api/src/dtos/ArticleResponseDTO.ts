import { Article } from "src/entities/Article";

export class ArticleResponseDTO {
    title: string;

    pdfUrl: string;

    authors: string[]

    constructor(article: Article) {
        this.title = article.title;
        this.pdfUrl = article.pdfUrl;
        this.authors = article.authors.map(author => author.name);
    }



}