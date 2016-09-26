import {combineReducers} from 'redux';
import {commandJobReducer} from './command-job';

export var commandJobBarReducer = combineReducers({
    job: commandJobReducer
});
