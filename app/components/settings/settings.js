import React from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export class Settings extends React.Component {
    state = {
        visible: false
    };

    onRequestChange = (visible) => {
        this.context.store.dispatch({type: 'SETTINGS_VISIBILITY', visible: false});
    }

    onTextFieldChange = (event, value) => {
        let id = event.target.id;

        setTimeout(() => {
            this.context.settings.save(id, value);
        }, 300);
    }

    onToggle = (event, value) => {
        this.context.settings.save(event.target.id, value);
    }

    onThemeChange = (event, value) => {
        this.context.settings.save(event.target.name, value);

        this.context.store.dispatch({type: 'APP_THEME', theme: value});
    }

    componentWillMount() {
        this.context.store.subscribe(() => {
            var state = this.context.store.getState();

            this.setState({
                visible: state.component.settings.visible
            });
        });
    }

    render() {
        return (
            <Drawer
                docked={false}
                width={300}
                open={this.state.visible}
                onRequestChange={this.onRequestChange}
                containerStyle={this.context.theme.settings.container}>

                <Subheader style={this.context.theme.settings.section}>Websocket</Subheader>

                <TextField
                    id={this.context.settings.websocketHost}
                    defaultValue={this.context.settings.value(this.context.settings.websocketHost)}
                    hintText="Server host"
                    hintStyle={{color: 'grey'}}
                    onChange={this.onTextFieldChange} />

                <Subheader style={this.context.theme.settings.section}>Notifications</Subheader>

                <Toggle
                    id={this.context.settings.notificationsSystem}
                    label="Enable system notifications"
                    defaultToggled={this.context.settings.value(this.context.settings.notificationsSystem)}
                    onToggle={this.onToggle} />

                <Toggle
                    id={this.context.settings.notificationsSound}
                    label="Enable sound notifications"
                    defaultToggled={this.context.settings.value(this.context.settings.notificationsSound)}
                    onToggle={this.onToggle} />

                <Subheader style={this.context.theme.settings.section}>Theme</Subheader>

                <RadioButtonGroup
                    name={this.context.settings.theme}
                    defaultSelected={this.context.settings.value(this.context.settings.theme, '0')}
                    onChange={this.onThemeChange}>

                    <RadioButton
                        value={'0'}
                        label="Light" />

                    <RadioButton
                        value={'1'}
                        label="Dark" />
                </RadioButtonGroup>
            </Drawer>
        );
    }
}

Settings.contextTypes = {
    settings: React.PropTypes.any.isRequired,
    theme: React.PropTypes.any.isRequired,
    store: React.PropTypes.any.isRequired
};
