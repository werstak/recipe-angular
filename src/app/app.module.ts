import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CategoryService } from './services/category.service';
import { RecipeService } from './services/recipe.service';
import { ArticleService } from './services/article.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './components/article/article.component';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ChildListArticlesComponent } from './components/list-articles/child-list-articles.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ChildListRecipeComponent } from './components/list-recipes/child-list-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';




@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SidenavMenuComponent,
    HomeComponent,
    EditCategoryComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FooterComponent,
    ArticleComponent,
    ListArticlesComponent,
    ListRecipesComponent,
    RecipeComponent,
    ChildListArticlesComponent,
    EditArticleComponent,
    ChildListRecipeComponent,
    EditRecipeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoryService,
    RecipeService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
