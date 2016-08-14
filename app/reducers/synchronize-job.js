export var synchronizeJobReducer = (state = {isRunning: false, isError: false}, action) => {
    switch(action.type) {
        case 'JOB_EVENT':
            if(action.event.job !== 'synchronize') {
                return state;
            }

            return {
                isRunning: action.event.state === 'started' || action.event.state === 'running',
                isError: action.event.state === 'failed'
            };

        default:
            break;
    }

    return state;
}
