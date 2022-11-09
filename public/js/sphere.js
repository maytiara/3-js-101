import * as THREE from "/build/three.module.js";
import { MathUtils } from "/build/three.module.js";

let scene, camera, renderer, controls;
const container = document.querySelector(".web-gl");

function init() {
  // scene
  scene = new THREE.Scene();

  // camera
  const angle = 40; // Field Of View
  const aspect = window.innerWidth / window.innerHeight; // aspect ratio of the window
  const near = 0.1; // near clipping plane
  const distance = 1000; // distance of the model shouldn't be greater than before value | far clipping plane

  camera = new THREE.PerspectiveCamera(angle, aspect, near, distance);
  camera.position.set(0, 0, 4); // x,y,z (move the camera back so we can view the scene)
  camera.lookAt(new THREE.Vector3(0, 0, 4)); // Point the camera at a given coordinate (optional)
  camera.updateProjectionMatrix(); // update the camera's frustum
  
  // controller
  //controls = new THREE.OrbitControls(); // Add orbit control
  //controls.target.set(0, -0.5, 0);
  //controls.update();

  // renderer
  renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1) //pixel ration of the window : add a dynamic statement using ternary
  renderer.setClearColor(0x111111); //default should start at 0x

  // start the loop
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera, renderer); // add the scene & camera values
  });

  // geometry
  const geometry = new THREE.SphereGeometry(); // not able to set to => 4
  
  // default basic material with diff properties
  const material = new THREE.MeshStandardMaterial(
    {
      color: 0xff0000,
      roughness: 0.2,
      metalness: 0.4,
      wireframe: true
    }
  );
  material.side = THREE.DoubleSide;

  // a Mesh containing the geometry and material (!do not set rotation & MathUtils and mixed with mesh.rotation.z)
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  // Directional light (sunlight)
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  // animate
  function animate() {
    requestAnimationFrame(animate);
    // speed
    mesh.rotation.z += 0.008; 
    // Re-render scene
    renderer.render(scene, camera);
  }

  animate()

}

init();
