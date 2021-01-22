import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  public categorySubscription: Subscription;
  public category: Category;

  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.categorySubscription = combineLatest(
      this.route.params,
      this.categoryService.categories$
    )
    .subscribe(([{categoryId}, categories]) => {
      this.category = categories.find(category => category._id === categoryId);
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }
}
