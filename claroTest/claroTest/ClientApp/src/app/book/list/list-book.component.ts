import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { BookService } from '../api/book.service';
import { book } from '../book.model';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  takeUntil,
} from "rxjs/operators";

import Swal from 'sweetalert2'

@Component({
  selector: 'list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit {
  loading:boolean = false;
  dataSource : BooksDataSource | null;

  displayedColumns: string[] = ['id','title', 'description', 'pageCount', 'excerpt','publishDate','buttons'];
  private _unsubscribeAll: Subject<any>;

  @ViewChild("filter", { static: true })
  filter: ElementRef;

  constructor(private _bookService:BookService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.dataSource = new BooksDataSource(this._bookService);
    this.dataSource.loadBooks();

    fromEvent(this.filter.nativeElement, "keyup")
        .pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(150),
            distinctUntilChanged()
        )
        .subscribe(() => {
            if (!this.dataSource) {
                return;
            }
            this.loadPage();
        });
  }

  loadPage() {
    this.dataSource.loadBooks(
        this.filter.nativeElement.value,
    );
  }

  deteteBook(id){
    try{
      this._bookService.deleteBookById(id).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Bien....',
          text: 'El libro fue elimininado!'
        }).then(() => this.loadPage())
      })
    }catch{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
}

export class BooksDataSource extends DataSource<book> {
  private _booksSubject = new BehaviorSubject<book[]>([]);
  private _loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this._loadingSubject.asObservable();

  constructor(private _bookService: BookService) {
      super();
  }

  connect(): Observable<any[] | readonly any[]> {
      return this._booksSubject.asObservable();
  }

  disconnect(): void {
      this._booksSubject.complete();
      this._loadingSubject.complete();
  }

  loadBooks(
      filter = "",
  ): void {
      this._loadingSubject.next(true);
      this._bookService
          .getBooks(filter)
          .then((res) => {
              this._booksSubject.next(res);
              this._loadingSubject.next(false);
          })
          .catch((err) => {
              console.log(err);
              this._booksSubject.next([]);
              this._loadingSubject.next(false);
          });
  }

}