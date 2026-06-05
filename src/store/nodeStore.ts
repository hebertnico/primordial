import { create } from "zustand";
import type { NodeData } from "../types/node";

interface NodeStore {
  nodes: Record<string, NodeData>;

  childrenMap: Record<string, string[]>;

  loaded: boolean;

  setTree: (
    nodes: Record<string, NodeData>,
    childrenMap: Record<string, string[]>
  ) => void;
}

export const useNodeStore = create<NodeStore>(
  (set) => ({
    nodes: {},
    childrenMap: {},
    loaded:false,

    setTree: (nodes, childrenMap) =>
      set({
        nodes,
        childrenMap,
        loaded: true,
      }),
  })
);