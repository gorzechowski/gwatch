import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {SynchronizeJobBar} from '../synchronize-job-bar/synchronize-job-bar';
import {CommandJobBar} from '../command-job-bar/command-job-bar';
import {appStore} from '../../stores/app';
import {Settings as SettingsComponent} from '../settings/settings';
import {ContextMenu} from '../context-menu/context-menu';
import Settings from '../../utils/settings';
import {AppBar} from '../app-bar/app-bar';
import {About} from '../about/about';
import {NoConnection} from '../no-connection/no-connection';
import * as systemNotification from '../../notification/system';
import * as soundNotification from '../../notification/sound';
import Notification from '../../notification/notification';
import * as darkTheme from '../../theme/dark.js';
import * as lightTheme from '../../theme/common.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

let notification = new Notification();

let themes = [lightTheme, darkTheme];

if(Settings.value(Settings.notificationsSystem)) {
    notification.add(systemNotification);
}

if(Settings.value(Settings.notificationsSound)) {
    notification.add(soundNotification);
}

Settings.addListener('setting-changed', ({key, value}) => {
    switch(key) {
        case Settings.notificationsSystem:
            if(value) {
                notification.add(systemNotification);
            } else {
                notification.remove(systemNotification);
            }

            break;

        case Settings.notificationsSound:
            if(value) {
                notification.add(soundNotification);
            } else {
                notification.remove(soundNotification);
            }

            break;

        default:
            break;
    }
});

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    getChildContext = () => {
        return {
            ipc: this.props.ipc,
            settings: Settings,
            notification,
            theme: this.state.theme,
            store: appStore
        };
    }

    state = {
        connected: false,
        theme: themes[Settings.value(Settings.theme, 0)]
    };

    componentWillMount = () => {
        appStore.subscribe(() => {
            var state = appStore.getState();

            this.setState({
                connected: state.connected,
                theme: state.theme
            });
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={this.state.theme.muiTheme ? getMuiTheme(this.state.theme.muiTheme) : getMuiTheme({})}>
                <div style={this.state.theme.app.container}>
                    <AppBar />

                    <About />

                    <SettingsComponent />

                    <ContextMenu />

                    {
                        this.state.connected ?
                            <div style={this.state.theme.app.content}>
                                <SynchronizeJobBar />
                                <CommandJobBar />
                            </div>
                        :
                            <NoConnection />
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}

App.childContextTypes = {
    settings: React.PropTypes.any.isRequired,
    theme: React.PropTypes.any.isRequired,
    store: React.PropTypes.any.isRequired,
    ipc: React.PropTypes.any,
    notification: React.PropTypes.any
};
