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
	color: 0xCC0000
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

var pointLight = new THREE.PointLight(0xFFFFFF);

	pointLight.position.x = 60;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

scene.add(pointLight);
scene.add(sphere);

renderer.render(scene,camera);


