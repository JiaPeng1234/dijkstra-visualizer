const defaultState = {
    mouseIsClicked: false,
    dragStartPoint: false,
    dragStopPoint: false,
    visitingAnimation: false,
    // shortPathAnimation: false,
    nodes: [],
    previousNode: [],
    startNode: [10, 15],
    stopNode: [10, 35]
}

export default (state = defaultState, action) => {
    if(action.type === 'set_mouseClick_true' && !state.visitingAnimation){
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
    if(action.type === 'init_nodes' || action.type === 'delete_node'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.nodes = action.value;
        return newState;
    }
    if(!state.visitingAnimation && (action.type === 'update_wall' || action.type === 'update_start' || action.type === 'update_stop')){
        const newState = JSON.parse(JSON.stringify(state));
        newState.nodes = action.value;
        return newState;
    }
    if(!state.visitingAnimation && action.type === 'drag_start'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.dragStartPoint = true;
        return newState;
    }
    if(!state.visitingAnimation && action.type === 'drag_stop'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.dragStopPoint = true;
        return newState;
    }
    if(action.type === 'set_pre_node'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.previousNode = action.value;
        return newState;
    }
    if(action.type === 'set_start_node'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.startNode = action.value;
        return newState;
    }
    if(action.type === 'set_stop_node'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.stopNode = action.value;
        return newState;
    }
    if(action.type === 'set_visit_animate_true'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.visitingAnimation = true;
        return newState;
    }
    if(action.type === 'set_visit_animate_false'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.visitingAnimation = false;
        return newState;
    }
    if(action.type === 'reset_previous_node'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.previousNode = [];
        return newState;
    }
    
    // if(action.type === 'set_path_animate_true'){
    //     const newState = JSON.parse(JSON.stringify(state));
    //     newState.shortPathAnimation = true;
    //     return newState;
    // }
    // if(action.type === 'set_path_animate_false'){
    //     const newState = JSON.parse(JSON.stringify(state));
    //     newState.shortPathAnimation = false;
    //     return newState;
    // }

    return state;
}