// create scene
var scene = new THREE.Scene();
var crystals = [];
// variable for our mesh object
var mesh;
// set up ortho camera
var camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
camera.zoom = 3.5;
camera.updateProjectionMatrix();

// create renderer
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

// append it to the DOM
document.body.appendChild(renderer.domElement);

// create function that returns unique sugar
function createMesh() {
// dimensions for each particle - will be randomized later
	var length = 12, width = 8;

	// shape to be extruded
	var shape = new THREE.Shape();
	shape.moveTo( randBetween(0,1.5), randBetween(0,1.5) );
	shape.lineTo( randBetween(0,1.5), width );
	shape.lineTo( length, width );
	shape.lineTo( length, randBetween(0,1.5) );
	shape.lineTo( randBetween(0,1.5), randBetween(0,1.5) );

	// how to extrude the shape
	var extrudeSettings = {
		steps: 2,
		amount: randBetween(3,6),
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: randBetween(1,3),
		bevelSegments: 1.5
	};

	// define geometry
	var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	// define material for mesh
	// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// // geo + material
	//  mesh = new THREE.Mesh( geometry, material ) ;
	// // add to scene
	// scene.add( mesh );

	// get the center of each sugar particle so it rotates in the middle;

	// add texture
	// create ThreeJs texture loader 
	var textureLoader = new THREE.TextureLoader();
	textureLoader.crossOrigin = true;

	textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/160607/sugar-texture-4.png', function(texture) {
	//  repeat pattern
	texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;

	// zoom in on pattern
	texture.repeat.set(0.1,0.1);

	// assign texture via MeshBasicMaterial
	var material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true,
		premultipliedAlpha: true,
		side: THREE.DoubleSide,
		blending: THREE.AdditiveBlending
	});

	mesh = new THREE.Mesh(geometry, material);

	// randomize the position
	var x = randBetween(-120,120),
		y = randBetween(-120,120),
		z = randBetween(-120,120);

	mesh.position.set(x,y,z);
	mesh.geometry.center();
	//randomize the rotation speed of each sugar particle
    mesh.rotateAt = randBetween(0.01, 0.04);

	scene.add(mesh);
	crystals.push(mesh)

	});
}

function randBetween(min, max) {
	return (Math.random() * (max - min)) + min;
}


for (var i=0; i<30; i++) {
	createMesh();
}

// render the scene and camera
function render(){
	requestAnimationFrame( render );
	
	crystals.forEach((mesh)=>{
		mesh.rotation.x += mesh.rotateAt;
		mesh.rotation.y += mesh.rotateAt;
	});
	renderer.render( scene,camera );
}

render();
