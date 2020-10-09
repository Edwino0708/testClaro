import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { book } from '../book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  _api_url:string = environment.api;

  constructor(private _http: HttpClient) 
  { }


  async getBooks(filter):Promise<book[]>{
      try {
        const params = new HttpParams()
            .set("filter", filter + "");
        const res = await this._http
            .get<book[]>(`${this._api_url}/all`, {
                params
            })
            .toPromise();
        return res
    } catch (error) {
      console.log(error);
      
        throw error;
    }
  }

  async getBookById(id="") : Promise<book>{
     try {
        const params = new HttpParams()
            .set("id", id + "");
        const res = await this._http
            .get<book>(`${this._api_url}`, {
                params
            })
            .toPromise();
        return res;
    } catch (error) {
        throw error;
    }
  }

  async addBook(book) : Promise<any>{
    try {
      const res = await this._http
          .post(`${this._api_url}`,book)
          .toPromise();
      return res;
    } catch (error) {
        throw error;
    }
  }


  async updateBook(book) : Promise<any>{
    try {
      const res = await this._http
          .put(`${this._api_url}`,book)
          .toPromise();
      return res;
    } catch (error) {
        throw error;
    }
  }
  
  async deleteBookById(id="") : Promise<book>{
    try {
      const params = new HttpParams()
          .set("id", id + "");
      const res = await this._http
          .get<book>(`${this._api_url}`, {
              params
          })
          .toPromise();
        return res;
    } catch (error) {
        throw error;
    }
  }

}
