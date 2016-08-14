import {assert} from 'chai';
import {visibleReducer} from '../../../app/reducers/visible';

describe('Reducers', () => {
    describe('Visible', () => {
        let reducer = visibleReducer('EVENT');

        it('Default state', () => {
            assert.equal(false, reducer(undefined, {}));
        });

        it('Should handle event', () => {
            assert.equal(true, reducer(undefined, {type: 'EVENT', visible: true}));
        });

        it('Should not handle event', () => {
            assert.equal(false, reducer(undefined, {type: 'TEST', visible: true}));
        });
    });
});
