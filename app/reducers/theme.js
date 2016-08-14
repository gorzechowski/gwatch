import * as darkTheme from '../theme/dark.js';
import * as lightTheme from '../theme/common.js';
import Settings from '../utils/settings';

let themes = [lightTheme, darkTheme];

export var themeReducer = (state = themes[Settings.value(Settings.theme, 0)], action) => {
    switch(action.type) {
        case 'APP_THEME':
            return themes[action.theme];

        default:
            break;
    }

    return state;
};
