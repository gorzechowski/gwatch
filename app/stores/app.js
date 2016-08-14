import {createStore} from 'redux';
import {appReducer} from '../reducers/app';

export var appStore = createStore(appReducer);
