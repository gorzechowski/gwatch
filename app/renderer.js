import React from 'react';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';
import {appStore} from './stores/app';
import {App} from './components/app/app';
import Socket from './socket';
import Settings from './utils/settings';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {ipcRenderer} from 'electron';

injectTapEventPlugin();

require('./style.css');

var socket = new Socket();

Settings.addListener('setting-changed', ({key, value}) => {
    if(key === Settings.websocketHost) {
        socket.connect(value);
    }
})

socket.addListener('connected', () => {
    appStore.dispatch({type: 'CONNECTED'});
});

socket.addListener('disconnected', () => {
    appStore.dispatch({type: 'DISCONNECTED'});
});

socket.addListener('event', (event) => {
    var event = JSON.parse(event.data);

    if(_.isUndefined(event.job)) {
        return;
    }

    appStore.dispatch({type: 'JOB_EVENT', event});
});

socket.connect(Settings.value(Settings.websocketHost, 'localhost'));

ReactDOM.render(<App ipc={ipcRenderer} />, document.getElementById('app'));
