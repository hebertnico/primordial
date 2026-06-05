export interface NodeData {
  id: string;
  name: string;
  sex: string;
  parentId: string | null;
  image: string | null;
  sibOrder: number;
  tubu: Date | null;
  monding: Date | null;
  spouse: string[] | null;
}