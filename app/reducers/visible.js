export var visibleReducer = (type) => (state = false, action) => {
    if(action.type === type) {
        return action.visible;
    }

    return state;
}
