export var connectionReducer = (state = false, action) => {
    switch(action.type) {
        case 'CONNECTED':
            return true;

        case 'DISCONNECTED':
            return false;

        default:
            break;
    }

    return state;
};
