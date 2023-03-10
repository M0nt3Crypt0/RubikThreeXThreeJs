let scene, camera, renderer;

let cube000, cube001, cube002, cube010, cube011, cube012, cube020, cube021, cube022;
let cube100, cube101, cube102, cube110, cube111, cube112, cube120, cube121, cube122;
let cube200, cube201, cube202, cube210, cube211, cube212, cube220, cube221, cube222;
<<<<<<< HEAD
let rubik;
let selectedFace;
=======
let rubik, front;
>>>>>>> 9650639 (creada rotación de la cara frontal)

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    
<<<<<<< HEAD
    rubik = createRubik(3)
    selectedFace = new THREE.Group();

=======
    rubik = new THREE.Group();
    front = new THREE.Group();
>>>>>>> 9650639 (creada rotación de la cara frontal)
    createRubik(rubik);
    scene.add(rubik);
    scene.add(front)
    camera.position.z = 5;
}

function update() {
    //rubik.rotation.x += 0.01;
    //rubik.rotation.y += 0.01;
    //rubik.rotation.z += 0.01;
    front.rotation.z += 0.1;
}

function render() {
    requestAnimationFrame(render);

    update();

    renderer.render( scene, camera );
}

<<<<<<< HEAD
function createRubik(dimensions) {
    let i, j, k;
    //let max = dimensions / 2;
    //let min = -1 * max;
    let min = 0;
    let max = 3;
    
    let rubik = new THREE.Group();

    const geometry = new THREE.BoxGeometry(.9, .9, .9, 1, 1, 1 );
    const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

    for (i = min; i < max; i++) {
        for (j = min; j < max; j++) {
            for (k = min; k < max; k++) {
=======
function createRubik() {
    const geometry = new THREE.BoxGeometry(.9, .9, .9).toNonIndexed();
    const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
>>>>>>> 9650639 (creada rotación de la cara frontal)
                eval("cube" + i + j + k + " = new THREE.Mesh( geometry, material);");
                eval("cube" + i + j + k + ".position.set(i - 1, j - 1, k - 1)");
                eval("rubik.add(cube" + i + j + k + ");");
                if (k == 2) {
                    eval("front.add(cube" + i + j + k + ");")
                }
            }
        }
    }

    return rubik;
}

init();
render();