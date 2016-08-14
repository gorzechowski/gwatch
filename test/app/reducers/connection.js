import {assert} from 'chai';
import {connectionReducer} from '../../../app/reducers/connection';

describe('Reducers', () => {
    describe('Connection', () => {
        it('Default state', () => {
            assert.equal(false, connectionReducer(undefined, {}));
        });

        it('Should handle connected event', () => {
            assert.equal(true, connectionReducer(undefined, {type: 'CONNECTED'}));
        });

        it('Should handle disconnected event', () => {
            assert.equal(false, connectionReducer(undefined, {type: 'DISCONNECTED'}));
        });

        it('Should not handle event', () => {
            assert.equal(123, connectionReducer(123, {type: 'EVENT'}));
            assert.equal('test', connectionReducer('test', {type: 'EVENT'}));
        });
    });
});
