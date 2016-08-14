import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {AppBar} from '../app-bar/app-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as dark from '../../theme/dark';

let aa;

var store = {
	subscribe: (callback) => {
		aa = callback;
	},
	getState: () => {
		return {
			isVisible: true
		}
	}
}

class Context extends React.Component {
    getChildContext = () => {
        return {
            theme: dark
        };
    }

    render() {
        return (
        	<MuiThemeProvider>
        		{this.props.children}
    		</MuiThemeProvider>
    	);
    }
}

Context.childContextTypes = {
    theme: React.PropTypes.any.isRequired
};

storiesOf('AppBar', module)
	.addDecorator((getStory) => {
        return (<Context>{getStory()}</Context>);
    })
    .add('App bar is visible', () => {
    	return (
        	<AppBar store={store} />
    	);
    }
);
