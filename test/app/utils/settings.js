import {assert} from 'chai';
import {expect} from 'chai';
import chai from 'chai';
import spies from 'chai-spies';
import Settings from '../../../app/utils/settings';

chai.use(spies);

let storage = {
    getItem: (key) => {
        switch(key) {
            case 'exists':
                return 'test';

            case 'boolTrue':
                return 'true';

            case 'boolFalse':
                return 'false';

            case 'integer':
                return '123';
        }

        return null;
    },
    setItem: (key, value) => {}
}

Settings.setStorage(storage);

describe('Utils', () => {
    describe('Settings', () => {
        it('Should return null if key does not exists', () => {
            assert.equal(null, Settings.value('test'));
        });

        it('Should return value if key exists', () => {
            assert.equal('test', Settings.value('exists'));
        });

        it('Should return default value if key does not exists', () => {
            assert.equal('test', Settings.value('test', 'test'));
        });

        it('Should return bool', () => {
            assert.equal(true, Settings.value('boolTrue'));
            assert.equal(false, Settings.value('boolFalse'));
        });

        it('Should return integer', () => {
            assert.equal(123, Settings.value('integer'));
        });

        it('Set item should be called while saving', () => {
            var spy = chai.spy.on(storage, 'setItem');

            Settings.save('key', 'value');

            expect(spy).to.have.been.called();
        });

        it('Should emit event after save', (done) => {
            Settings.addListener('setting-changed', () => {
                done();
            });

            Settings.save('key', 'value');
        });
    });
});
