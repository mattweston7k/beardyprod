var audio_on = true; //set on by default.
var audio_path = 'assets/audio/';
//html5 audio support
function playAudio(f, a, audio_id) { //audio_id = search/splash/intro
	audio_id = new Audio('assets/audio/' + f);
	audio_id.play();
}

var intro_music = new Audio(audio_path+ 'intro.mp3');

function introMusic(a) { //action: play/pause
	if (a=='play') {
		intro_music.play();
	}
	else {
		intro_music.pause();
	}
}
