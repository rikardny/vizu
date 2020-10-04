const { addLine, addVerts, addFaces, getData, newSpeed, newLight, newBackground } = require("./helper.js");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    90, window.innerWidth/window.innerHeight, 0.1, 10 
)
// Progam constants
const fft = 1024;
const width = 8;
const elements = 31;
const h = width/elements;
const res = 8;

// Camera
let height = 0.2;
camera.position.set(0, 0, height);
camera.rotateX(0.4*Math.PI);

// Renderer
renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.getElementById("webglviewer").appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})


// Models
let points = [];
let geo = [];
let models = [];
let mat = new THREE.MeshPhongMaterial( {
    color: 0xffffff, 
    wireframe: true,
    vertexColors: THREE.VertexColors,
});

addLine(0);

// Lighting
let light = new THREE.PointLight( 0xffffff );
let ambient = new THREE.AmbientLight( 0xffffff, 0.00 );
scene.add(ambient);
scene.add(light);

// Movement parameters
let origSpeed = 0.1;
let speed = origSpeed;
let v = 60/speed;
isPlaying = false;

let i = 1;
let a = 0
var render = () => {
    requestAnimationFrame(render);
    speed = newSpeed(origSpeed);
    v = 60/speed;
    
    c = Math.cos(0.003*i*Math.PI);

    let diff = camera.position.y- models.length/res + 9.5;
    for (let i = 0; i < diff; i++) {
        let y = models.length;
        geo[y] = new THREE.Geometry();
        addLine(y+1, getData());
        addVerts(y);
        addFaces(y);
    
        r = 1 - c;
        b = Math.abs(-1 - c);
        
        geo[y].faces.forEach(f => {
            let color = new THREE.Color(Math.random()*r, 0, Math.random()*b);
            f.color.set(color);
        });
        geo[y].computeFlatVertexNormals();
        models[y] = new THREE.Mesh( geo[y], mat );
        scene.add(models[y]);
    }
    
    light.position.x = width*0.5*Math.cos(0.025*i*Math.PI);
    light.position.y = camera.position.y+2;
    light.position.z = 5;
    light.power = newLight();
    
    if (isPlaying) {
        value = Math.tanh(0.01*a);
        camera.position.z = 2.8*value+0.2;
        rgb = new THREE.Color( 1-value, 1-value, 1-value );
        if (value < 0.95) {
            renderer.setClearColor( rgb );
        } else {
            renderer.setClearColor(newBackground());
        }
        a += 1;
    }

    camera.position.y += 1/v;
    
    try {
        camera.fov = 90 - 0.15*analyser.getAverageFrequency();
    } catch (error) {
    }
    camera.updateProjectionMatrix()

    i += 1;
    renderer.render(scene, camera);
}

render();