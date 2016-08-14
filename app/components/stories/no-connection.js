import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {NoConnection} from '../no-connection/no-connection';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as dark from '../../theme/dark';

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

storiesOf('NoConnection', module)
	.addDecorator((getStory) => {
        return (<Context>{getStory()}</Context>);
    })
    .add('No connection is visible', () => {
    	return (
        	<NoConnection />
    	);
    }
);
