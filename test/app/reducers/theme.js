import {assert} from 'chai';
import {themeReducer} from '../../../app/reducers/theme';
import * as darkTheme from '../../../app/theme/dark';
import * as lightTheme from '../../../app/theme/common';

describe('Reducers', () => {
    describe('Theme', () => {
        it('Default state', () => {
            assert.equal(lightTheme, themeReducer(undefined, {}));
        });

        it('Should handle event', () => {
            assert.equal(darkTheme, themeReducer(undefined, {type: 'APP_THEME', theme: 1}));
        });

        it('Should not handle event', () => {
            assert.equal(123, themeReducer(123, {type: 'EVENT'}));
            assert.equal('test', themeReducer('test', {type: 'EVENT'}));
        });
    });
});
