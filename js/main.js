window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

//-------------
//	Scene
//-------------	

//Setting the scene size
var WIDTH = $(document).width(),
	HEIGHT = $(document).height();

//setting some camera attributes
var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

//getting the DOM element we're attaching to
var $container = $('.container');

//Create a webGL renderer, camera, and scene
var renderer = new THREE.WebGLRenderer();
var camera = 
	new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR
	);
var scene = new THREE.Scene();
//add the camera to the scene
scene.add(camera);

//Camera starts at 0,0,0 - so pull it back
camera.position.z = 300;

//start the renderer
renderer.setSize(WIDTH,HEIGHT);

//Attach the render-supplied DOM element
$container.append(renderer.domElement);



//-------------
//	Render a Sphere
//-------------	

//sphere variables
var radius = 50,
	segments = 16,
	rings = 16;

var sphereMaterial = new THREE.MeshLambertMaterial({
	color: 0xAAAAAA
});

//create a new mesh with sphere geometry

var sphere = new THREE.Mesh(

	new THREE.SphereGeometry(
		radius,
		segments,
		rings
	),

	sphereMaterial
);

scene.add(sphere);


//Add light

var pointLight = new THREE.PointLight(0xFFFFFF);

	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	pointLight.intensity = 1;

scene.add(pointLight);


//-------------
//	Render particles
//-------------	

//particle variables
var particleCount = 1800,
	particles = new THREE.Geometry();
var particleImg = THREE.ImageUtils.loadTexture('img/particle.png', {}, function(){
	renderer.render(scene,camera);
});
var pMaterial = new THREE.PointCloudMaterial({
  		size: 10,
  		map: particleImg,
  		blending: THREE.AdditiveBlending,
  		transparent: true
	});


//create individual particles
for (var p = 0; p < particleCount; p++){

	//create a particle with random position values, -250 -> 250
	var pX = Math.random() * 500 - 250,
		pY = Math.random() * 500 - 250,
		pZ = Math.random() * 500 - 250;
		var particle = new THREE.Vector3(pX, pY, pZ);
		particle.velocity = new THREE.Vector3(
			  0,              // x
			  -Math.random(), // y: random vel
			  0); 
	// add it to the geometry
	particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.PointCloud(
		particles,
		pMaterial
	);

particleSystem.sortParticles = true;

scene.add(particleSystem);
renderer.render(scene, camera);




function update(){
	particleSystem.rotation.y += 0.01;
	var pCount = particleCount-1;
  while (pCount--) {

    // get the particle
    var particle =
      particles.vertices[pCount];

    // check if we need to reset
    if (particle.y < -200) {
      particle.y = 200;
      particle.y = 0;
    }

    // update the velocity with
    // a splat of randomniz
    particle.velocity.y -= Math.random() * .1;

    // and the position
    particle.x -= Math.random() * .1;
    particle.y -= Math.random() * .1;
    //particle.y += Math.random() * .1;
    particle.z -= Math.random() * .1;
  }

  // flag to the particle system
  // that we've changed its vertices.
  particleSystem.
    geometry.
    __dirtyVertices = true;
	renderer.render(scene, camera);
	requestAnimFrame(update);
}

requestAnimFrame(update);




