import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ArticleComponent } from './components/article/article.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'category/:categoryId', component: CategoryComponent},
  { path: 'edit-category/:id', component: EditCategoryComponent},
  { path: 'recipe/:id', component: RecipeComponent},
  { path: 'edit-recipe/:id', component: EditRecipeComponent},
  { path: 'create-recipe', component: EditRecipeComponent},
  { path: 'article/:id', component: ArticleComponent},
  { path: 'create-article', component: EditArticleComponent},
  { path: 'edit-article/:id', component: EditArticleComponent},
  { path: '**', component: PageNotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
