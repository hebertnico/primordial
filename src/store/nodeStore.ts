import { create } from "zustand";
import type { NodeData } from "../types/node";
import { persist } from "zustand/middleware";

interface NodeStore {
  nodes: Record<string, NodeData>;

  childrenMap: Record<string, string[]>;

  loaded: boolean;

  setTree: (
    nodes: Record<string, NodeData>,
    childrenMap: Record<string, string[]>
  ) => void;

  addNode: (
  node: NodeData
) => void;

  updateNode: (
    id: string,
    updates: Partial<NodeData>
  )=> void;
}

export const useNodeStore = create<NodeStore>()(
  persist((set) => ({
    nodes: {},
    childrenMap: {},
    loaded:false,

    setTree: (nodes, childrenMap) =>
      set({
        nodes,
        childrenMap,
        loaded: true,
      }),

    addNode: (node) =>
      set((state) => {

        const childrenMap = {
          ...state.childrenMap,
        };

        if (node.parentId) {
          childrenMap[node.parentId] = [
            ...(childrenMap[node.parentId] ?? []),
            node.id,
          ];
        }

        return {
          nodes: {
            ...state.nodes,
            [node.id]: node,
          },

          childrenMap,
        };
      }),

    updateNode: (id, updates) =>
      set((state) => ({
        nodes: {
          ...state.nodes,
          [id]: {
            ...state.nodes[id],
            ...updates,
          },
        },
      })),
  }),
    {
      name: "tree-cache",
      version:3
    })
);