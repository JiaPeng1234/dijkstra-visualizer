import React, { Component } from "react";
import Node from "./Node/Node.jsx";
import NodeContainer from "./Node/NodeContainer.jsx";
import "./PathfindingVisualizer.css";
import { dijkstra } from "./Algorithms/dijkstra.js";
// import "./Node/Node.css";

const START_NODE_COL = 15;
const START_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const FINISH_NODE_ROW = 10;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = getInitialGrid();
    // console.log(nodes);
    this.setState({ nodes });
  }

  implementDijkstra() {
    const { nodes } = this.state;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    // const originalAllNodes = getAllNodes(nodes);
    // console.log(originalAllNodes);
    // const allNodesInorder = originalAllNodes.slice();
    // allNodesInorder[2][2].isVisited = true;
    // allNodesInorder[3][3].distance = 4;
    // console.log(allNodesInorder);
    const visitedNodeInorder = dijkstra(startNode, finishNode, nodes);
    console.log(nodes);
    for (let i = 0; i < visitedNodeInorder.length; i++) {
      if (i == visitedNodeInorder.length - 1) {
        console.log("finished!");
      } else {
        const { col, row } = visitedNodeInorder[i];
        setTimeout(() => {
          nodes[row][col] = visitedNodeInorder[i];
          console.log(i);
          this.setState({ nodes });
        }, 50 * i);
        // console.log("hey");
        // const newNodes = this.state.nodes.slice();
        // console.log(newNodes);
        // const newNode = visitedNodeInorder[i];
        // console.log(originalAllNodes);
        // document.getElementById(`node-${col}-${row}`)
      }
    }
    // console.log(this.state);
    // this.setState(this.state.nodes);
  }

  testshowVisited() {
    const { nodes } = this.state;
    const tovisit = nodes[10][25];
    // console.log(tovisit);
    // console.log(document.getElementById(`node-${tovisit.col}-${tovisit.row}`));
    //document.getElementById(`node-${tovisit.row}-${tovisit.col}`).className =
    //("node-visited");
  }

  render() {
    const { nodes } = this.state;
    // console.log(nodes);
    return (
      <>
        <button
          className="grid"
          style={{ fontSize: 40 }}
          onClick={() => {
            this.implementDijkstra();
          }}
        >
          Visualize Dijkstra's Algorithms
        </button>
        <div className="grid">
          <NodeContainer>
            {nodes.map((row, rowIdx) =>
              row.map((node, nodeIdx) => {
                const { col, row, isStart, isFinish, isVisited } = node;
                return (
                  <Node
                    key={[col, row]}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                  ></Node>
                );
              })
            )}
          </NodeContainer>
        </div>
      </>
    );
  }
}

const getAllNodes = (nodes) => {
  const allNodesInorder = [];
  for (const row of nodes) {
    for (const node of row) {
      allNodesInorder.push(node);
    }
  }
  return allNodesInorder;
};

const getInitialGrid = () => {
  const nodes = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      const currentNode = createNode(col, row);
      currentRow.push(currentNode);
    }
    nodes.push(currentRow);
  }
  return nodes;
};

const createNode = (col, row) => {
  return {
    col: col,
    row: row,
    value: 1,
    preciousnode: null,
    isWall: false,
    distance: Infinity,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
  };
};
// const getInitialGrid = () => {
//   const grid = [];
//   for (let row = 0; row < 20; row++) {
//     const currentRow = [];
//     for (let col = 0; col < 50; col++) {
//       currentRow.push(createNode(col, row));
//     }
//     grid.push(currentRow);
//   }
//   return grid;
// };

// const createNode = (col, row) => {
//   return {
//     col,
//     row,
//     isStart: row === START_NODE_ROW && col === START_NODE_COL,
//     isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//     distance: Infinity,
//     isVisited: false,
//     isWall: false,
//     previousNode: null,
//   };
// };

// const getNewGridWithWallToggled = (grid, row, col) => {
//   const newGrid = grid.slice();
//   const node = newGrid[row][col];
//   const newNode = {
//     ...node,
//     isWall: !node.isWall,
//   };
//   newGrid[row][col] = newNode;
//   return newGrid;
// };
