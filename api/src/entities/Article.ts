

export class Article {

    title: string;
    authors: { name: string }[];
    pdfUrl: string;

    constructor(title: string, authors: { name: string }[], PDFUrl: string) {
        this.title = title;
        this.authors = authors;
        this.pdfUrl = PDFUrl;
    }
}