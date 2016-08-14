import {combineReducers} from 'redux';
import {connectionReducer} from './connection';
import {componentReducer} from './component';
import {themeReducer} from './theme';

export var appReducer = combineReducers({
    connected: connectionReducer,
    component: componentReducer,
    theme: themeReducer
});
