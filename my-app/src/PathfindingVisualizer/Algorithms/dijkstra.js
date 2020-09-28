export function dijkstra(startNode, finishNode, allNodes) {
  startNode.distance = 0;
  const Heap = [startNode];
  const visited = [];
  while (true) {
    if (Heap.length === 0) {
      visited.push(visited[visited.length - 1]);
      return visited;
    }
    heapsort(Heap);
    const cur = Heap.shift();
    if (cur.isVisited || cur.isWall) continue;
    cur.isVisited = true;
    visited.push(cur);
    if (cur === finishNode) return visited;
    updateUnvisitedNeighbors(cur, allNodes, Heap);
  }
}

function heapsort(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(cur, allNodes, Heap) {
  const curNeighbors = getCurNeighbors(cur, allNodes);
  for (const neighbor of curNeighbors) {
    neighbor.distance = cur.distance + 1;
    neighbor.preciousnode = cur;
    Heap.push(neighbor);
  }
}

function getCurNeighbors(cur, allNodes) {
  const neighbors = [];
  const { col, row } = cur;
  if (row > 0) neighbors.push(allNodes[row - 1][col]);
  if (col > 0) neighbors.push(allNodes[row][col - 1]);
  if (row < allNodes.length - 1) neighbors.push(allNodes[row + 1][col]);
  if (col < allNodes[0].length - 1) neighbors.push(allNodes[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function findShortestPath(finishNode) {
  if (finishNode.preciousnode == null) return [];
  const shortestPathNodes = [finishNode];
  while (true) {
    if (shortestPathNodes[0].isStart) return shortestPathNodes;
    const pathHead = shortestPathNodes[0];
    shortestPathNodes.unshift(pathHead.preciousnode);
  }
}

// const deepCopyAllNodes = (nodes) => {
//   const newNodes = [];
//   for (const row of nodes) {
//     const newNodesRow = [];
//     for (const node of row) {
//       newNodesRow.push({ ...node });
//     }
//     newNodes.push(newNodesRow);
//   }
//   return newNodes;
// };
