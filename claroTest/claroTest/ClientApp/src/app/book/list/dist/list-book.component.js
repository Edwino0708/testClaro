"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BooksDataSource = exports.ListBookComponent = void 0;
var table_1 = require("@angular/cdk/table");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var ListBookComponent = /** @class */ (function () {
    function ListBookComponent(_bookService) {
        this._bookService = _bookService;
        this.loading = false;
        this.displayedColumns = ['id', 'title', 'description', 'pageCount', 'excerpt', 'publishDate', 'buttons'];
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    ListBookComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new BooksDataSource(this._bookService);
        this.dataSource.loadBooks();
        rxjs_1.fromEvent(this.filter.nativeElement, "keyup")
            .pipe(operators_1.takeUntil(this._unsubscribeAll), operators_1.debounceTime(150), operators_1.distinctUntilChanged())
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.loadPage();
        });
    };
    ListBookComponent.prototype.loadPage = function () {
        this.dataSource.loadBooks(this.filter.nativeElement.value);
    };
    ListBookComponent.prototype.deteteBook = function (id) {
        var _this = this;
        try {
            this._bookService.deleteBookById(id).then(function () {
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Bien....',
                    text: 'El libro fue elimininado!'
                }).then(function () { return _this.loadPage(); });
            });
        }
        catch (_a) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        }
    };
    __decorate([
        core_1.ViewChild("filter", { static: true })
    ], ListBookComponent.prototype, "filter");
    ListBookComponent = __decorate([
        core_1.Component({
            selector: 'list-book',
            templateUrl: './list-book.component.html',
            styleUrls: ['./list-book.component.scss']
        })
    ], ListBookComponent);
    return ListBookComponent;
}());
exports.ListBookComponent = ListBookComponent;
var BooksDataSource = /** @class */ (function (_super) {
    __extends(BooksDataSource, _super);
    function BooksDataSource(_bookService) {
        var _this = _super.call(this) || this;
        _this._bookService = _bookService;
        _this._booksSubject = new rxjs_1.BehaviorSubject([]);
        _this._loadingSubject = new rxjs_1.BehaviorSubject(false);
        _this.loading$ = _this._loadingSubject.asObservable();
        return _this;
    }
    BooksDataSource.prototype.connect = function () {
        return this._booksSubject.asObservable();
    };
    BooksDataSource.prototype.disconnect = function () {
        this._booksSubject.complete();
        this._loadingSubject.complete();
    };
    BooksDataSource.prototype.loadBooks = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = ""; }
        this._loadingSubject.next(true);
        this._bookService
            .getBooks(filter)
            .then(function (res) {
            _this._booksSubject.next(res);
            _this._loadingSubject.next(false);
        })["catch"](function (err) {
            console.log(err);
            _this._booksSubject.next([]);
            _this._loadingSubject.next(false);
        });
    };
    return BooksDataSource;
}(table_1.DataSource));
exports.BooksDataSource = BooksDataSource;
