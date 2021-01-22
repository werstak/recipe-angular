import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Article } from '../interfaces/article';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private readonly httpClient: HttpClient) { }


  getItemArticleID(id): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.urlHerokuApp}api/v1/article/item/` + id)
      .pipe(
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        }),
      );
  }

  getArticleByCategoryId(id: string){
    return this.httpClient.get<Article[]>(`${environment.urlHerokuApp}api/v1/article/byCategory/${id}`)
      .pipe(
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        }),
      );
  }


}
