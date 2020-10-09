
export interface book{
    id?:number;
    title?:string;
    description?:string;
    pageCount?:number;
    excerpt?:string;
    publishDate?:Date;
}


export class Book {
    id: number = 0;
    title: string = "";
    description: string = "";
    excerpt: string = "";
    pageCount: number = 0;
    publishDate: Date = null;

    constructor(
        id: number = 0,
        title: string = "",
        description: string = "",
        excerpt: string = "",
        pageCount: number = 0,
        publishDate: Date = null,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.excerpt = excerpt;
        this.pageCount = pageCount;
        this.publishDate = publishDate;
    }
}