import type { NodeData } from "../types/node";

export function getNode(nodes: Record<string, NodeData>, id: string) {
  return nodes[id];
}

export function getChildren(
  nodes: Record<string, NodeData>,
  childrenMap: Record<string, string[]>,
  id: string,
) {
  const childIds = childrenMap[id] ?? [];

  return childIds
    .map((childId) => nodes[childId])
    .sort((a, b) => a.sibOrder - b.sibOrder);
}
