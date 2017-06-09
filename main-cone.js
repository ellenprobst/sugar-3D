
// variable for  mesh object
var renderer, camera, scene;
var sphere;
var cone;
var cones = [];
var cupcakes = [];
var coneGroup = new THREE.Group();	
var targetRotation = 0;
var mouseX = 0;
var mouseY= 0;

init();

function init(){
	// set up ortho camera

	camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 2000, 1000 );
	camera.zoom = 1.5;
	camera.updateProjectionMatrix();


	// create scene
	scene = new THREE.Scene();


	// add light 
	var ambientLight = new THREE.AmbientLight(0xffffbb, .6);
	scene.add(ambientLight);

	var light = new THREE.PointLight( 0xffffff, 1.5, 1500);
	light.position.set( 0, 500, 500 );
	scene.add( light );
	var lightTwo = new THREE.PointLight( 0xffffff, 1.5, 1500);
	lightTwo.position.set( 500, 500, 500 );
	scene.add( lightTwo );

	// create renderer
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	// append it to the DOM
	document.body.appendChild(renderer.domElement);

	var loader = new THREE.JSONLoader();
	loader.load('./cupcake-lowpoly.json', generateMesh );
};



function generateMesh(geometry, material){
	geometry.computeVertexNormals();
    var cupcake = new THREE.Mesh(geometry, material);
    
  //      	cupcake.position.x = randBetween(-320,300);
		cupcake.position.y = -100;
		cupcake.position.Z = randBetween(-100,800);
		cupcake.rotation.z = randBetween(.0, .25);
		
		cupcake.scale.x = cupcake.scale.y = cupcake.scale.z = 70;
		
		cupcake.rotateAt = randBetween(0.01, 0.03);	

		scene.add(cupcake);
		cupcakes.push( cupcake )
}

// create function that returns unique ice cream
var ice_choc = function(group) {

		// assign texture via MeshBasicMaterial
		var material = new THREE.MeshPhongMaterial({
			color: 0x3e1c12,
			specular: 0x3e3535
			});

		var geometry = new THREE.SphereGeometry(25,16,16);
		choc = new THREE.Mesh( geometry, material );
		choc.position.y = 25;
		choc.castShadow = true

		group.add( choc );
}

var ice_straw = function(group) {

	var textureLoader = new THREE.TextureLoader();
	textureLoader.crossOrigin = true;
	textureLoader.load('./assets/ice.jpg', addTexture )
	
	function addTexture(texture) {
		//  repeat pattern
		texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;

			// assign texture via MeshBasicMaterial
		var material = new THREE.MeshLambertMaterial({			
				map: texture,
				side: THREE.DoubleSide,
				blending: THREE.AdditiveBlending,
				reflectivity: 0
			});

		var geometry = new THREE.SphereGeometry(25,16,16);
		sphere = new THREE.Mesh( geometry, material );
		sphere.position.y = 25;
		sphere.castShadow = true

		group.add( sphere );
	};
}

var cone = function(group){	
	var textureLoader = new THREE.TextureLoader();
	textureLoader.crossOrigin = true;
	textureLoader.load('./assets/wafer3.jpg', function(texture) {
		//  repeat pattern
		texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
		texture.repeat.set(5,5);

		// assign texture via MeshBasicMaterial
		var material = new THREE.MeshLambertMaterial({
			map: texture,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			reflectivity: 0
		});

		var geometry = new THREE.ConeGeometry( 26, 90, 16 );
		cone = new THREE.Mesh(geometry, material);
		cone.position.y = -20;
		cone.rotation.x = ( Math.PI );

		// randomize the position
		group.add(cone);

	});
}

function randBetween(min, max) {
	return (Math.random() * (max - min)) + min;
}

function createGroup(ice) {
	var group = new THREE.Group();	
	var x = randBetween(-520,500),
		y = randBetween(-320,320),
		z = randBetween(-1000,-300);

	group.position.set(x,y,z);
	group.castShadow = true;
	group.scale.x = group.scale.y = group.scale.z = .5;
	
	ice(group)	
	cone(group)
	
	//randomize the rotation speed 
    group.rotateAt = randBetween(0.01, 0.03);	
    cones.push(group);
    coneGroup.add(group);
}

for (var i = 0; i <= 25; i++) {
	createGroup(ice_straw);
	createGroup(ice_choc);
}

scene.add( coneGroup );

document.addEventListener('mousemove', onMouseMove, false);

// Follows the mouse event
function onMouseMove(event) {

event.preventDefault();
mouseX = (event.clientX / window.innerWidth) * 2 - 1;
mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
};

function render(){
	requestAnimationFrame( render );
	cones.forEach((mesh)=>{
		mesh.rotation.x += mesh.rotateAt;
		mesh.rotation.y += mesh.rotateAt;
		mesh.rotation.z += mesh.rotateAt;
	});
	
	cupcakes.forEach((mesh)=>{
		mesh.rotation.y = mouseX * 5;
		mesh.rotation.x = mouseY ;
	});
	renderer.render( scene,camera );
}

render();


