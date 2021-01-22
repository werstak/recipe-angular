import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Category } from '../../interfaces/category';
import { TreeService } from './tree.service';
import { CategoryFlatItem } from './category-flat-item';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  providers: [TreeService]
})
export class SidenavMenuComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CategoryFlatItem, Category>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<Category, CategoryFlatItem>();

  treeControl: FlatTreeControl<CategoryFlatItem>;

  treeFlattener: MatTreeFlattener<Category, CategoryFlatItem>;

  dataSource: MatTreeFlatDataSource<Category, CategoryFlatItem>;

  constructor(
    private treeService: TreeService,
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<CategoryFlatItem>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    treeService.dataChange.subscribe(data => {
      this.dataSource.data = [];
      this.dataSource.data = [
        {
          children: [],
          title: 'Add Category'
        } as Category,
        ...data,
      ];
    });
  }

  getLevel = (node: CategoryFlatItem) => node.level;

  isExpandable = (node: CategoryFlatItem) => node.expandable;

  getChildren = (node: Category): Category[] => node.children;

  hasChild = (_: number, nodeData: CategoryFlatItem) => {
    const children = nodeData.children.filter(child => !child.isDeleted);
    return nodeData.expandable && children.length;
  }

  hasAddCategory = (_: number, nodeData: CategoryFlatItem) => nodeData.title === 'Add Category';

  hasNoContent = (_: number, nodeData: CategoryFlatItem) => nodeData.title === '';

  hasEdit = (_: number, nodeData: CategoryFlatItem) => nodeData.edit;

  hasDeleted = (_: number, nodeData: CategoryFlatItem) => nodeData.isDeleted;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: Category, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.title === node.title
      ? existingNode
      : new CategoryFlatItem();
    flatNode.title = node.title;
    flatNode.edit = node.edit;
    flatNode.isDeleted = node.isDeleted;
    flatNode._id = node._id;
    flatNode.children = node.children;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: CategoryFlatItem) {
    const parentNode = this.flatNodeMap.get(node);
    this.treeService.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  addRootItem() {
    this.treeService.insertRootItem();
  }

  editItem(node: CategoryFlatItem) {
    const parentNode = this.flatNodeMap.get(node);
    this.treeService.editItem(parentNode);
  }

  /** Save the node to database */
  saveNode(node: CategoryFlatItem, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    node.edit = false;
    nestedNode.edit = false;
    this.treeService.updateItem(nestedNode!, itemValue);
  }

  /** Save the node to database */
  deleteItem(node: CategoryFlatItem) {
    const nestedNode = this.flatNodeMap.get(node);
    this.treeService.deleteItem(nestedNode!);
  }
}
