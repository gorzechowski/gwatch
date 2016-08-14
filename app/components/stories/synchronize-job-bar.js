import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {SynchronizeJobBar} from '../synchronize-job-bar/synchronize-job-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as dark from '../../theme/dark';

let aa;

var store = {
	subscribe: (callback) => {
		aa = callback;
	},
	getState: () => {
		return {
			isRunning: false
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

storiesOf('SynchronizeJobBar', module)
	.addDecorator((getStory) => {
        return (<Context>{getStory()}</Context>);
    })
    .add('Job is not running', () => {
    	return (
        	<SynchronizeJobBar store={store} />
    	);
    })
	.add('Job failed', () => {
		setTimeout(() => {
    		store.getState = () => {
				return {
					isRunning: false,
					isError: true
				}
			};

    		aa();
    	}, 100);

    	return (
        	<SynchronizeJobBar store={store} />
    	);
    })
    .add('Job is running', () => {
    	setTimeout(() => {
    		store.getState = () => {
				return {
					isRunning: true
				}
			};

    		aa();
    	}, 100);

    	return (
        	<SynchronizeJobBar store={store} />
    	);
    }
);
