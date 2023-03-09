import * as THREE from 'https://unpkg.com/three/build/three.module.js';

let scene, camera, renderer;

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
}

function render() {
    requestAnimationFrame(render);

    update();

    renderer.render( scene, camera );
}

function createRubik(rubik) {
    const geometry = new THREE.BoxGeometry(.95, .95, .9, 1, 1, 1 );
    const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
    let cube = new THREE.Mesh( geometry, material );
    let cube2 = new THREE.Mesh( geometry, material );
    cube2.translateX(1);

    rubik.add(cube);
    rubik.add(cube2);
}

init();
render();