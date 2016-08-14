import path from 'path';

var osxDockIcon = require('./osx/icon-dock@2x.png');
var osxTrayIcon = require('./osx/iconTemplate@2x.png');
var osxTrayProgressIcon = require('./osx/icon-progressTemplate@2x.png');
var windowIcon = require('./icon.png');
var trayProgressIcon = require('./icon-progress.png');

export default class Icon {
    platform;
    path;

    constructor(platform, path = '') {
        this.platform = platform;
        this.path = path;
    }

    getWindowIcon = () => {
        let icon;

        if(this.platform === 'darwin') {
            icon = osxDockIcon;
        } else {
            icon = windowIcon;
        }

        return path.join(this.path, icon);
    }

    getTrayIcon = () => {
        let icon;

        if(this.platform === 'darwin') {
            icon = osxTrayIcon;
        } else {
            icon = windowIcon;
        }

        return path.join(this.path, icon);
    }

    getTrayProgressIcon = () => {
        let icon;

        if(this.platform === 'darwin') {
            icon = osxTrayProgressIcon;
        } else {
            icon = trayProgressIcon;
        }

        return path.join(this.path, icon);
    }
}
