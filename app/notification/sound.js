var mp3 = require('./sound.mp3');
var ogg = require('./sound.ogg');

var audio = new Audio(ogg);

if(audio.canPlayType("audio/mpeg")) {
    audio.load(mp3);
} else {
    audio.load(ogg);
}

export var notify = () => {
    audio.play();
}
