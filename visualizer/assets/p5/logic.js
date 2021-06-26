var pieces, radius, fft, analyzer, mapMouseX, mapMouseY, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
var colorPalette = ["#02073c", "#5b0ff5", "#f50fac", "#f50fac"];
var uploadLoading = false;

/*=============================================
  SETUP
=============================================*/

function preload() {
  // audio = loadSound("../assets/sound/Fly.mp3");
  // audio = loadSound("../assets/sound/1_Loska.wav");



}

function uploaded(file) {
	uploadLoading = true;
  try {
	   uploadedAudio = loadSound(file.data, uploadedAudioPlay);
   }
   catch(e) {
     console.log('error on upload func: '+e);
   }
}


function uploadedAudioPlay(audioFile) {

	uploadLoading = false;

try {
	if (audio.isPlaying()) {
		// audio.pause();
    audio.stop();
	}
}
catch(e) {
  console.log(
    'error on uploadedAudioPlay(audioFile)\n' +e
  );
}
	audio = audioFile;
  // $('.toggle-btn').slideToggle();
	// audio.loop();
  // audio.play();
	$('.toggle-btn').removeClass('js-hidden');
}

function setup() {

	uploadAnim = select('#uploading-animation');

	createCanvas(windowWidth, windowHeight);

	toggleBtn = createButton("Play / Stop");

	uploadBtn = createFileInput(uploaded);

	uploadBtn.addClass("upload-btn");

  // override txt
	$('.toggle-btn').removeClass('js-hidden');

	toggleBtn.addClass("toggle-btn");

	toggleBtn.mousePressed(toggleAudio);

	analyzer = new p5.Amplitude();
	fft = new p5.FFT();
	// audio.loop();

}



/*=============================================
  DRAW
=============================================*/
function draw() {

	// Add a loading animation for the uploaded track
	// -----------------------------------------------
	if (uploadLoading) {
		uploadAnim.addClass('is-visible');
	} else {
		uploadAnim.removeClass('is-visible');
	}

	// background(colorPalette[0]);
  background('#000');

	translate(windowWidth / 2, windowHeight / 2);

	level = analyzer.getLevel();
	fft.analyze();

	var bass = fft.getEnergy(100, 150);
	// var treble = fft.getEnergy(150, 255);
  var treble = fft.getEnergy("treble");
	var mid = fft.getEnergy("mid");

	var mapMid = map(mid, 0, 255, -100, 200);
	var scaleMid = map(mid, 0, 255, 1, 1.5);

	// var mapTreble = map(treble, 0, 255, 200, 250);
	// var scaleTreble = map(treble, 0, 255, 0, 1);

	var mapbass = map(bass, 0, 255, 50, 200);
	// var scalebass = map(bass, 0, 255, 0.05, 1.2);
  var scalebass = map(bass, 0, 255, 0.05, 1.2);

  // var custom  = fft.getEnergy( 107, 255 );
  var custom  = fft.getEnergy( 107, 255 );
  var mapcustom = map(custom, 0, 255, 50, 200);
	// mapMouseX = map(mouseX, 0, width, 1, 50);
	// mapMouseXbass = map(mouseX, 0, width, 1, 5);
	// mapMouseY = map(mouseY, 0, height, 2, 6);
  // Janne sets static:
  mapMouseX = 2.9;
	mapMouseXbass = 5.8;
	mapMouseY = 2.1;

	pieces = 20;
	radius = 100;

	for (i = 0; i < pieces; i += 0.1) {

		rotate(TWO_PI / (pieces / 2));

		noFill();

		/*----------  BASS  ----------*/
		push();
		stroke(colorPalette[1]);
		// rotate(frameCount * -0.005);
    rotate(custom * -0.005);
		strokeWeight(0.5);
		// polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 5);
    polygon(mapbass + i, mapbass - i, mapbass + i, 2.49);
    // console.log(mapMouseXbass);
		pop();


		/*----------  MID  ----------*/
    //Keskellä, punainen
		push();
		stroke(colorPalette[2]);

    rotate(mid * 0.05);
		strokeWeight(0.2);
		// polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 7);
    polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 5);

		pop();


		/*----------  TREBLE  ----------*/
		push();
		// stroke(colorPalette[3]);
    stroke('#0f0');
		strokeWeight(0.1);
		// scale(mouseX * 0.0005);
		// rotate((mouseX * 0.002));
		// polygon(mapTreble + i / 2, mapTreble - i / 2, mapMouseY * i / 2, 3);

    // polygon(mapTreble + i, mapTreble - i, 0.85 * i, 9);
    // rotate(frameCount * 0.002);
    // polygon(mapTreble + i, mapTreble - i * 0.5, 20, 46);
    // polygon(mapcustom + i / 2, mapcustom - i * 2, mapcustom * i, 5);
    polygon(mapcustom + i / 2, mapcustom - i * 2, 2.19 * i, 3.35);
		pop();

	}

}


function toggleAudio() {
	if (audio.isPlaying()) {
		audio.pause();
    $('.toggle-btn').addClass('js-hidden');
	} else {
		audio.play();
		$('.toggle-btn').removeClass('js-hidden');
		console.log('play');
	}
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function polygon(x, y, radius, npoints) {
	var angle = TWO_PI / npoints;
	beginShape();
	for (var a = 0; a < TWO_PI; a += angle) {
		var sx = x + cos(a) * radius;
		var sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}
