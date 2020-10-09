import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './list/list-book.component';
import { FormBookComponent } from './form/form-book.component';
import {MatTableModule} from '@angular/material/table'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from './api/book.service';


const routes: Routes = [
  { path: 'form/:id', component: FormBookComponent },
  { path: 'list', component: ListBookComponent}
 ];

@NgModule({
  declarations: [
    FormBookComponent,ListBookComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers : [BookService]
})
export class BookModule { }
