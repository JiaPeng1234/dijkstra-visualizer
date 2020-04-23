export function dijkstra(startNode, finishNode, allNodes) {
  // const copyAllNodes = deepCopyAllNodes(allNodes);
  // const copyStartNode = copyAllNodes[startNode.row][startNode.col];
  // const copyFinishNode = copyAllNodes[finishNode.row][finishNode.col];
  startNode.distance = 0;
  const Heap = [startNode];
  const visited = [];
  while (true) {
    heapsort(Heap);
    const cur = Heap.shift();
    if (cur.isVisited || cur.isWall) continue;
    cur.isVisited = true;
    visited.push(cur);
    if (cur == finishNode) {
      return visited;
    }
    const curNeighbors = getCurNeighbors(cur, allNodes);
    for (const neighbor of curNeighbors) {
      neighbor.distance = cur.distance + 1;
      neighbor.preciousnode = cur;
      Heap.push(neighbor);
    }
  }
}

function heapsort(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getCurNeighbors(cur, allNodes) {
  const neighbors = [];
  const { col, row } = cur;
  if (row > 0) neighbors.push(allNodes[row - 1][col]);
  if (col > 0) neighbors.push(allNodes[row][col - 1]);
  if (row < allNodes.length - 1) neighbors.push(allNodes[row + 1][col]);
  if (col < allNodes[0].length - 1) neighbors.push(allNodes[row][col + 1]);
  // neighbors = neighbors.filter((a) => !a.isVisited);
  return neighbors;
}

// function deepCopyAllNodes(grid) {
//   const newGrid = [];
//   for (const row of grid) {
//     const newGridRow = [];
//     for (const node of row) {
//       newGridRow.push({ ...node });
//     }
//     newGrid.push(newGridRow);
//   }
//   return newGrid;
// }

export function getShortestPath(finishNode) {}
