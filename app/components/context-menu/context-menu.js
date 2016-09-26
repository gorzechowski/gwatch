import React from 'react';
import ReactDOM from 'react-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import * as _ from 'lodash';

export class ContextMenu extends React.Component {
    left = 0;
    top = 0;

    state = {
        visible: false
    };

    onRequestClose = () => {
        this.context.store.dispatch({type: 'CONTEXT_MENU_VISIBILITY', visible: false});
    }

    onQuitClick = () => {
        if(this.context.ipc) {
            this.context.ipc.send('quit-clicked');
        }
    }

    componentWillMount = () => {
        this.context.store.subscribe(() => {
            var state = this.context.store.getState();


            this.setState({
                visible: state.component.contextMenu.visible
            });
        });

        window.addEventListener('contextmenu', (e) => {
            this.top = e.clientY;
            this.left = e.clientX;

            this.context.store.dispatch({type: 'CONTEXT_MENU_VISIBILITY', visible: true});
        });
    }

    render() {
        if(!this.state.visible) {
            return null;
        }

        return (
            <Popover
                open={this.state.visible}
                style={_.merge(this.context.theme.contextMenu.container, {top: this.top, left: this.left})}
                onRequestClose={this.onRequestClose}>
                <Menu>
                    <MenuItem style={this.context.theme.contextMenu.menuItem} primaryText="Quit" onTouchTap={this.onQuitClick} />
                </Menu>
            </Popover>
        );
    }
}

ContextMenu.contextTypes = {
    theme: React.PropTypes.any.isRequired,
    store: React.PropTypes.any.isRequired,
    ipc: React.PropTypes.any
};
