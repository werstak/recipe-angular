import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { filter, first } from 'rxjs/operators';

@Injectable()
export class TreeService {
  dataChange = new BehaviorSubject<Category[]>([]);

  get data(): Category[] {
    return this.dataChange.value;
  }

  constructor(
    private categoryService: CategoryService,
  ) {
    this.initialize();
  }

  initialize() {
    this.categoryService.fetchItemCategory();
    this.categoryService.nestingCategories$
    .pipe(
      filter(categories => categories && !!categories.length),
      first()
    )
    .subscribe((data: any) => {
      this.dataChange.next(data);
    });
  }

  /** Add an item to to-do list */
  insertItem(parent: Category, name: string) {
    parent.children.push({
      title: name,
      children: [],
      parentId: parent._id,
    } as Category);
    this.dataChange.next(this.data);
  }

  insertRootItem() {
    this.data.unshift({
      title: '',
      children: [],
      parentId: null,
    } as Category);
    this.dataChange.next(this.data);
  }

  updateItem(node: Category, name: string) {
    node.title = name;
    if (node._id) {
      this.categoryService.updateCategory(node)
      .subscribe(() => {
        this.dataChange.next(this.data);
      });
    } else {
      this.categoryService.createCategory(node)
      .subscribe(category => {
        node._id = category._id;
        this.dataChange.next(this.data);
      });
    }
  }

  editItem(node: Category) {
    node.edit = true;
    this.dataChange.next(this.data);
  }

  deleteItem(node: Category) {
    node.isDeleted = true;
    this.categoryService.deleteCategory(node)
    .subscribe(() => {
      this.dataChange.next(this.data);
    });
  }
}
