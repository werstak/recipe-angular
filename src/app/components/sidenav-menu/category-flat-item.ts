export class CategoryFlatItem {
  _id: string;
  title: string;
  level: number;
  children: any[];
  expandable: boolean;
  edit?: boolean;
  isDeleted?: boolean;
}
