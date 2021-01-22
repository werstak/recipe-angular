import {Component, OnDestroy, OnInit} from '@angular/core';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  public itemArticle: Article;
  public articleSubscription: Subscription;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getItemArticle();
  }

  getItemArticle() {
    this.articleSubscription = this.route.params.pipe(
      switchMap(({id}) => this.articleService.getItemArticleID(id))
    )
      .subscribe(itemArticle => {
        this.itemArticle = itemArticle;
      });
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

}
