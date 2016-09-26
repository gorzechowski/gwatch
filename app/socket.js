import Observable from './utils/observable';

export default class Socket extends Observable {
	host;
	ws;

	connect = (host) => {
		if(typeof host === 'undefined') {
			host = this.host;
		} else {
			this.host = host;
		}

		this.ws = new WebSocket(`ws://${this.host}`);

		this.ws.addEventListener('message', (message) => {
			this.emit('event', message);
		});

		this.ws.addEventListener('open', () => {
			this.emit('connected');
		});

		this.ws.addEventListener('close', () => {
			this.emit('disconnected');
		});
	}
}
