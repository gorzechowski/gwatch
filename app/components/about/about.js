import React from 'react';
import Dialog from 'material-ui/Dialog';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {remote} from 'electron';

export class About extends React.Component {
    state = {
        visible: false
    };

    onRequestClose = () => {
        this.context.store.dispatch({type: 'ABOUT_VISIBILITY', visible: false});
    }

    componentWillMount() {
        this.context.store.subscribe(() => {
            var state = this.context.store.getState();


            this.setState({
                visible: state.component.about.visible
            });
        });
    }

    render() {
        return (
            <Dialog
                bodyStyle={this.context.theme.about.container}
                actionsContainerStyle={this.context.theme.about.containerActions}
                titleStyle={this.context.theme.about.title}
                open={this.state.visible}
                actions={[
                    <FlatButton
                        label="Close"
                        onTouchTap={this.onRequestClose} />
                ]}
                onRequestClose={this.onRequestClose}>

                <Card style={this.context.theme.about.content}>
                    <CardHeader
                        title={remote.app.getName()}
                        subtitle={"Version: " + remote.app.getVersion()}
                        titleStyle={this.context.theme.about.title}
                        subtitleStyle={this.context.theme.about.version}
                    />

                    <CardText>
                        GWatch is a graphical interface for GWatchD application
                    </CardText>
                </Card>
            </Dialog>
        );
    }
}

About.contextTypes = {
    theme: React.PropTypes.any.isRequired,
    store: React.PropTypes.any.isRequired
};
