import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Recipe } from '../interfaces/recipe';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private readonly httpClient: HttpClient) { }

  getItemRecipeID(id): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${environment.urlHerokuApp}api/v1/recipe/item/` + id)
      .pipe(
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        }),
      );
  }

  getRecipeByCategoryId(id: string) {
    return this.httpClient.get<Recipe[]>(`${environment.urlHerokuApp}api/v1/recipe/byCategory/${id}`)
    .pipe(
      catchError(error => {
        console.log('Error: ', error.message);
        return throwError(error);
      }),
    );
  }
}
