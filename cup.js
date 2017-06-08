var scene = new THREE.Scene();

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
renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );


var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('./cupholder.json', function(geometry) {
        mesh = new THREE.Mesh(geometry);
        scene.add(mesh);
    });
}


function render(){
	initMesh();
	
	renderer.render( scene,camera );
}

render();