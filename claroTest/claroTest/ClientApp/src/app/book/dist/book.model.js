"use strict";
exports.__esModule = true;
exports.Book = void 0;
var Book = /** @class */ (function () {
    function Book(id, title, description, excerpt, pageCount, publishDate) {
        if (id === void 0) { id = 0; }
        if (title === void 0) { title = ""; }
        if (description === void 0) { description = ""; }
        if (excerpt === void 0) { excerpt = ""; }
        if (pageCount === void 0) { pageCount = 0; }
        if (publishDate === void 0) { publishDate = null; }
        this.id = 0;
        this.title = "";
        this.description = "";
        this.excerpt = "";
        this.pageCount = 0;
        this.publishDate = null;
        this.id = id;
        this.title = title;
        this.description = description;
        this.excerpt = excerpt;
        this.pageCount = pageCount;
        this.publishDate = publishDate;
    }
    return Book;
}());
exports.Book = Book;
