const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl')

const geometry = new THREE.BoxGeometry(.25,.2,.2);
// const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000
// });
const loader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
    map: loader.load("assets/img/Nube1.png")
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

scene.background = new THREE.Color(0xEFF8FB);

// Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    mesh.position.x = Math.sin(elapsedTime / 50); 
    // mesh.position.x += -0.0001 * elapsedTime;
    // mesh.position.x = Math.sin(elapsedTime)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()