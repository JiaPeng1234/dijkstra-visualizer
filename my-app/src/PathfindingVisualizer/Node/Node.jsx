import React, { Component } from "react";
import "./Node.css";
import store from "../store";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.nodeRef = React.createRef();
  }

  handleMouseDown() {
    let row = this.props.row;
    let col = this.props.col;
    // console.log(this.props);
    if (store.getState().nodes[row][col].isStart) {
      if (store.getState().dragStartPoint) return;
      actionDragStart();
    } else if (store.getState().nodes[row][col].isStop) {
      if (store.getState().dragStopPoint) return;
      actionDragStop();
    } else {
      if (store.getState().mouseIsClicked) return;
      mouseClickTrue();
      updateToggledWall(row, col);
    }
    if (!store.getState().visitingAnimation) {
      this.setState({});
    }
  }

  handleMouseUp() {
    if (
      !store.getState().mouseIsClicked &&
      !store.getState().dragStartPoint &&
      !store.getState().dragStopPoint
    ) {
      return;
    }
    let row = this.props.row;
    let col = this.props.col;
    if (store.getState().dragStartPoint) {
      if (!store.getState().nodes[row][col].isStop) {
        setStartNode(row, col);
      }
    } else if (store.getState().dragStopPoint) {
      if (!store.getState().nodes[row][col].isStart) {
        setStopNode(row, col);
      }
    }
    actionMouseUp();
  }

  handleMouseEnter() {
    // get row col of current node
    let row = this.props.row;
    let col = this.props.col;
    // here, if the node being entered is not starter nor stopper, the previous start/stop node should be cleared
    if (
      !store.getState().nodes[row][col].isStart &&
      !store.getState().nodes[row][col].isStop
    ) {
      if (store.getState().dragStopPoint) {
        let preRow = store.getState().previousNode[0];
        let preCol = store.getState().previousNode[1];
        updateStopNode(row, col);
        deleteNode(preRow, preCol);
        this.setState({});
        this.props.makeOtherNodeRender(preRow, preCol);
      } else if (store.getState().dragStartPoint) {
        let preRow = store.getState().previousNode[0];
        let preCol = store.getState().previousNode[1];
        updateStartNode(row, col);
        deleteNode(preRow, preCol);
        this.setState({});
        this.props.makeOtherNodeRender(preRow, preCol);
      } else if (store.getState().mouseIsClicked) {
        updateToggledWall(row, col);
        this.setState({});
      } else {
        return;
      }
    }
  }

  handleMouseLeave() {
    let row = this.props.row;
    let col = this.props.col;
    if (store.getState().dragStartPoint) {
      if (!store.getState().nodes[row][col].isStop) {
        registerPreviousNode(row, col);
      }
    } else if (store.getState().dragStopPoint) {
      if (!store.getState().nodes[row][col].isStart) {
        registerPreviousNode(row, col);
      }
    }
  }

  render() {
    const { row, col } = this.props;
    if (!store.getState().visitingAnimation) {
      const { isWall, isStart, isStop } = store.getState().nodes[row][col];
      // console.log(row, col, "调用了render函数");
      // console.log("isWall, isStart, isStop,", isWall, isStart, isStop);
      const extraClass = isStop
        ? "node-stop"
        : isStart
        ? "node-start"
        : isWall
        ? "node-wall"
        : "node-item";
      return (
        <div
          draggable={false}
          id={`node-${col}-${row}`}
          className={extraClass}
          onMouseDown={() => {
            this.handleMouseDown();
          }}
          onMouseUp={() => {
            this.handleMouseUp();
          }}
          onMouseEnter={() => {
            this.handleMouseEnter();
          }}
          onMouseLeave={() => {
            this.handleMouseLeave();
          }}
          onDragStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        ></div>
      );
    } else if (store.getState().visitingAnimation) {
      return <div id={`node-${col}-${row}`} className="node-visited"></div>;
    }
  }
}

const updateToggledWall = (row, col) => {
  let nodes = store.getState().nodes;
  nodes[row][col].isWall = !nodes[row][col].isWall;
  const action = {
    type: "update_wall",
    value: nodes,
  };
  store.dispatch(action);
};

const mouseClickTrue = () => {
  const action = {
    type: "set_mouseClick_true",
  };
  store.dispatch(action);
};

export const actionMouseUp = () => {
  const action = {
    type: "mouse_up",
  };
  store.dispatch(action);
};

const actionDragStart = () => {
  const action = {
    type: "drag_start",
  };
  store.dispatch(action);
};

const actionDragStop = () => {
  const action = {
    type: "drag_stop",
  };
  store.dispatch(action);
};

const updateStartNode = (row, col) => {
  let nodes = store.getState().nodes;
  if (!nodes[row][col].isStop) {
    nodes[row][col].isStart = true;
    nodes[row][col].isWall = false;
    const action = {
      type: "update_start",
      value: nodes,
    };
    store.dispatch(action);
  }
};

const updateStopNode = (row, col) => {
  let nodes = store.getState().nodes;
  if (!nodes[row][col].isStart) {
    nodes[row][col].isStop = true;
    nodes[row][col].isWall = false;
    const action = {
      type: "update_stop",
      value: nodes,
    };
    store.dispatch(action);
  }
};

const deleteNode = (row, col) => {
  let nodes = store.getState().nodes;
  nodes[row][col].isStop = false;
  nodes[row][col].isStart = false;
  nodes[row][col].isWall = false;
  const action = {
    type: "delete_node",
    value: nodes,
  };
  store.dispatch(action);
};

const registerPreviousNode = (row, col) => {
  const action = {
    type: "set_pre_node",
    value: [row, col],
  };
  store.dispatch(action);
};

export const setStopNode = (row, col) => {
  const action = {
    type: "set_stop_node",
    value: [row, col],
  };
  store.dispatch(action);
};

export const setStartNode = (row, col) => {
  const action = {
    type: "set_start_node",
    value: [row, col],
  };
  store.dispatch(action);
};

// export default connect(mapStateToProps)(Node)
