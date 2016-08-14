import React from 'react';
import AlertWarning from 'material-ui/svg-icons/alert/warning';
import Subheader from 'material-ui/Subheader';

export class NoConnection extends React.Component {
    render() {
        return (
            <div style={this.context.theme.noConnection.container}>
                <AlertWarning style={this.context.theme.noConnection.alert} />
                <Subheader style={this.context.theme.noConnection.message}>Could not connect to Websocket server</Subheader>
            </div>
        );
    }
}

NoConnection.contextTypes = {
    theme: React.PropTypes.any.isRequired
}
