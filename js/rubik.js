<<<<<<< HEAD
=======
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';

>>>>>>> bc73d28 (Importada libreria de forma local)
let scene, camera, renderer;
let cameraControl;

let cube000, cube001, cube002, cube010, cube011, cube012, cube020, cube021, cube022;
let cube100, cube101, cube102, cube110, cube112, cube120, cube121, cube122;
let cube200, cube201, cube202, cube210, cube211, cube212, cube220, cube221, cube222;
<<<<<<< HEAD
<<<<<<< HEAD
let rubik;
let selectedFace;
=======
let rubik, front;
>>>>>>> 9650639 (creada rotación de la cara frontal)
=======
let rubik, selectedFace;
>>>>>>> bc73d28 (Importada libreria de forma local)

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
=======
                eval("cube" + i + j + k + " = primeCube.Clone();");
                eval("cube" + i + j + k + ".translateX(i - 1);");
                eval("cube" + i + j + k + ".translateY(j - 1);");
                eval("cube" + i + j + k + ".translateZ(k - 1);");
>>>>>>> d9d0bb2 (Cambios de nombres para estandarizar)
                eval("rubik.add(cube" + i + j + k + ");");
                if (k == 2) {
                    eval("selectedFace.add(cube" + i + j + k + ");")
                }
            }
        }
    }
    scene.add(rubik);
}

function makeMaterial(color, opacity) {
    return new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: opacity
    })
}

function selectFace(electedCube, axis) {
    // devuelve el grupo a rotar

}

init();
addRubik();
render();