import * as _ from 'lodash';

export default class Observable {
    listeners = new Map();

    addListener = (key, callback) => {
        this.listeners.has(key) || this.listeners.set(key, []);
        this.listeners.get(key).push(callback);
    }

    removeListener = (key, callback) => {
        let listeners = this.listeners.get(key),
        index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (_.isFunction(listener) && listener === callback) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(key, listeners);
            }
        }
    }

    emit = (key, ...args) => {
        let listeners = this.listeners.get(key);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args);
            });

            return true;
        }

        return false;
    }
}
