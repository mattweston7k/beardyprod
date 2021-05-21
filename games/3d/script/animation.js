$(function () {

	animation2();
	
});

//define global vars
var stats = initStats();
var camera, scene, renderer, cube, sphere, controls;
var hemi, whiteball;

function initStats() {
	var stats = new Stats();
	stats.setMode(0); //0,1 1= loadtime
	//stats.domElement.addClass('stats--holder');
	
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.bottom = '0px';
	
	$("#Stats-output").append( stats.domElement );
	return stats;
}
function animation1() {

	var scene = new THREE.Scene(); 
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); 
	var renderer = new THREE.WebGLRenderer(); 
	renderer.setSize( window.innerWidth, window.innerHeight -4); 
	//renderer.setSize( window.outerWidth, window.outerHeight ); 
	document.body.appendChild( renderer.domElement ); 
	var geometry = new THREE.BoxGeometry( 1, 1, 1 ); 

	var material = new THREE.MeshBasicMaterial( { 
			color: 0x4c70cb //33ccaa 
		} ); 
	var cube = new THREE.Mesh( geometry, material ); 
	scene.add( cube ); 
	camera.position.z = 4; 

	var render = function () { 
		requestAnimationFrame( render ); 
		cube.rotation.x += 0.1; 
		cube.rotation.y += 0.1; 
		renderer.render(scene, camera); 
	}; 

	render();
}

function animation2() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColorHex(0x628c5f); //background-color
	renderer.setSize(window.innerWidth, window.innerHeight-4);
	
//----shadows		
renderer.shadowMapEnabled = true;	
	
	//helpers
	var axes = new THREE.AxisHelper( 20 );
	scene.add(axes);
	
//1) plane object	
	var planeGeometry = new THREE.PlaneGeometry(140,40,1,1);
	/*
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x1f5b14});	 //0xcccccc});	
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);
	*/
	//var grass = THREE.ImageUtils.loadTexture( 'images/grass.jpg' );
	var pmat = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'images/grass.jpg' ) } );
	
	plane = new THREE.Mesh(planeGeometry,pmat);
	
	plane.rotation.x=- 0.5*Math.PI;
	plane.position.set(10,0,0);
	/*plane.position.x = 10;
	plane.position.y = 0;
	plane.position.z = 0;
	*/
	plane.receiveShadow = true;	//enable shadow
	
	scene.add(plane);

//-------------
// white ball
	var sg = new THREE.SphereGeometry(3,20,20);	
	var texture = THREE.ImageUtils.loadTexture( 'images/texture-1.jpg' );
	var smat = new THREE.MeshLambertMaterial( { map: texture } );
	whiteball = new THREE.Mesh(sg,smat);
	whiteball.position.set(25,4, 0);
	scene.add(whiteball);
	whiteball.castShadow = true;
	
//2) cube object
/*
	var cubeGeometry = new THREE.CubeGeometry(4,4,4);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	cube = new THREE.Mesh(cubeGeometry, cubeMaterial);	
	cube.position.x = -14;
	cube.position.y = 13;
	cube.position.z = 0;

cube.castShadow = true;
	scene.add(cube);
*/
//3) sphere object	
	var sphereGeometry = new THREE.SphereGeometry(4,20,20); //SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
	var sphereMaterial = new THREE.MeshLambertMaterial( //sphere material
							{color: 0x4f4311
								//,wireframe: true //true
							});
	sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
	sphere.position.x = -20;
	sphere.position.y = 4;
	sphere.position.z = 0;
sphere.castShadow = true;		
	//scene.add(sphere);
		
	
//4) spotlight
var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( -20, 70, -20 );
	scene.add( spotLight );	
spotLight.castShadow = true;	
	
//hemispherelight

hemi = new THREE.HemisphereLight( 0xaaaaaa, 0x000000, 1.0 );	//min / max val
	scene.add( hemi );	
	
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
	$("#WebGL-output").append(renderer.domElement);

	//renderer.render(scene, camera);
	//$("#WebGL-output").append(renderer.domElement);
	
//add dat.gui controls
	controls = new function() {
		//this.rotationSpeed = 0.02;
		this.bouncingSpeed = 0.0000; //0.03;
		this.lightBright = 2;
	}

	var gui = new dat.GUI();
	//gui.add(controls, 'rotationSpeed',0,0.5);
	//gui.add(controls, 'bouncingSpeed',0,0.5);	
	gui.add(controls, 'bouncingSpeed',-0.5,0.5);	
	gui.add(controls, 'lightBright',0,4.5);	
	
	
//make circle	
/*
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff 
												}); 	
	var circleGeometry = new THREE.CircleGeometry( 4, 32 ); //radius, segments
	var circle = new THREE.Mesh( circleGeometry, material ); 
	circle.position.set( 0, 5, 0 );
	circle.rotation.y = 80;
	//circle.rotation.x = -290;
		
	//circle.rotation.z = -160;
	scene.add( circle );
	circle.castShadow = true;
*/	
	render();
		
}


var step = -15;

function render() {
//rotate	
/*
	cube.rotation.x += controls.rotationSpeed; //0.02;
	cube.rotation.y += controls.rotationSpeed; //0.02;
	cube.rotation.z += controls.rotationSpeed; //0.02;	
*/

//need bezier curve for bias calculations... http://13thparallel.com/archive/bezier-curves/

//sphere
	step+= controls.bouncingSpeed; //0.03; //speed
	sphere.position.x = 2*step; //20+( 10*(Math.cos(step)));

var maxp = 18;
	
	sphere.rotation.y = 0.4*step;
	sphere.rotation.x = 150;	
// common

if ( sphere.position.x > maxp ) { 
	whiteball.position.x +=  0.07*step;
}

	/*
if ( sphere.position.x > 5 && sphere.position.x < maxp ) { // apply bias
		sphere.position.z += sphere.rotation.x * Math.tan(0.0019);
		sphere.rotation.z = -150;		
	}

	else if (sphere.position.x > maxp) { //stop		
		sphere.position.z = sphere.position.z;
		controls.bouncingSpeed = 0;
	}
	
	else {
}	
*/
	
	hemi.intensity = controls.lightBright;
	
	requestAnimationFrame(render); //This will create a loop that causes the renderer to draw the scene 60 times per second
	renderer.render(scene, camera);
	
	
	
	stats.update();
	
	//get x location:
	$('.js-stats span').text(
		Math.round(sphere.position.x)
	);
	
	
	
	
	
}


$('#create').on("click", function() {
	scene.add(sphere);
	$(this).remove();
	$('.dg.ac, .js-toggled').fadeIn(300);
});