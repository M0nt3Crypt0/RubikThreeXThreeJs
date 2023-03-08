import * as THREE from 'https://unpkg.com/three/build/three.module.js';

let scene, camera, renderer;

let cube;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;
}

function update() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

function render() {
    requestAnimationFrame(render);

    update();

    renderer.render( scene, camera );
}

init();
render();