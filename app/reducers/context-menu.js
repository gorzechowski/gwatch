import {combineReducers} from 'redux';
import {visibleReducer} from './visible';

export var contextMenuReducer = combineReducers({
    visible: visibleReducer('CONTEXT_MENU_VISIBILITY')
});
