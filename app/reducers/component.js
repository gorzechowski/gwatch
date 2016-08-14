import {combineReducers} from 'redux';
import {aboutReducer} from './about';
import {contextMenuReducer} from './context-menu';
import {settingsReducer} from './settings';
import {synchronizeJobBarReducer} from './synchronize-job-bar';

export var componentReducer = combineReducers({
    about: aboutReducer,
    contextMenu: contextMenuReducer,
    settings: settingsReducer,
    synchronizeJobBar: synchronizeJobBarReducer
});
