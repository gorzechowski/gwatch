import {assert} from 'chai';
import Notification from '../../../app/notification/notification';

describe('Notification', () => {
    var notification = new Notification();

    let notifier = () => {};

    it('Should add notification', function() {
        notification.add(notifier);

        assert.equal(1, notification.notifications.length);
    });

    it('Should remove notification', function() {
        notification.remove(notifier);

        assert.equal(0, notification.notifications.length);
    });

    it('Should call all added notifiers', (done) => {
        let notifier = {
            notify: () => {
                done();
            }
        }

        notification.add(notifier);

        notification.notify();
    })
});
