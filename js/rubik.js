import * as THREE from 'https://unpkg.com/three/build/three.module.js';

let scene, camera, renderer;

let cube000, cube001, cube002, cube010, cube011, cube012, cube020, cube021, cube022;
let cube100, cube101, cube102, cube110, cube111, cube112, cube120, cube121, cube122;
let cube200, cube201, cube202, cube210, cube211, cube212, cube220, cube221, cube222;
let rubik;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    
    rubik = new THREE.Group();
    createRubik(rubik);
    scene.add(rubik);

    camera.position.z = 5;
}

function update() {
    rubik.rotation.x += 0.01;
    rubik.rotation.y += 0.01;
    rubik.rotation.z += 0.01;
}

function render() {
    requestAnimationFrame(render);

    update();

    renderer.render( scene, camera );
}

function createRubik(rubik) {
    let i, j, k;
    const geometry = new THREE.BoxGeometry(.9, .9, .9, 1, 1, 1 );
    const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            for (k = 0; k < 3; k++) {
                eval("cube" + i + j + k + " = new THREE.Mesh( geometry, material);");
                eval("cube" + i + j + k + ".translateX(i - 1);");
                eval("cube" + i + j + k + ".translateY(j - 1);");
                eval("cube" + i + j + k + ".translateZ(k - 1);");
                eval("rubik.add(cube" + i + j + k + ");");
                console.log("Cubo " + i +j + k + " añadido");
            }
        }
    }
}

init();
render();