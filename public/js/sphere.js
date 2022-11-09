import * as THREE from "/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls;
const container = document.querySelector(".web-gl");

function init() {
  // scene
  scene = new THREE.Scene();

  // camera
  const angle = 50; // Field Of View
  const aspect = window.innerWidth / window.innerHeight; // aspect ratio of the window
  const near = 0.1; // near clipping plane
  const distance = 1000; // distance of the model shouldn't be greater than before value | far clipping plane

  camera = new THREE.PerspectiveCamera(angle, aspect, near, distance);
  camera.position.set(0, 0, 4); // x,y,z (move the camera back so we can view the scene)
  camera.lookAt(new THREE.Vector3(0, 0, 4)); // Point the camera at a given coordinate (optional)
  camera.updateProjectionMatrix(); // update the camera's frustum
  
  // renderer
  renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true //smoothness
  });

  // required for controller(1)
  document.body.appendChild(renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1) //pixel ration of the window : add a dynamic statement using ternary
  camera.updateProjectionMatrix();
  renderer.setClearColor(0x111111); //default should start at 0x

  // controller (1) | set the orbit to move the sphere
  controls = new OrbitControls(camera, renderer.domElement); // Add orbit control

  // start the loop
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera, renderer); // add the scene & camera values
  });

  // default generated sphere
  const geometry = new THREE.SphereGeometry(); // not able to set to => 4 | as it was set to default
  
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

  // Ambient lightning
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  // animate
  function animate() {
    requestAnimationFrame(animate);
    // speed
    mesh.rotation.z += 0.008; 
    mesh.rotation.y += 0.008;
    mesh.rotation.x += 0.008;

    // controller (2)
    controls.update();

    // Re-render scene
    renderer.render(scene, camera);
  }

  animate()

}


init();
