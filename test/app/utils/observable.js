import {assert} from 'chai';
import {expect} from 'chai';
import chai from 'chai';
import spies from 'chai-spies';
import Observable from '../../../app/utils/observable';

chai.use(spies);

describe('Utils', () => {
    describe('Observable', () => {
        var observable = new Observable();

        let listener = () => {};
        let otherListener = () => {};

        it('Should add listener', () => {
            observable.addListener('test', listener);
            observable.addListener('test', otherListener);

            assert.equal(2, observable.listeners.get('test').length);
        });

        it('Should remove listener', () => {
            observable.removeListener('test', listener);

            assert.equal(1, observable.listeners.get('test').length);
        });

        it('Should call listener', () => {
            var spy = chai.spy(listener);

            observable.addListener('test2', spy);

            observable.emit('test2');

            expect(spy).to.have.been.called();
        })
    });
});
