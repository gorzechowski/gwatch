import {combineReducers} from 'redux';
import {synchronizeJobReducer} from './synchronize-job';

export var synchronizeJobBarReducer = combineReducers({
    job: synchronizeJobReducer
});
