import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
  public itemRecipe: Recipe;
  public recipeSubscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getItemRecipe();
  }

  getItemRecipe() {
    this.recipeSubscription = this.route.params.pipe(
      switchMap(({id}) => this.recipeService.getItemRecipeID(id))
    )
    .subscribe(itemRecipe => {
      this.itemRecipe = itemRecipe;
    });
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

}
