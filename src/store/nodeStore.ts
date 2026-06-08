import { create } from "zustand";
import type { NodeData } from "../types/node";
import { persist } from "zustand/middleware";

interface NodeStore {
  nodes: Record<string, NodeData>;

  childrenMap: Record<string, string[]>;

  loaded: boolean;

  setTree: (
    nodes: Record<string, NodeData>,
    childrenMap: Record<string, string[]>,
    version: number
  ) => void;

  addNode: (
  node: NodeData
) => void;

  updateNode: (
    id: string,
    updates: Partial<NodeData>
  )=> void;

  treeVersion: number;
}

export const useNodeStore = create<NodeStore>()(
  persist((set) => ({
    nodes: {},
    childrenMap: {},
    loaded:false,
    treeVersion:0,

    setTree: (nodes, childrenMap, version) =>
      set({
        nodes,
        childrenMap,
        loaded: true,
        treeVersion: version
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
      version:4
    })
);