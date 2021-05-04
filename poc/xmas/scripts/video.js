$(document).ready(function() {	
	videoLogic();
	
	$('.btn-save').on("click", function() {
		//saveToImg();
		downloadCanvas(this, 'drawing', 'test-canvas.png');
	});
	
	jqActions();
}); 


function jqActions() {
	$('#jq-actions a').on("click", function(e) {
		e.preventDefault();
		
	//----overlay
		var overlay1 = new Image();
		overlay1.src = '../xmas/images/' + $(this).attr('data-svg-image');
		overlay1.width = '200';
		overlay1.height = '200';		
		canvas.getContext("2d").drawImage(overlay1, 0, 0, canvas.width, canvas.height);

	});
	
	$('#camera').on("click", function(e) {
		startCamera();
	});
	$('#cameraoff').on("click", function(e) {
		stopCamera();
	});
}

function startCamera() {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	var constraints = {audio: false, video: true};
	var video = document.querySelector("video");

	function successCallback(stream){
	  window.stream = stream; // stream available to console
	  if (window.URL) {
		video.src = window.URL.createObjectURL(stream);
	  } else {
		video.src = stream;
	  }
	}

	function errorCallback(error){
	  console.log("navigator.getUserMedia error: ", error);
	}

	navigator.getUserMedia(constraints, successCallback, errorCallback);	
}
function stopCamera() {
	try {
		stream.stop();
		}
		catch(e) {		
		}
}

function videoLogic() {
/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
// variables in global scope so available to console
	snapshotButton = document.querySelector("button#snapshot");
	video = document.querySelector("video");
	canvas = document.querySelector("canvas");

	canvas.width = 500; //155;
	canvas.height = 500; //100;

//draw svg
	var c_content = canvas.getContext("2d");
	
	var source = new Image();
	source.src = '../xmas/images/santa.svg';
	source.width = '200';
	source.height = '200';	

	/*
	var overlay1 = new Image();
	overlay1.src = '../images/' + '-kilt.svg';
	overlay1.width = '200';
	overlay1.height = '200';	
*/
	
	snapshotButton.onclick = function snap(){
	  //canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
	  
	  canvas.getContext("2d").drawImage(video, 200, 153, 76, 64); //video capture
	  canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height); //draw full image
	  
	 //draw overlay 
	  //canvas.getContext("2d").drawImage(overlay1, 0, 0, canvas.width, canvas.height);
	 
//draws another layer on top

	  //source.src = '../images/santa-kilt.svg';	  
	  //canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);

	  //c_content.drawImage(source,0,0);
	}

	
}

function downloadCanvas(link, canvasId, filename) {
try {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
	}
	catch(e) {
		alert('error occured: \n\n'+e);
	}
}

/*
function saveToImg() {
	var dataURL = canvas.toDataURL();
      document.getElementById('drawing').src = dataURL;
	  alert('saving..');
  }
  
  */