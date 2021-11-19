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

const ball_geom = new THREE.SphereGeometry(1.89, 64, 64);

const mask_scale = 8
const mask_geom = new THREE.PlaneGeometry(mask_scale * 0.490, mask_scale * .183);

let plane
loader.load(
    'base.png',
    function (texture) {
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
        const marble_tex = new THREE.MeshBasicMaterial({
            map: texture
        });
        ball = new THREE.Mesh(ball_geom, marble_tex);
        ball.position.x = -0.8
        ball.position.y = -0.06
        scene.add(ball);
    },
    undefined,
    function (err) { console.error('An error happened.'); }
);

let x_ang_v = 0.0
let y_ang_v = 0.0
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (ball) {
        let rot = new THREE.Quaternion()
        rot.setFromEuler(new THREE.Euler(x_ang_v, y_ang_v,0))
        ball.applyQuaternion(rot)
    }
}
animate();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    if(!ball){return;}
    var keyCode = event.which;
    if (keyCode == 87 /*W: up*/) {
        x_ang_v -= 0.01;
    } else if (keyCode == 83 /*A: down*/) {
        x_ang_v += 0.01;
    } else if (keyCode == 65 /*S: left*/) {
        y_ang_v -= 0.01;
    } else if (keyCode == 68 /*D: right*/) {
        y_ang_v += 0.01;
    } else if (keyCode == 32 /*space*/) {
        x_ang_v *= 0.8;
        y_ang_v *= 0.8;
    }
};
