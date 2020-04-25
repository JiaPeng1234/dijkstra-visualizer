import React, { Component } from "react";
import Node from "./Node/Node.jsx";
import NodeContainer from "./Node/NodeContainer.jsx";
import "./PathfindingVisualizer.css";
import { dijkstra, findShortestPath } from "./Algorithms/dijkstra.js";

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
    switch (document.getElementById(`node-${col}-${row}`).className) {
      case "node-wall":
        nodes[row][col].isWall = !nodes[row][col].isWall;
        document.getElementById(`node-${col}-${row}`).className = "node-item";
        break;
      case "node-item":
        nodes[row][col].isWall = !nodes[row][col].isWall;
        document.getElementById(`node-${col}-${row}`).className = "node-wall";
        break;
    }
  }

  handleMouseUp() {
    if (!this.state.mouseIsClicked) return;
    this.state.mouseIsClicked = false;
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsClicked) return;
    const { nodes } = this.state;
    switch (document.getElementById(`node-${col}-${row}`).className) {
      case "node-wall":
        nodes[row][col].isWall = !nodes[row][col].isWall;
        document.getElementById(`node-${col}-${row}`).className = "node-item";
        break;
      case "node-item":
        nodes[row][col].isWall = !nodes[row][col].isWall;
        document.getElementById(`node-${col}-${row}`).className = "node-wall";
        break;
    }
  }

  implementDijkstra() {
    const { nodes } = this.state;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodeInorder = dijkstra(startNode, finishNode, nodes);
    const shortestPathNodes = findShortestPath(finishNode);
    this.animateDijkstra(visitedNodeInorder, shortestPathNodes);
  }

  animateDijkstra(visitedNodeInorder, shortestPathNodes) {
    for (let i = 0; i < visitedNodeInorder.length; i++) {
      if (i === visitedNodeInorder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathNodes);
        }, 10 * i);
      } else {
        const { col, row } = visitedNodeInorder[i];
        setTimeout(() => {
          document.getElementById(`node-${col}-${row}`).className =
            "node-visited";
        }, 10 * i);
      }
    }
  }

  animateShortestPath(shortestPathNodes) {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      const { col, row } = shortestPathNodes[i];
      setTimeout(() => {
        document.getElementById(`node-${col}-${row}`).className =
          "node-shortestpath";
      }, 50 * i);
    }
  }

  render() {
    const { nodes } = this.state;
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
