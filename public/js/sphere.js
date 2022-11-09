import * as THREE from "/build/three.module.js";


let scene, camera, renderer, controls;
const container = document.querySelector(".web-gl");

function init () {
  // scene
  scene = new THREE.Scene();

  // camera
  const angle = 45; //wide-angle lens
  const aspect = window.innerWidth / window.innerHeight; //aspect ratio of the window
  const near = 0.1;
  const distance = 1000; // distance of the model shouldn't be greater than before value

  camera = new THREE.PerspectiveCamera(angle, aspect, near, distance);
  camera.position.set(0, 0, 4); // x,y,z
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix(); // update the camera's frustum
  //console.log(camera); //for checking the value

  // renderer
  renderer = new THREE.WebGLRenderer({
    canvas: container
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1) //pixel ration of the window : add a dynamic statement using ternary
  renderer.setClearColor(0x111111); //default should start at 0x

  // start the loop
  renderer.setAnimationLoop(() => {
  renderer.render(scene, camera); // add the scene & camera values
  });

  // controls

  // materials
  const geometry = new THREE.SphereGeometry();
  const material = new THREE.MeshStandardMaterial(
    {
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.4,
      wireframe: true
    }
  );
  material.side = THREE.DoubleSide;
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);


}

init();