import React from 'react';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import Menu from 'material-ui/svg-icons/navigation/menu';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import {remote} from 'electron'

export class AppBar extends React.Component {
    onCloseClick = () => {
        if(this.context.ipc) {
            this.context.ipc.send('close-clicked');
        }
    }

    onMinimizeClick = () => {
        if(this.context.ipc) {
            this.context.ipc.send('minimize-clicked');
        }
    }

    onMenuClick = () => {
        this.context.store.dispatch({type: 'SETTINGS_VISIBILITY', visible: true});
    }

    onAboutClick = () => {
        this.context.store.dispatch({type: 'ABOUT_VISIBILITY', visible: true});
    }

    getIconButton(icon, onTouchTap = null) {
        return (
            <IconButton
                iconStyle={this.context.theme.appBar.icon}
                style={this.context.theme.appBar.iconButton}
                onTouchTap={onTouchTap} >

                {icon}
            </IconButton>
        );
    }

    render() {
        return (
            <Toolbar style={this.context.theme.appBar.container}>
                <ToolbarGroup firstChild={true}>
                    {this.getIconButton(<Menu />, this.onMenuClick)}

                    {this.getIconButton(<ActionInfoOutline />, this.onAboutClick)}
                </ToolbarGroup>

                <ToolbarGroup>
                    <ToolbarTitle style={this.context.theme.appBar.title} text={<b>{remote.app.getName().toUpperCase()}</b>} />
                </ToolbarGroup>

                <ToolbarGroup lastChild={true}>
                    {this.getIconButton(<ExpandMore />, this.onMinimizeClick)}

                    {this.getIconButton(<NavigationClose />, this.onCloseClick)}
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

AppBar.contextTypes = {
    theme: React.PropTypes.any.isRequired,
    store: React.PropTypes.any.isRequired,
    ipc: React.PropTypes.any
};
