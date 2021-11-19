const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    1160 / 655,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(
    1160,
    655,
);
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
loader.load('kugel.jpg',
    function (texture) {
        scene.background = texture;
    }
);

let plane
loader.load(
    'base.png',
    function (texture) {
        const mask_scale = 8
        const mask_geom = new THREE.PlaneGeometry(mask_scale * 0.490, mask_scale * .183);
                const mask_mat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
        });
        const plane = new THREE.Mesh(mask_geom, mask_mat);
        plane.position.x = -0.53
        plane.position.y = -1.4
        plane.position.z = 1.6
        scene.add(plane);
    },
    undefined, // progress cb
    function (err) { console.error('An error happened.'); }
);

let ball
loader.load(
    'Stone_Texture_12.jpg',
    function (texture) {
        const ball_geom = new THREE.SphereGeometry(1.89, 64, 64);
        const marble_tex = new THREE.MeshPhysicalMaterial({
            map: texture,
            clearcoat: 1,
            clearcoatRoughness: 0.41,
            reflectivity: 0.6,
        });
        ball = new THREE.Mesh(ball_geom, marble_tex);
        ball.position.x = -0.8
        ball.position.y = -0.06
        scene.add(ball);

        const alight = new THREE.AmbientLight( 0xffff88 );
        scene.add( alight );

        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-12, 6, 1);
        light.target = ball;
        scene.add(light)
    },
    undefined,
    function (err) { console.error('An error happened.'); }
);

let x_ang_v_tgt = 0.0
let y_ang_v_tgt = 0.0
let x_ang_v_cur = 0.0
let y_ang_v_cur = 0.0
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (ball) {
        let rot = new THREE.Quaternion()
        x_ang_v_cur = 0.05 * x_ang_v_tgt + 0.95 * x_ang_v_cur
        y_ang_v_cur = 0.05 * y_ang_v_tgt + 0.95 * y_ang_v_cur
        rot.setFromEuler(new THREE.Euler(x_ang_v_cur, y_ang_v_cur,0))
        ball.applyQuaternion(rot)
    }
}
animate();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    if(!ball){return;}
    var keyCode = event.which;
    if (keyCode == 87 /*W: up*/) {
        x_ang_v_tgt -= 0.003;
    } else if (keyCode == 83 /*A: down*/) {
        x_ang_v_tgt += 0.003;
    } else if (keyCode == 65 /*S: left*/) {
        y_ang_v_tgt -= 0.003;
    } else if (keyCode == 68 /*D: right*/) {
        y_ang_v_tgt += 0.003;
    } else if (keyCode == 32 /*space*/) {
        x_ang_v_tgt *= 0.95;
        y_ang_v_tgt *= 0.95;
    } else if (keyCode == 8 /*backspace*/){
        x_ang_v_tgt = 0
        y_ang_v_tgt = 0
    }
};
