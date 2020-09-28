const defaultState = {
    mouseIsClicked: false,
    dragStartPoint: false,
    dragStopPoint: false,
    nodes: [],
    previousNode: [],
}

export default (state = defaultState, action) => {
    if(action.type === 'set_mouseClick_true'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.mouseIsClicked = true;
        return newState;
    }
    if(action.type === 'mouse_up'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.mouseIsClicked = false;
        newState.dragStartPoint = false;
        newState.dragStopPoint = false;
        return newState;
    }
    if(action.type === 'init_nodes' || action.type === 'update_wall' || action.type === 'update_start' || action.type === 'update_stop' || action.type === 'delete_node'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.nodes = action.value;
        return newState;
    }
    if(action.type === 'drag_start'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.dragStartPoint = true;
        return newState;
    }
    if(action.type === 'drag_stop'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.dragStopPoint = true;
        return newState;
    }
    if(action.type === 'set_pre_node'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.previousNode = action.value;
        return newState;
    }
    // if(action.type === 'set_remain_true'){
    //     const newState = JSON.parse(JSON.stringify(state));
    //     newState.remain = true;
    //     return newState;
    // }
    // if(action.type === 'set_remain_false'){
    //     const newState = JSON.parse(JSON.stringify(state));
    //     newState.remain = false;
    //     return newState;
    // }

    return state;
}