import React, { Component } from "react";
import Node from "./Node/Node.jsx";
import Legend from "./Legend/Legend.jsx";
import IconLegend from "./Legend/Icon-legend.jsx";
import Tutorial from "./Tutorial/Tutorial.jsx";
import { setStartNode, setStopNode, actionMouseUp } from "./Node/Node.jsx";
import NodeContainer from "./Node/NodeContainer.jsx";
import "./PathfindingVisualizer.css";
import { dijkstra, findShortestPath } from "./Algorithms/dijkstra.js";
import store from "./store";
import "antd/dist/antd.css";
import { Button } from "antd";
// import { ReloadOutlined } from "@ant-design/icons";

const START_NODE_COL = 15;
const START_NODE_ROW = 10;
const STOP_NODE_COL = 35;
const STOP_NODE_ROW = 10;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
    // create ref for each node
    this.nodeRefs = [];
    for (let i = 0; i < 20; i++) {
      let refRow = [];
      for (let j = 0; j < 50; j++) {
        let refNode = React.createRef();
        refRow.push(refNode);
      }
      this.nodeRefs.push(refRow);
    }
  }

  componentDidMount() {
    window.$(function () {
      window.Victor("container", "output"); // load background
    });
    const nodes = getInitialGrid();
    initStoreNodes(nodes);
    // just save the initial map for reset, actuell nodes are loaded from store
    this.setState({ nodes: nodes });
  }

  implementDijkstra() {
    setVistingAnimationTrue();
    const { nodes } = store.getState();
    const startNodeRow = store.getState().startNode[0];
    const startNodeCol = store.getState().startNode[1];
    const stopNodeRow = store.getState().stopNode[0];
    const stopNodeCol = store.getState().stopNode[1];
    const startNode = nodes[startNodeRow][startNodeCol];
    const stopNode = nodes[stopNodeRow][stopNodeCol];
    const visitedNodeInorder = dijkstra(startNode, stopNode, nodes);
    const shortestPathNodes = findShortestPath(stopNode);
    this.animateDijkstra(visitedNodeInorder, shortestPathNodes);
  }

  animateDijkstra(visitedNodeInorder, shortestPathNodes) {
    // here, use DOM directly which is not so good in React
    // considering this is the last step that needs to be animated it's ok
    // TODO: use render() function of each node instead
    for (let i = 0; i < visitedNodeInorder.length; i++) {
      if (i === visitedNodeInorder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathNodes);
        }, 10 * i);
      } else {
        const { col, row } = visitedNodeInorder[i];
        setTimeout(() => {
          this.makeOtherNodeRender(row, col);
          // document.getElementById(`node-${col}-${row}`).className =
          //   "node-visited";
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

  makeOtherNodeRender(row, col) {
    // console.log(row, col, "调用了makeOtherNodeRender");
    this.nodeRefs[row][col].current.setState({});
  }

  resetNodes() {
    const { nodes } = this.state;
    initStoreNodes(nodes);
    this.setState({});
    // after operating the DOM directly(in shortest path animating)
    // sometimes rerendering the same node will not set the DOM's class correctly
    // consider not operating DOMs directly in React.
    // to fix this visu problem, we add here:
    document.getElementById(
      `node-${STOP_NODE_COL}-${STOP_NODE_ROW}`
    ).className = "node-stop";
  }

  handleOk() {
    this.setState({
      visible: false,
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  render() {
    // console.log("调用了app render");
    // notice that nodes getted through getState() should be deeply copied from Redux store
    const nodes = store.getState().nodes;
    return (
      <>
        {/* <Tutorial></Tutorial> */}

        <div id="container">
          <div id="output"></div>
        </div>

        <Button
          className="btn-reset"
          onClick={() => {
            this.resetNodes();
          }}
          type="primary"
          shape="circle"
          size="small"
          icon={
            <svg aria-hidden="true" className="icon-reset">
              <use xlinkHref="#icon-Reset" />
            </svg>
          }
        ></Button>

        <Button
          className="toggle"
          onClick={() => {
            this.implementDijkstra();
          }}
          type="primary"
          shape="round"
          size="middle"
        >
          Visualize Dijkstra's Algorithm
        </Button>

        <div className="grid-container">
          <div className="legend-container">
            <Legend
              legendClass="legend-start"
              context="Start Node"
            />
            <Legend
              legendClass="legend-stop"
              context="Stop Node"
            />
            <Legend
              legendClass="legend-item"
              context="Unvisited Node"
            />
            <Legend
              legendClass="legend-visited"
              context="Visited Node"
            />
            <Legend
              legendClass="legend-shortestpath"
              context="Shortest-path Node"
            />
            <Legend
              legendClass="legend-wall"
              context="Wall"
            />
            <IconLegend
              LegendIconClass="legend-reset"
              svg="#icon-Reset"
              context="Reset"
            />
          </div>
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
                      ref={this.nodeRefs[row][col]}
                      makeOtherNodeRender={(preRow, preCol) => {
                        this.makeOtherNodeRender(preRow, preCol);
                      }}
                    ></Node>
                  );
                })
              )}
            </NodeContainer>
          </div>
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
  setVistingAnimationFalse();
  actionMouseUp();
  resetPreviousNode();
  setStartNode(START_NODE_ROW, START_NODE_COL);
  setStopNode(STOP_NODE_ROW, STOP_NODE_COL);
  const action = {
    type: "init_nodes",
    value: nodes,
  };
  store.dispatch(action);
};

const setVistingAnimationFalse = () => {
  const action = {
    type: "set_visit_animate_false",
  };
  store.dispatch(action);
};

const setVistingAnimationTrue = () => {
  const action = {
    type: "set_visit_animate_true",
  };
  store.dispatch(action);
};

const resetPreviousNode = () => {
  const action = {
    type: "reset_previous_node",
  };
  store.dispatch(action);
};

// const setShortPathAnimationFalse = () => {
//   const action = {
//     type: "set_path_animate_false",
//   };
//   store.dispatch(action);
// };

// const setShortPathAnimationTrue = () => {
//   const action = {
//     type: "set_path_animate_true",
//   };
//   store.dispatch(action);
// };
