export interface NodeData {
  id: string;
  name: string;
  sex: string;
  parentId: string | null;
  image: string | null;
  sibOrder: number;
  tubu: string | null;
  monding: string | null;
  spouse: string[] | null;
  niain: boolean | undefined;
}