import * as THREE from 'three'
import { gsap } from 'gsap'
import { TweenMax } from 'gsap'
import { Circ } from 'gsap'

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube and add it to the scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add event listeners for mouseover and click
const raycaster = new THREE.Raycaster();
renderer.domElement.addEventListener('mousedown', onMouseDown, false);

function onMouseDown(event) {
// Calculate the mouse position in normalized device coordinates (-1 to +1) for raycasting
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Set the raycaster's origin and direction based on the mouse position
    raycaster.setFromCamera(mouse, camera);

    // If it intersects the cube mesh, turn it red
    if(raycaster.intersectObject(cube)[0]) {
      console.log('click');
        material.color.setHex(0xff0000);
        //const deg360 = 2
        gsap.to(cube.rotation, { duration: 2, y: '+=' + Math.PI * 2 });
    };
}

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();