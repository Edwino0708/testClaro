"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.FormBookComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var book_model_1 = require("../book.model");
var FormBookComponent = /** @class */ (function () {
    function FormBookComponent(_formBuilder, _bookService, _activatedRoute, router) {
        this._formBuilder = _formBuilder;
        this._bookService = _bookService;
        this._activatedRoute = _activatedRoute;
        this.router = router;
        this.title = "";
        this.id = "";
        this.theBook = {};
        this.pageType = "";
        this.id = this._activatedRoute.snapshot.params.id;
        this.bookForm = this._formBuilder.group({
            id: [''],
            title: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            pageCount: ['', forms_1.Validators.required],
            excerpt: ['', forms_1.Validators.required],
            publishDate: ['', forms_1.Validators.required]
        });
    }
    FormBookComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.id == "new")) return [3 /*break*/, 1];
                        this.theBook = new book_model_1.Book();
                        this.title = "Crear";
                        this.pageType = "new";
                        return [3 /*break*/, 3];
                    case 1:
                        this.title = "Editar";
                        this.pageType = "edit";
                        return [4 /*yield*/, this._bookService.getBookById(this.id).then(function (res) {
                                _this.theBook = res;
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.bookForm.patchValue(this.theBook);
                        return [2 /*return*/];
                }
            });
        });
    };
    FormBookComponent.prototype.submitForm = function () {
        var _this = this;
        try {
            var data = this.bookForm.getRawValue();
            if (this.pageType == 'new') {
                this._bookService.addBook(data).then(function () {
                    sweetalert2_1["default"].fire({
                        icon: 'success',
                        title: 'Well....',
                        text: 'The Data Save!'
                    }).then(function () {
                        _this.router.navigate(['../book/list']);
                    });
                });
            }
            else {
                this._bookService.updateBook(data).then(function () {
                    sweetalert2_1["default"].fire({
                        icon: 'success',
                        title: 'Well....',
                        text: 'The Data Update!'
                    }).then(function () {
                        _this.router.navigate(['../book/list']);
                    });
                });
            }
        }
        catch (_a) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        }
    };
    FormBookComponent = __decorate([
        core_1.Component({
            selector: 'form-book',
            templateUrl: './form-book.component.html',
            styleUrls: ['./form-book.component.scss']
        })
    ], FormBookComponent);
    return FormBookComponent;
}());
exports.FormBookComponent = FormBookComponent;
