import {Component, Input} from '@angular/core';
import { Article } from '../../interfaces/article';
@Component({
  selector: 'app-child-list-articles',
  templateUrl: './child-list-articles.component.html',
  styleUrls: ['./child-list-articles.component.scss']
})
export class ChildListArticlesComponent {
  @Input() article: Article;
}
