import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './list/list-book.component';
import { FormBookComponent } from './form/form-book.component';
import {MatTableModule} from '@angular/material/table'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 


const routes: Routes = [
  { path: 'form/?id', component: FormBookComponent },
  { path: 'list', component: ListBookComponent}
 ];

@NgModule({
  declarations: [
    FormBookComponent,ListBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BookModule { }
