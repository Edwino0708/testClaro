import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BookService } from '../api/book.service';
import { book, Book } from '../book.model';

@Component({
  selector: 'form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.scss']
})
export class FormBookComponent implements OnInit {
  title:string = "";
  id:string = "";
  bookForm: FormGroup;
  theBook:book = {};
  pageType:string= ""

  constructor(
    private _formBuilder: FormBuilder,
    private _bookService: BookService,
    private _activatedRoute:ActivatedRoute,
    private router: Router
    ) {
       this.id = this._activatedRoute.snapshot.params.id;
       
       this.bookForm = this._formBuilder.group({
        id: [''],
        title:['',Validators.required],
        description: ['',Validators.required],
        pageCount: ['',Validators.required],
        excerpt : ['',Validators.required],
        publishDate : ['',Validators.required]
      });
  }

  async ngOnInit() {    
    if(this.id == "new"){
      this.theBook= new Book();
      this.title = "Crear";
      this.pageType = "new";
    }else{
      this.title = "Editar"
      this.pageType= "edit"
      await this._bookService.getBookById(this.id).then(res => {
        this.theBook = res;
      });
    }
    this.bookForm.patchValue(this.theBook);
  }

  
  submitForm(){
    try{
      const data = this.bookForm.getRawValue();
      if(this.pageType == 'new'){
        this._bookService.addBook(data).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Well....',
            text: 'The Data Save!'
          }).then(() => {
            this.router.navigate(['../book/list']);
          })
        });
      }else{
        this._bookService.updateBook(data).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Well....',
            text: 'The Data Update!'
          }).then(() => {
            this.router.navigate(['../book/list']);
          })
        });
      }
    }catch{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  } 
  
}
