import * as THREE from "/build/three.module.js";
console.log(THREE);

let scene, camera, renderer, controls;
const container = document.querySelector(".web-gl");

const init = () => {
  // scene
  scene = new THREE.Scene();

  // camera
  const angle = 40; //wide-angle lens
  const aspect = window.innerWidth / window.innerHeight; //aspect ratio of the window
  const near = 0.1;
  const distance = 1000; // distance of the model shouldn't be greater than before value

  camera = new THREE.PerspectiveCamera(angle, aspect, near, distance);
  camera.position.set(0, 0, 25); // x,y,z
  //console.log(camera); //for checking the value

  // renderer
  renderer = new THREE.WebGLRenderer({
    canvas: container
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1) //pixel ration of the window : add a dynamic statement using ternary
  //renderer.autoClear = false;
  renderer.setClearColor(0x000000, 1.0); //default should start at 0x
  renderer.render(scene, camera);
}

init();