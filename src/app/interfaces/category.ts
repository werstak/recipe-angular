export class Category {
  _id: string;
  title: string;
  parentId: string | null;
  children?: Category[];
  isDeleted?: boolean;
  edit?: boolean;
}
