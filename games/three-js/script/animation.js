$(function () {

	animation2();
	
});

//define global vars
var stats = initStats();
var camera, scene, renderer, cube, sphere, controls;
var hemi;

function initStats() {
	var stats = new Stats();
	stats.setMode(0); //0,1 1= loadtime
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
	renderer.setClearColorHex(0xEEEEEE); //background-color
	renderer.setSize(window.innerWidth, window.innerHeight-4);
	
//----shadows		
renderer.shadowMapEnabled = true;	
	
	//helpers
	var axes = new THREE.AxisHelper( 20 );
	scene.add(axes);
	
//1) plane object	
	var planeGeometry = new THREE.PlaneGeometry(140,40,1,1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});	
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);
	
	plane.rotation.x=- 0.5*Math.PI;
	plane.position.x = 10;
	plane.position.y = 0;
	plane.position.z = 0;
	
plane.receiveShadow = true;	//enable shadow
	
	scene.add(plane);
	
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
	var sphereGeometry = new THREE.SphereGeometry(5,20,20); //SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
	var sphereMaterial = new THREE.MeshLambertMaterial( //sphere material
							{color: 0x78661e
								,wireframe: true //true
							});
	sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
	sphere.position.x = 20;
	sphere.position.y = 4;
	sphere.position.z = 0;
sphere.castShadow = true;		
	scene.add(sphere);
	
//spotlight
var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( -40, 70, -20 );
	scene.add( spotLight );	
spotLight.castShadow = true;	
	
//hemispherelight
hemi = new THREE.HemisphereLight( 0x448e33, 0x000000, 1.0 );	
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
		this.bouncingSpeed = 0.0001; //0.03;
		this.lightBright = 1;
	}

	var gui = new dat.GUI();
	//gui.add(controls, 'rotationSpeed',0,0.5);
	//gui.add(controls, 'bouncingSpeed',0,0.5);	
	gui.add(controls, 'bouncingSpeed',-0.5,0.5);	
	gui.add(controls, 'lightBright',0,4.5);	
	
	render();
		
}


var step = 0;

function render() {
//rotate	
/*
	cube.rotation.x += controls.rotationSpeed; //0.02;
	cube.rotation.y += controls.rotationSpeed; //0.02;
	cube.rotation.z += controls.rotationSpeed; //0.02;	
*/

//sphere
	step+= controls.bouncingSpeed; //0.03; //speed
	sphere.position.x = 2*step; //20+( 10*(Math.cos(step)));
	
	sphere.rotation.y = 0.4*step;
	sphere.rotation.x = 150;
	
	//sphere.position.y = 2 +( 10*Math.abs(Math.sin(step))); //10 = height
	//sphere.position.z = 10; //10*Math.abs(Math.sin(step));
		
	hemi.intensity = controls.lightBright;
	
	requestAnimationFrame(render); //wtf does this even do?!
	renderer.render(scene, camera);
	stats.update();
}
