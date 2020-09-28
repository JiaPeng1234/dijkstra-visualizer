// 说明：现在卡了一个问题，兄弟组件之间的通信，我最后还是使用了底层html来直接对页面
// 进行修改，决定是否更新的flag是从redux store中拿到的，但是出现了问题：
// 可以先跑起来试一下，拖动起点或者终点再往回拖得时候会发现，之前”路径上“的node不会变成起点或者终点
import React, { Component } from "react";
import Node from "./Node/Node.jsx";
import NodeContainer from "./Node/NodeContainer.jsx";
import "./PathfindingVisualizer.css";
import { dijkstra, findShortestPath } from "./Algorithms/dijkstra.js";
import store from './store';

let START_NODE_COL = 15;
let START_NODE_ROW = 10;
let STOP_NODE_COL = 35;
let STOP_NODE_ROW = 10;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(store.getState());
  }

  componentDidMount() {
    const nodes = getInitialGrid();
    initStoreNodes(nodes);
    this.setState({ });
  }

  implementDijkstra() {
    const {nodes} = store.getState();
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const stopNode = nodes[STOP_NODE_ROW][STOP_NODE_COL];
    const visitedNodeInorder = dijkstra(startNode, stopNode, nodes);
    const shortestPathNodes = findShortestPath(stopNode);
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
    console.log("调用了app render")
    const nodes = store.getState().nodes; // getState得到的nodes一定是从store深拷贝过来的
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
                const { col, row } = node;
                return (
                  <Node
                    key={[col, row]}
                    col={col}
                    row={row}
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
      const currentNode = createNode(row, col);
      currentRow.push(currentNode);
    }
    nodes.push(currentRow);
  }
  return nodes;
};

const createNode = (row, col) => {
  // this.state.nodes[row][col].isWall
  return {
    col: col,
    row: row,
    value: 1,
    preciousnode: null,
    isWall: false,
    distance: Infinity,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isStop: row === STOP_NODE_ROW && col === STOP_NODE_COL,
    isVisited: false,
  };
};

const initStoreNodes = (nodes) => {
  const action = {
    type: "init_nodes",
    value: nodes
  };
  store.dispatch(action);
}