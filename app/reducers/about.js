import {combineReducers} from 'redux';
import {visibleReducer} from './visible';

export var aboutReducer = combineReducers({
    visible: visibleReducer('ABOUT_VISIBILITY')
});
