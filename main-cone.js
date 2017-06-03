// create scene
var scene = new THREE.Scene();
// variable for our mesh object
var sphere;
var cone;
var cones = [];
var mesh;
var mainGroup = new THREE.Group();	
var targetRotation = 0;
// set up ortho camera
var camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
camera.zoom = 1;
camera.updateProjectionMatrix();

// add light 
var ambientLight = new THREE.AmbientLight('#6b4808', 1);
scene.add(ambientLight);

var light = new THREE.PointLight( 0xffffff, 1.5, 1500);
light.position.set( 0, 500, 500 );
scene.add( light );

// create renderer
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

// append it to the DOM
document.body.appendChild(renderer.domElement);

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
	textureLoader.load('./assets/ice.jpg', function(texture) {
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
	});
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

var donut = function() {
	var geometry = new THREE.TorusGeometry( 250, 75, 16, 100 );
	var material = new THREE.MeshPhongMaterial( { 
		// wireframe: true, 
		color: 0x3e1c12,
		specular: 0x3e3535
		} );
	var torus = new THREE.Mesh( geometry, material );
	scene.add( torus );
	torus.position.z = 100;
	torus.rotation.x = 280/ ( Math.PI );
}
donut();
function randBetween(min, max) {
	return (Math.random() * (max - min)) + min;
}

function createGroup(ice) {
	var group = new THREE.Group();	
	var x = randBetween(-520,500),
		y = randBetween(-320,320),
		z = randBetween(-420,20);

	group.position.set(x,y,z);
	group.castShadow = true
	
	ice(group)
	
	cone(group)
	
	//randomize the rotation speed 
    group.rotateAt = randBetween(0.01, 0.03);	
    cones.push(group);
    mainGroup.add(group);
}


for (var i = 0; i <= 15; i++) {
	createGroup(ice_straw)
	createGroup(ice_choc)
}

scene.add( mainGroup );


var mouseX = 0,
      mouseY = 0,
      windowHalfX = window.innerWidth / 2,
      windowHalfY = window.innerHeight / 2;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );


function onDocumentMouseMove(event) {
  	mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
    console.log(event)
    // targetRotation = targetRotation  * 2;
  }

console.log(cones)
function render(){
	requestAnimationFrame( render );
	// camera.lookAt( scene.position );
	// camera.position.x += ( mouseX - camera.position.x ) * .05;
	// camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
	// camera.lookAt( scene.position );

	cones.forEach((mesh)=>{
		mesh.rotation.x += mesh.rotateAt;
		mesh.rotation.y += mesh.rotateAt;
		mesh.rotation.z += mesh.rotateAt;
	});

	 // mainGroup.rotation.y += ( targetRotation - mainGroup.rotation.y ) * .01;

	renderer.render( scene,camera );
}

console.log(cones)
render();

