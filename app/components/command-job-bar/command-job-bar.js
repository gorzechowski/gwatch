import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import AlertError from 'material-ui/svg-icons/alert/error';
import LinearProgress from 'material-ui/LinearProgress';

export class CommandJobBar extends React.Component {
    state = {
        job: {
            isRunning: false,
    		isError: false
        }
    };

    componentWillMount() {
        this.context.store.subscribe(() => {
            var state = this.context.store.getState();

            this.setState({
                job: {
                    isRunning: state.component.commandJobBar.job.isRunning,
	                isError: state.component.commandJobBar.job.isError
                }
            });
        });
    }

	componentWillUpdate(props, state) {
        let isError = this.state.job.isError;
        let isRunning = this.state.job.isRunning;

		if(isRunning && !state.job.isRunning) {
			var text = state.job.isError ? 'Job execution has failed' : 'Job execution finished successfully';

			if(this.context.notification) {
				this.context.notification.notify('Command', text);
			}
		}

		if(this.context.ipc) {
			this.context.ipc.send('job-state-changed', {job: 'command', isRunning: state.job.isRunning});
		}
	}

	render() {
        let isError = this.state.job.isError;
        let isRunning = this.state.job.isRunning;

		return (
            <Card style={this.context.theme.jobBar.container}>
                <CardHeader
                    title="Command"
					avatar={isError ? <AlertError style={this.context.theme.jobBar.errorIcon} /> : null}
					titleStyle={isError ? this.context.theme.jobBar.errorTitle : this.context.theme.jobBar.title}
                />
                {isRunning ?
                    <CardText>
                        <LinearProgress mode="indeterminate" color={this.context.theme.jobBar.progressBar.color} />
                    </CardText>
                : null}
            </Card>
		);
	}
}

CommandJobBar.contextTypes = {
	theme: React.PropTypes.any.isRequired,
    store: React.PropTypes.any.isRequired,
	ipc: React.PropTypes.any,
    notification: React.PropTypes.any
};
