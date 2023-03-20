let scene, camera, renderer;
let cameraControl;

let cube000, cube001, cube002, cube010, cube011, cube012, cube020, cube021, cube022;
let cube100, cube101, cube102, cube110, cube112, cube120, cube121, cube122;
let cube200, cube201, cube202, cube210, cube211, cube212, cube220, cube221, cube222;
let rubik;
let selectedFace;

function init() {
    // Crea y configura la escena
    scene = new THREE.Scene();

    // Crea y configura el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff), 1.0);
    document.body.appendChild( renderer.domElement );
    
    // Crea y configura la camara asi como sus controles
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControl.target.set(0, 0, 0);
}

function update() {
    //rubik.rotation.x += 0.01;
    //rubik.rotation.y += 0.01;
    //rubik.rotation.z += 0.01;
}

function render() {
    requestAnimationFrame(render);

    update();

    renderer.render( scene, camera );
}

function addRubik() {
    let min = 0;
    let max = 3;
    
    let rubik = new THREE.Group();

    const geometry = new THREE.BoxGeometry(.9, .9, .9, 1, 1, 1 );
    const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

    for (let i = min; i < max; i++) {
        for (let j = min; j < max; j++) {
            for (let k = min; k < max; k++) {
                if (i == 1 &  j == 1 & k == 1) { break; }
                eval("cube" + i + j + k + " = new THREE.Mesh( geometry, material);");
                eval("cube" + i + j + k + ".position.set(i - 1, j - 1, k - 1)");
                eval("rubik.add(cube" + i + j + k + ");");
                console.log("Cubo " + i +j + k + " añadido");
            }
        }
    }
    scene.add(rubik);
}

init();
addRubik();
render();