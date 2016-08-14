import * as _ from 'lodash';
import * as common from './common';
import * as colors from 'material-ui/styles/colors.js';

export const muiTheme = _.merge(_.cloneDeep(common.muiTheme), {
    palette: {
        textColor: colors.white
    }
});

export const app = _.merge(_.cloneDeep(common.app), {
    container: {
        backgroundColor: '#1C2331'
    }
});

export const appBar = _.merge(_.cloneDeep(common.appBar), {
    container: {
        backgroundColor: '#212121',
    },
    title: {
        color: 'white',
    }
});

export const about = _.merge(_.cloneDeep(common.about), {
    container: {
        backgroundColor: '#212121'
    },
    containerActions: {
        backgroundColor: '#212121'
    },
    content: {
        backgroundColor: '#212121'
    },
    title: {
        backgroundColor: '#212121'
    }
});

export const settings = _.merge(_.cloneDeep(common.settings), {
    container: {
        backgroundColor: '#212121',
    },
    dropDown: {
        backgroundColor: '#212121'
    }
});

export const noConnection = _.merge(_.cloneDeep(common.noConnection), {
    alert: {
        fill: '#B71C1C',
        opacity: 0.5
    }
});

export const jobBar = _.merge(_.cloneDeep(common.jobBar), {
    container: {
        backgroundColor: '#3F729B'
    },
    errorIcon: {
        fill: '#B71C1C'
    },
    progressBar: {
        color: '#1C2331'
    }
});

export const contextMenu = _.merge(_.cloneDeep(common.contextMenu), {
    container: {
        backgroundColor: '#212121'
    }
});
