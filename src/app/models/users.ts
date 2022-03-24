export interface Users {
  name: string;
  code: string;
  imagePath: string
}

export interface Hierarchy {
    name: string,
    id:string
    parentId:string
    type: string,
    styleClass: string,
    expanded: boolean,
    data: {avatar: string},
    children: Array<Hierarchy>
};