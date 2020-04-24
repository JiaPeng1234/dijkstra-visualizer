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
      mouseIsClicked: false,
    };
  }

  componentDidMount() {
    const nodes = getInitialGrid();
    this.setState({ nodes });
  }

  handleMouseDown(row, col) {
    if (this.state.mouseIsClicked) return;
    this.state.mouseIsClicked = true;
    const { nodes } = this.state;
    if (
      document.getElementById(`node-${col}-${row}`).className === "node-wall"
    ) {
      nodes[row][col].isWall = !nodes[row][col].isWall;
      document.getElementById(`node-${col}-${row}`).className = "node-item";
    } else if (
      document.getElementById(`node-${col}-${row}`).className === "node-item"
    ) {
      nodes[row][col].isWall = !nodes[row][col].isWall;
      document.getElementById(`node-${col}-${row}`).className = "node-wall";
    }
    // console.log(document.getElementById(`node-${col}-${row}`));
    // console.log(nodes[row][col]);
    // console.log("down!");
    // console.log(this.s.mouseIsClicked);
  }

  handleMouseUp() {
    if (!this.state.mouseIsClicked) return;
    this.state.mouseIsClicked = false;
    // console.log("up!");
    // console.log(this.state.mouseIsClicked);
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsClicked) return;
    console.log("triggle enter!");
    const { nodes } = this.state;
    if (
      document.getElementById(`node-${col}-${row}`).className === "node-wall"
    ) {
      nodes[row][col].isWall = !nodes[row][col].isWall;
      document.getElementById(`node-${col}-${row}`).className = "node-item";
    } else if (
      document.getElementById(`node-${col}-${row}`).className === "node-item"
    ) {
      nodes[row][col].isWall = !nodes[row][col].isWall;
      document.getElementById(`node-${col}-${row}`).className = "node-wall";
    }
    // console.log(document.getElementById(`node-${col}-${row}`));
    // console.log(nodes[row][col]);
    // console.log("draw!");
    // console.log(this.state.mouseIsClicked);
  }

  implementDijkstra() {
    const { nodes } = this.state;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodeInorder = dijkstra(startNode, finishNode, nodes);
    for (let i = 0; i < visitedNodeInorder.length; i++) {
      if (i === visitedNodeInorder.length - 1) {
        console.log("finished!");
      } else {
        const { col, row } = visitedNodeInorder[i];
        setTimeout(() => {
          document.getElementById(`node-${col}-${row}`).className =
            "node-visited";
        }, 10 * i);
      }
    }
    // console.log(document.getElementById(`node-${17}-${10}`));
    // console.log(nodes[10][17]);
  }

  // testshowVisited() {
  // const { nodes } = this.state;
  // const a = this.state.nodes;
  // console.log(a);
  // console.log(document.getElementById(`node-${tovisit.col}-${tovisit.row}`));
  //document.getElementById(`node-${tovisit.row}-${tovisit.col}`).className =
  //("node-visited");
  // }

  render() {
    const { nodes } = this.state;
    return (
      <>
        <button
          className="grid"
          style={{ fontSize: 40 }}
          onClick={() => {
            this.implementDijkstra();
            // this.testshowVisited();
          }}
        >
          Visualize Dijkstra's Algorithms
        </button>
        <div className="grid">
          <NodeContainer>
            {nodes.map((row, rowIdx) =>
              row.map((node, nodeIdx) => {
                const { col, row, isStart, isFinish, isVisited, isWall } = node;
                return (
                  <Node
                    key={[col, row]}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                    isWall={isWall}
                    onMouseEnter={() => {
                      this.handleMouseEnter(row, col);
                    }}
                    onMouseDown={() => {
                      this.handleMouseDown(row, col);
                    }}
                    onMouseUp={() => {
                      this.handleMouseUp();
                    }}
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

// const toggleSetWall = (row, col, nodes) => {
//   const copyNewNodes = deepCopyAllNodes(nodes);
//   copyNewNodes[row][col].isWall = !copyNewNodes[row][col].isWall;
//   return copyNewNodes;
// };

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
