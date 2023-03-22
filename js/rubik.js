let scene, camera, renderer;
let cameraControl, mouse, raycaster;

let rubik;
let selectedFace;

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
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 7;

    // Controles
    cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControl.target.set(1, 1, 1);
    camera.lookAt(1, 1, 1); 

    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    // Listeners
    window.addEventListener('mousemove', onMouseMove);
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

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (i == 1 && j == 1 && k == 1) { continue; }
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

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children);
    // mayor que 1 ya que el skybox siempre va a estar seleccionado
    if(intersects.length > 1) {
        console.log(intersects[0].object.position)
    }
}

function onMouseDown() {
    
}

function createBaseCube(cubo) {
    let geometry = new THREE.BoxGeometry(.95, .95, .95).toNonIndexed();

    // blanco, amarillo, naranja, rojo, verde, azul en colores pastel
    let front = new THREE.MeshPhongMaterial({ color: 0xffffff }); 
    let back = new THREE.MeshPhongMaterial({ color: 0xffffad });
    let up = new THREE.MeshPhongMaterial({ color: 0xffd493 });
    let down = new THREE.MeshPhongMaterial({ color: 0xff9f8c });
    let right = new THREE.MeshPhongMaterial({ color: 0xa9bcff }); 
    let left = new THREE.MeshPhongMaterial({ color: 0x9affff });

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

init();
addSkybox();
addRubik();
render();