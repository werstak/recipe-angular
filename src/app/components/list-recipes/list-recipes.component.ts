import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit {

  public itemRecipe$: Observable<Recipe[]>;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit() {
    this.getitemRecipe();
  }

  getitemRecipe() {
    this.itemRecipe$ = this.route.params.pipe(
      switchMap(({categoryId}) => {
        return this.recipeService.getRecipeByCategoryId(categoryId);
      })
    );
  }

}
