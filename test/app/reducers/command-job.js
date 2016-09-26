import {assert} from 'chai';
import {commandJobReducer} from '../../../app/reducers/command-job';
import * as darkTheme from '../../../app/theme/dark';
import * as lightTheme from '../../../app/theme/common';

let createEvent = (state) => {return {job: 'command', state}};

describe('Reducers', () => {
    describe('CommandJob', () => {
        it('Default state', () => {
            assert.deepEqual({isRunning: false, isError: false}, commandJobReducer(undefined, {}));
        });

        describe('Handle event', () => {
            it('Job started', () => {
                assert.deepEqual(
                    {isRunning: true, isError: false},
                    commandJobReducer(undefined, {type: 'JOB_EVENT', event: createEvent('started')})
                );
            });

            it('Job finished', () => {
                assert.deepEqual(
                    {isRunning: false, isError: false},
                    commandJobReducer(undefined, {type: 'JOB_EVENT', event: createEvent('finished')})
                );
            });

            it('Job failed', () => {
                assert.deepEqual(
                    {isRunning: false, isError: true},
                    commandJobReducer(undefined, {type: 'JOB_EVENT', event: createEvent('failed')})
                );
            });
        });

        it('Should not handle event', () => {
            assert.equal(123, commandJobReducer(123, {type: 'EVENT'}));
            assert.equal('test', commandJobReducer('test', {type: 'EVENT'}));
            assert.equal('test', commandJobReducer('test', {type: 'JOB_EVENT', event: {job: 'test'}}));
        });
    });
});
