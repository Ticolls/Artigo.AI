

export class Article {

    private title: string;
    private authors: string[];
    private PDFUrl: string;

    constructor(title: string, authors: string[], PDFUrl: string) {
        this.title = title;
        this.authors = authors;
        this.PDFUrl = PDFUrl;
    }
}