import {combineReducers} from 'redux';
import {visibleReducer} from './visible';

export var settingsReducer = combineReducers({
    visible: visibleReducer('SETTINGS_VISIBILITY')
});
