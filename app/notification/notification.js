import * as _ from 'lodash';

export default class Notification {
	notifications = [];

    add = (notification) => {
		this.notifications.push(notification);
    }

	remove = (notification) => {
		let index = _.indexOf(this.notifications, notification);

		if(index > -1) {
			this.notifications.splice(index, 1);
		}
	}

    notify = (title = null, text = null) => {
        _.forEach(_.values(this.notifications), (notification) => {
            notification.notify(title, text);
        });
    }
}
