import puppeteer from 'puppeteer';

type scrapingArticle = {
    title: string | undefined,
    authors: { name: string }[];
    PDFUrl: string
}

export const scrapingScielo = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
        // executablePath: process.env.NODE_env === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });

    const page = await browser.newPage();

    await page.goto("https://search.scielo.org/?fb=&q=computa%C3%A7%C3%A3o&lang=pt&where=&filter%5Bin%5D%5B%5D=scl&filter%5Bla%5D%5B%5D=pt&from=1&page=1");

    const pagesQuantity: number = await page.evaluate(() => {

        const searchOptionsTag = document.querySelector("div.searchOptions");
        const pagesTag = searchOptionsTag?.querySelector("div.col-md-6.right")?.innerHTML;
        const pagesQuantity = pagesTag?.trim().split(" ").filter(line => line.length > 0)[8].trim().split("'\n'")[0];

        return Number(pagesQuantity);
    });

    const allArticles: scrapingArticle[] = [];

    let pageNumber = 1;
    let pageFrom = 1;

    while (pageNumber <= pagesQuantity) {

        if (pageNumber != 1) {
            await page.goto(`https://search.scielo.org/?fb=&q=computa%C3%A7%C3%A3o&lang=pt&where=&filter%5Bin%5D%5B%5D=scl&filter%5Bla%5D%5B%5D=pt&from=${pageFrom}&page=${pageNumber}`)
        }

        const pageArticles: scrapingArticle[] = await page.evaluate(() => {
            const items = document.querySelectorAll(".item");

            const articles: scrapingArticle[] = [];

            items.forEach((item) => {
                const title = item.querySelector("strong.title")?.innerHTML;

                const itemAuthorsTags = item.querySelectorAll("a.author");
                const authors: { name: string }[] = [];

                itemAuthorsTags.forEach((tag) => {
                    authors.push({ name: tag.innerHTML });
                });

                const PDFUrl = item.querySelector("div.line.versions > span:nth-child(5) > a")?.getAttribute("href");

                if (PDFUrl == null || PDFUrl == undefined) {
                    return;
                } else {
                    articles.push({ title, authors, PDFUrl });
                }
            });

            return articles;
        });

        allArticles.push(...pageArticles);

        pageNumber++;
        pageFrom = pageFrom + 16;
    }

    await browser.close();

    return allArticles;
};

