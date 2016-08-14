import {app, Menu, Tray, ipcMain, BrowserWindow} from 'electron';
import * as _ from 'lodash';
import Icon from './platform/icon';

let icon = new Icon(process.platform, __dirname);

class Application {
    trayProgressText = 'GWatchD is busy';
    trayText = 'GWatchD is not working';

    env = null;
    mainWindow = null;
    tray = null;

    constructor(env) {
        this.env = env;
    }

    createTrayIcon = () => {
        this.tray = new Tray(icon.getTrayIcon());

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]);

        this.tray.setToolTip(this.trayText);
        this.tray.setContextMenu(contextMenu);
    }

    show = () => {
        this.mainWindow = new BrowserWindow({
            width: 600,
            height: 500,
            minWidth: 500,
            minHeight: 400,
            title: app.getName(),
            frame: false,
            icon: icon.getWindowIcon()
        });

        this.mainWindow.loadURL(`file://${__dirname}/index.html`);

        if(this.env === 'development') {
            this.mainWindow.webContents.openDevTools();
        }

        this.createTrayIcon();
    }

    run = () => {
        app.on('window-all-closed', () => {
            app.quit();
        });

        if(process.platform === 'darwin') {
            app.dock.setIcon(icon.getWindowIcon());
        }

        ipcMain.on('close-clicked', () => {
            app.quit();
        });

        ipcMain.on('minimize-clicked', () => {
            if(this.mainWindow !== null) {
                this.mainWindow.minimize();
            }
        });

        let jobStates = {};

        ipcMain.on('job-state-changed', (event, state) => {
            jobStates[state.job] = {
                isRunning: state.isRunning
            };

            let mapped = _.mapValues(jobStates, (value) => value.isRunning);

            if(_.values(mapped).indexOf(true) >= 0) {
                this.tray.setImage(icon.getTrayProgressIcon());
                this.tray.setToolTip(this.trayProgressText);
            } else {
                this.tray.setImage(icon.getTrayIcon());
                this.tray.setToolTip(this.trayText);
            }
        });

        app.on('ready', this.show);
    }
}

let application = new Application(_.isUndefined(process.env.NODE_ENV) ? 'development' : process.env.NODE_ENV);

application.run();
