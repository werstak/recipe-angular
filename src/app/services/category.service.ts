import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../interfaces/category';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories$ = new BehaviorSubject<Category[]>([]);
  nestingCategories$ = this.categories$.pipe(
    map(res => this.createNesting(res)),
  );

  constructor(private readonly httpClient: HttpClient) {
    this.nestingCategories$.subscribe();
  }

  fetchItemCategory() {
    return this.httpClient.get<Category[]>(`${environment.urlHerokuApp}api/v1/category/all`)
    .pipe(
      catchError(error => {
        console.log('Error: ', error.message);
        return throwError(error);
      }),
    )
    .subscribe((categories) => {
      this.categories$.next(categories);
    });
  }

  createNesting(categories: Category[], parentId = null): Category[] {
    const nextLevelCategories = categories.filter(category => category.parentId !== parentId); // we select categories in which parentId is not null
    return categories
    .filter(category => category.parentId === parentId) // all current categories
    .map((category: Category) => {
      const {children = []} = category;
      return {
        ...category,
        children: [...children, ...this.createNesting(nextLevelCategories, category._id)]
      };
    });
  }

  createCategory(category: Category) {
    return this.httpClient.post<Category>(`${environment.urlHerokuApp}api/v1/category/create`, category)
    .pipe(
      tap(newCategory => {
        this.categories$.next([
          ...this.categories$.value,
          newCategory,
        ]);
      }),
      catchError(error => {
        console.log('Error: ', error.message);
        return throwError(error);
      }),
    );
  }

  updateCategory({_id, title}: Category) {
    return this.httpClient.put<Category>(`${environment.urlHerokuApp}api/v1/category/update`, {_id, title})
    .pipe(
      tap(newCategory => {
        const categories = this.categories$.value;
        const index = categories.findIndex(category => category._id === newCategory._id);
        console.log(index);
        if (index > -1) {
          categories[index] = newCategory;
        }
        this.categories$.next(categories);
      }),
      catchError(error => {
        console.log('Error: ', error.message);
        return throwError(error);
      }),
    );
  }

  deleteCategory(deletingCategory: Category) {
    return this.httpClient.delete(`${environment.urlHerokuApp}api/v1/category/${deletingCategory._id}`)
    .pipe(
      tap(() => {
        const categories = this.categories$.value;
        const index = categories.findIndex(category => category._id === deletingCategory._id);
        if (index > -1) {
          categories.splice(index, 1);
        }
        this.categories$.next(categories);
      }),
      catchError(error => {
        console.log('Error: ', error.message);
        return throwError(error);
      }),
    );
  }

}
