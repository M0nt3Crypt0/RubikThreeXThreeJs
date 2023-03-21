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
    scene.add(new THREE.AmbientLight());

    // Crea y configura el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor(new THREE.Color(0xffffff), 1.0);
    document.body.appendChild(renderer.domElement);
    
    // Crea y configura la camara asi como sus controles
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 7;

    cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControl.target.set(1, 1, 1);
    camera.lookAt(1, 1, 1); 
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
    let min = 0;
    let max = 3;
    
    rubik = new THREE.Group();

    let cuboBase = createBaseCube();

    for (let i = min; i < max; i++) {
        for (let j = min; j < max; j++) {
            for (let k = min; k < max; k++) {
                if (i == 1 && j == 1 && k == 1) { continue; }
                eval("cube" + i + j + k + " = cuboBase.clone();");
                eval("cube" + i + j + k + ".position.set(i, j, k)");
                eval("rubik.add(cube" + i + j + k + ");");
            }
        }
    }
    scene.add(rubik);
}

function addSkybox() {
    let geometry = new THREE.BoxGeometry(100, 100, 100);

    let ft = new THREE.TextureLoader().load("img/corona_ft.png");
    let bk = new THREE.TextureLoader().load("img/corona_bk.png");
    let up = new THREE.TextureLoader().load("img/corona_up.png");
    let dn = new THREE.TextureLoader().load("img/corona_dn.png");
    let rt = new THREE.TextureLoader().load("img/corona_rt.png");
    let lf = new THREE.TextureLoader().load("img/corona_lf.png");

    let materials = [
        new THREE.MeshBasicMaterial({map: ft, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: bk, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: up, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: dn, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: rt, side: THREE.BackSide}) ,
        new THREE.MeshBasicMaterial({map: lf, side: THREE.BackSide})
    ]


    let skybox = new THREE.Mesh(geometry, materials);
    scene.add(skybox);
    console.log("Skybox añadida");
}

function createBaseCube(cubo) {
    let geometry = new THREE.BoxGeometry(.95, .95, .95).toNonIndexed();

    // blanco, amarillo, naranja, rojo, verde, azul
    const materialFront = new THREE.MeshPhongMaterial({ color: 0xffffff }); 
    const materialBack = new THREE.MeshPhongMaterial({ color: 0xffffad });
    const materialTop = new THREE.MeshPhongMaterial({ color: 0xffd493 });
    const materialBottom = new THREE.MeshPhongMaterial({ color: 0xff9f8c });
    const materialLeft = new THREE.MeshPhongMaterial({ color: 0x9affff });
    const materialRight = new THREE.MeshPhongMaterial({ color: 0xa9bcff }); 

    let materials = [
        materialFront,
        materialBack,
        materialTop,
        materialBottom,
        materialLeft,
        materialRight
    ]

    let cube = new THREE.Mesh(geometry, materials)
    return cube;
}

init();
addSkybox();
addRubik();
render();