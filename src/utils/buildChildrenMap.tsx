import type { NodeData } from "../types/node";

export function buildChildrenMap(nodes: Record<string, NodeData>) {
  const childrenMap: Record<string, string[]> = {};

  for (const node of Object.values(nodes)) {
    if (!node.parentId) continue;

    if (!childrenMap[node.parentId]) {
      childrenMap[node.parentId] = [];
    }

    childrenMap[node.parentId].push(node.id);
  }

  return childrenMap;
}
