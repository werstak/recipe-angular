import { Component, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';


@Component({
  selector: 'app-child-list-recipe',
  templateUrl: './child-list-recipe.component.html',
  styleUrls: ['./child-list-recipe.component.scss']
})
export class ChildListRecipeComponent {
  @Input() recipe: Recipe;
}
