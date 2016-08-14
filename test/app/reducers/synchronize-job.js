import {assert} from 'chai';
import {synchronizeJobReducer} from '../../../app/reducers/synchronize-job';
import * as darkTheme from '../../../app/theme/dark';
import * as lightTheme from '../../../app/theme/common';

let createEvent = (state) => {return {job: 'synchronize', state}};

describe('Reducers', () => {
    describe('SynchronizeJob', () => {
        it('Default state', () => {
            assert.deepEqual({isRunning: false, isError: false}, synchronizeJobReducer(undefined, {}));
        });

        describe('Handle event', () => {
            it('Job started', () => {
                assert.deepEqual(
                    {isRunning: true, isError: false},
                    synchronizeJobReducer(undefined, {type: 'JOB_EVENT', event: createEvent('started')})
                );
            });

            it('Job finished', () => {
                assert.deepEqual(
                    {isRunning: false, isError: false},
                    synchronizeJobReducer(undefined, {type: 'JOB_EVENT', event: createEvent('finished')})
                );
            });

            it('Job failed', () => {
                assert.deepEqual(
                    {isRunning: false, isError: true},
                    synchronizeJobReducer(undefined, {type: 'JOB_EVENT', event: createEvent('failed')})
                );
            });
        });

        it('Should not handle event', () => {
            assert.equal(123, synchronizeJobReducer(123, {type: 'EVENT'}));
            assert.equal('test', synchronizeJobReducer('test', {type: 'EVENT'}));
            assert.equal('test', synchronizeJobReducer('test', {type: 'JOB_EVENT', event: {job: 'test'}}));
        });
    });
});
