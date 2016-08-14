import Observable from './observable';
import * as _ from 'lodash';

class SettingsPrivate extends Observable {
	storage = null;

	theme = 'theme';
	websocketHost = 'websocket.host';
	notificationsSystem = 'notifications.system';
	notificationsSound = 'notifications.sound';

	constructor(storage) {
		super();

		this.storage = storage;
	}

	setStorage = (storage) => {
		this.storage = storage;
	}

	value = (key, defaultValue = null) => {
		if(_.isEmpty(this.storage.getItem(key)) && defaultValue !== null) {
			return defaultValue;
		}

		if(this.storage.getItem(key) === 'true' || this.storage.getItem(key) === 'false' || _.isInteger(this.storage.getItem(key))) {
			return JSON.parse(this.storage.getItem(key));
		}

		return this.storage.getItem(key);
	};

	save = (key, value) => {
		this.storage.setItem(key, value);

		this.emit('setting-changed', {key, value});
	};
}

var Settings = new SettingsPrivate(global.localStorage);

export default Settings;
