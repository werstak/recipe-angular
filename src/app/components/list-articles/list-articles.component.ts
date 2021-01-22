import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../interfaces/article';
import {ArticleService} from '../../services/article.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  @Input()
  disableRipple: boolean;

  public itemArticle: Observable<Article[]>;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit() {
    this.getItemArticle();
  }

  getItemArticle() {
    this.itemArticle = this.route.params.pipe(
      switchMap(({categoryId}) => {
        return this.articleService.getArticleByCategoryId(categoryId);
      })
    );
  }

}
