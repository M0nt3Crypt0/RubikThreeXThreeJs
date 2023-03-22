let scene, camera, renderer;
let cameraControl, mouse, raycaster;

let cubes = [];
let selectedFace = new THREE.Object3D(), 
selectedCubes = [];

let selectedCube = null;
let selectedAxis;

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

    // Interpolador 

    // Listeners
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keypress', onKeyPress);
}

function update() {
    //selectedFace.rotation.z += 0.01;
}

function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}

function addRubik() {
    let baseCube = createBaseCube();

    for (let i = - 1; i < 2; i++) {
        for (let j = - 1; j < 2; j++) {
            for (let k = - 1; k < 2; k++) {
                if (i == 0 && j == 0 && k == 0) { continue; }
                let clone = baseCube.clone();
                clone.position.set(i, j, k);
                cubes.push(clone);
                scene.add(clone);
            }
        }
    }
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

function createBaseCube() {
    let geometry = new THREE.BoxGeometry(.95, .95, .95);

    // blanco, amarillo, naranja, rojo, verde, azul en colores pastel
    let front = new THREE.MeshPhongMaterial({color: 0xffffff}); 
    let back = new THREE.MeshPhongMaterial({color: 0xffffad});
    let up = new THREE.MeshPhongMaterial({color: 0xffd493});
    let down = new THREE.MeshPhongMaterial({color: 0xff9f8c});
    let right = new THREE.MeshPhongMaterial({color: 0xa9bcff}); 
    let left = new THREE.MeshPhongMaterial({color: 0x9affff});

    let materials = [
        front,
        back,
        up,
        down,
        right,
        left
    ]

    let cube = new THREE.Mesh(geometry, materials)
    return cube;
}

function selectFace(center) {
    console.log('selecciona')
    cubes.forEach(cube => {
        selectedCubes = [];
    });

    cubes.forEach(cube => {
        if (selectedAxis == 'x') {
            if (cube.position.x == center) {
                selectedCubes.push(cube);
            }
        } else if (selectedAxis == 'y') {
            if (cube.position.y == center) {
                selectedCubes.push(cube);
            }
        } else if (selectedAxis == 'z') {
            if (cube.position.z == center) {
                selectedCubes.push(cube);
            }
        }
    });
}

function rotateSelectedFace() {
    THREE.SceneUtils.detach( selectedCube, selectedFace, scene );
    // reset parent object rotation
    selectedFace.rotation.set( 0, 0, 0 );
    selectedFace.updateMatrixWorld();
    // attach dice to pivot object
    THREE.SceneUtils.attach( selectedCube, scene, selectedFace );

    if (selectedAxis == 'x') {
        console.log('giro1')
        var tween = new TWEEN.Tween(selectedFace.rotation)
                .delay(0)
                .to({ x: "-" + Math.PI/2}, 500)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();

    } else if (selectedAxis == 'y') {
        console.log('giro2')
        var tween = new TWEEN.Tween(selectedFace.rotation)
                .delay(0)
                .to({ y: "-" + Math.PI/2}, 500)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();

    } else if (selectedAxis == 'z') {
        console.log('giro3')
        var tween = new TWEEN.Tween(selectedFace.rotation)
                .delay(0)
                .to({ z: "-" + Math.PI/2}, 500)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();
    }
}

// return axis z, y or z if is center
function isCenter() {
    console.log('comprueba centro')
    if (selectedCube.position.equals({x:  0, y:  0, z:  1}) ||
    selectedCube.position.equals({x:  0, y:  0, z: -1})) {
        selectedAxis = 'z';
        return selectedCube.position.z;
    } else if(selectedCube.position.equals({x:  0, y:  1, z:  0}) ||
    selectedCube.position.equals({x:  0, y: -1, z:  0})) {
        selectedAxis = 'y';
        return selectedCube.position.y;
    } else if(selectedCube.position.equals({x:  1, y:  0, z:  0}) ||
    selectedCube.position.equals({x: -1, y:  0, z:  0})) {
        selectedAxis = 'x';
        return selectedCube.position.x;
    } else {
        return false;
    }
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
        selectedCube = intersects[0].object;
        let center = isCenter(selectedCube)
        if (center) {
            selectedCube.visible = false;
            selectFace(center);
        }
    }

}

function onKeyPress(event) {
    if(event.key == 'r' && selectedFace) {
        rotateSelectedFace();
    }
}

init();
addSkybox();
addRubik();
render();