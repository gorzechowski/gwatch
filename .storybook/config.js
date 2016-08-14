import { configure } from '@kadira/storybook';

const req = require.context('../app/components/stories', true, /[a-zA-Z\-]+\.jsx?$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
