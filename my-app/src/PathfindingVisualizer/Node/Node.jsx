import React, { Component } from "react";
import "./Node.css";
import store from "../store";
import { connect } from "react-redux";
// TODO: github要保留以前的代码，改之后要新建一个分支
// TODO: 起终点交叉的问题解决掉;加上图例;还有一个问题，为什么不可以在willmount下面初次渲染;修复起点终点墙问题；改好局部渲染；去除鼠标变成禁止号的bug; 加上基本背景；使得起点和终点可以移动；refine结束之后怎么办；；加上说明；refine page size; 再加上一个reset键位; 给点击添加墙壁加上动画
export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMouseDown() {
    let row = this.props.row;
    let col = this.props.col;
    if (store.getState().nodes[row][col].isStart) {
      if (store.getState().dragStartPoint) return;
      actionDragStart();
      // updateStartNode(row, col);
    } else if (store.getState().nodes[row][col].isStop) {
      if (store.getState().dragStopPoint) return;
      actionDragStop();
      // updateStopNode(row, col);
    } else {
      if (store.getState().mouseIsClicked) return;
      mouseClickTrue();
      updateToggledWall(row, col);
    }
    this.setState({});
  }

  // handleMouseDown() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("handleMouseDown生效了", row, col);
  //   updateToggledWall(row, col);
  //   this.setState({});
  // }

  handleMouseUp() {
    if (
      !store.getState().mouseIsClicked &&
      !store.getState().dragStartPoint &&
      !store.getState().dragStopPoint
    )
      return;
    actionMouseUp();
  }

  handleMouseEnter() {
    // get row col of current node
    let row = this.props.row;
    let col = this.props.col;
    // here, if the node being entered is not starter nor stopper, the previous start/stop node should be cleared
    if (!store.getState().nodes[row][col].isStart && !store.getState().nodes[row][col].isStop) {
      let preRow = store.getState().previousNode[0];
      let preCol = store.getState().previousNode[1];
      if (store.getState().dragStopPoint) {
        updateStopNode(row, col);
        deleteNode(preRow, preCol);
        document.getElementById(`node-${preCol}-${preRow}`).className="node-item";
        this.setState({});
      } else if (store.getState().dragStartPoint) {
        console.log("调用了enter函数");
        updateStartNode(row, col);
        deleteNode(preRow, preCol);
        document.getElementById(`node-${preCol}-${preRow}`).className="node-item";
        this.setState({});
      } else if (store.getState().mouseIsClicked) {
        console.log("hello");
        updateToggledWall(row, col);
        this.setState({});
      } else {
        return;
      }
    }
  }

  // handleMouseEnter() {
  //     let row = this.props.row;
  //     let col = this.props.col;
  //     console.log("handleMouseEnter生效了", row, col);
  //     updateToggledWall(row, col);
  //     this.setState({});
  //   }

  handleMouseLeave() {
    // console.log(this.props.nodeSelf);
    // console.log(this.props);
    // console.log(store.getState().nodes);
    if (store.getState().dragStartPoint || store.getState().dragStopPoint) {
      let row = this.props.row;
      let col = this.props.col;
      registerPreviousNode(row, col);
      // deleteNode(row, col);
      // this.setState({});
    }
    // setRemainFalse();
  }

  // handleDragEnter() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("dragEnter生效了", row, col);
  //   // updateToggledWall(row, col);
  //   // this.setState({});
  // }

  // handleDrag() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("handleDrag生效了", row, col);
  //   this.handleMouseEnter();
  // }
  // handleDragEnd() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("handleDragEnd生效了", row, col);
  // }
  // handleDragExit() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("handleDragExit生效了", row, col);
  // }
  // handleDragLeave() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("handleDragLeave生效了", row, col);
  // }
  // handleDragOver() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   this.handleMouseEnter();

  //   console.log("handleDragOver生效了", row, col);
  // }
  // handleDragStart() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("onDragStart生效了", row, col);
  // }
  // handleDrop() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("handleDrop生效了", row, col);
  // }
  // handleDrag() {
  //   let row = this.props.row;
  //   let col = this.props.col;
  //   console.log("handleDrag生效了", row, col);
  // }

  render() {
    const { row, col } = this.props;
    console.log(row, col, "调用了render函数");
    const { isWall, isStart, isStop } = store.getState().nodes[row][col];
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


        // onDragEnter={() => {
        //   this.handleDragEnter();
        // }}
        // onDrag={() => {
        //   this.handleDrag();
        // }}
        // onDragEnd={() => {
        //   this.handleDragEnd();
        // }}
        // onDragExit={() => {
        //   this.handleDragExit();
        // }}
        // onDragLeave={() => {
        //   this.handleDragLeave();
        // }}
        // onDragOver={() => {
        //   // this.handleDragOver();
        //   this.handleMouseEnter();

        // }}
        onDragStart={e => {
            e.preventDefault();
            e.stopPropagation();
          }
        }
        // onDrop={() => {
        //   // this.handleDrop();
        //   this.handleMouseEnter();

        // }}
        // onMouseEnter={() => {
        //   this.handleMouseEnter();
        // }}
        // onMouseDown={() => {
        //   console.log("onMouseDown 触发");
        // }}
        // onMouseEnter={() => {
        //   console.log("onMouseEnter 触发");
        // }}
        // onMouseLeave={() => {
        //   console.log("onMouseLeave 触发");
        // }}
        // onMouseMove={() => {
        //   console.log("onMouseMove 触发");
        // }}
        // onMouseOut={() => {
        //   console.log("onMouseOut 触发");
        // }}
        // onMouseOver={() => {
        //   console.log("onMouseOver 触发");
        // }}
        // onMouseUp={() => {
        //   console.log("onMouseUp 触发");
        // }}
        // onMouseOut={() => {
        //   console.log("onMouseOut 触发");
        // }}

        // onMouseOver={() => {
        //   console.log("mouseover 触发");
        // }}
      ></div>
    );
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

const actionMouseUp = () => {
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

// const setRemainFalse = () => {
//   const action = {
//     type: "set_remain_false",
//   };
//   store.dispatch(action);
// };

// const setRemainTrue = () => {
//   const action = {
//     type: "set_remain_true",
//   };
//   store.dispatch(action);
// };

// const testAction= () => {
//   const action = {
//     type: "test_action",
//   };
//   store.dispatch(action);
// }

// const mapStateToProps = (state, ownProps) => {
//   const {
//     col,
//     row,
//   } = ownProps;
//   // let nodeSelf = "nodeSelf-" + row + "-" + col;
//   return{
//     nodeSelf: getNodeSelf(state.nodes, row, col)
//   }
// }

// const getNodeSelf = createSelector(
//   [stateNodes, row, col],
//   (stateNodes, row, col) => {
//     return stateNodes[row][col]
//   }
// )

const registerPreviousNode = (row, col) => {
  const action = {
    type: "set_pre_node",
    value: [row, col],
  };
  store.dispatch(action);
}

// export default connect(mapStateToProps)(Node)
