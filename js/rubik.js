let scene, camera, renderer;
let cameraControl, mouse, raycaster;

let rubik;
let selectedCube = null;
let selectedFace = null;

function init() {
    // Crea y configura la escena
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight());

    // Crea y configura el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Crea y configura la camara asi como sus controles
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 6;

    // Controles
    cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControl.target.set(0, 0, 0);

    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    // Listeners
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keypress', onKeyPress);
}

function update() {
    //rubik.rotation.x += 0.01;
    //rubik.rotation.y += 0.01;
    //rubik.rotation.z += 0.01;
}

function render() {
    requestAnimationFrame(render);

    update();

    renderer.render(scene, camera);
}

function addRubik() {
    rubik = new THREE.Group();

    let baseCube = createBaseCube();

    for (let i = - 1; i < 2; i++) {
        for (let j = - 1; j < 2; j++) {
            for (let k = - 1; k < 2; k++) {
                if (i == 0 && j == 0 && k == 0) { continue; }
                let clone = baseCube.clone();
                clone.position.set(i, j, k);
                rubik.add(clone);
            }
        }
    }
    scene.add(rubik);
}

function addSkybox() {
    let geometry = new THREE.BoxGeometry(100, 100, 100);

    let front = new THREE.TextureLoader().load("img/corona_ft.png");
    let back = new THREE.TextureLoader().load("img/corona_bk.png");
    let up = new THREE.TextureLoader().load("img/corona_up.png");
    let down = new THREE.TextureLoader().load("img/corona_dn.png");
    let right = new THREE.TextureLoader().load("img/corona_rt.png");
    let left = new THREE.TextureLoader().load("img/corona_lf.png");

    let materials = [
        new THREE.MeshBasicMaterial({map: front, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: back, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: up, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: down, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: right, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: left, side: THREE.BackSide})
    ]

    let skybox = new THREE.Mesh(geometry, materials);
    scene.add(skybox);
}

function createBaseCube(cubo) {
    let geometry = new THREE.BoxGeometry(.95, .95, .95);

    // blanco, amarillo, naranja, rojo, verde, azul en colores pastel
    let front = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true }); 
    let back = new THREE.MeshPhongMaterial({ color: 0xffffad, transparent: true });
    let up = new THREE.MeshPhongMaterial({ color: 0xffd493, transparent: true });
    let down = new THREE.MeshPhongMaterial({ color: 0xff9f8c, transparent: true });
    let right = new THREE.MeshPhongMaterial({ color: 0xa9bcff, transparent: true }); 
    let left = new THREE.MeshPhongMaterial({ color: 0x9affff, transparent: true });

    let materials = [
        front,
        back,
        up,
        down,
        right,
        left
    ]

    let cube = new THREE.Mesh(geometry, materials)
    cube.transparent = true;
    return cube;
}

function rotateSelectedFace() {
    const angle = Math.PI / 2;
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    selectedFace.face.normalMap().applyQuaternion(quaternion);
    selectedFace.vertexNormals.forEach(vn => vn.applyQuaternion(quaternion));
    cube.geometry.verticesNeedUpdate = true;
    cube.geometry.normalsNeedUpdate = true;
}

// Listeners
function onMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children);
    // mayor que 1 ya que el skybox siempre va a estar seleccionado
    if(intersects.length > 1) {
        if(selectedCube) {
            selectedCube.visible = true;
        }
        selectedCube = intersects[0].object
        selectedCube.visible = false;
        console.log(selectedCube)
    }

}

function onKeyPress(event) {
    if(event.key == 'r' && selectedFace) {
        console.log('procedemos a la rotasion')
        rotateSelectedFace();
    } else if (event.key == 'R' && selectedFace) {
        console.log('procedemos a la rotasion inversa')
    }
}

init();
addSkybox();
addRubik();
render();