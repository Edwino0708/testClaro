"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var list_book_component_1 = require("./list/list-book.component");
var form_book_component_1 = require("./form/form-book.component");
var table_1 = require("@angular/material/table");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var book_service_1 = require("./api/book.service");
var routes = [
    { path: 'form/:id', component: form_book_component_1.FormBookComponent },
    { path: 'list', component: list_book_component_1.ListBookComponent }
];
var BookModule = /** @class */ (function () {
    function BookModule() {
    }
    BookModule = __decorate([
        core_1.NgModule({
            declarations: [
                form_book_component_1.FormBookComponent, list_book_component_1.ListBookComponent
            ],
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                table_1.MatTableModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                material_1.MatButtonModule,
                material_1.MatMenuModule,
                material_1.MatIconModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatProgressBarModule
            ],
            providers: [book_service_1.BookService]
        })
    ], BookModule);
    return BookModule;
}());
exports.BookModule = BookModule;
