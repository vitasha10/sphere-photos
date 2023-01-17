import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, sphere, controls, skybox;
let skyboxImage = "space";
const sdBtn = document.querySelector(".sd");
const hdBtn = document.querySelector(".hd");

sdBtn.onclick = () => changeTextQuality("low");
hdBtn.onclick = () => changeTextQuality("high");

function createPathStrings(filename) {
  /*const basePath = "";
  const baseFilename = basePath + filename;
  const fileType = ".png";
  const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
  const pathStrings = sides.map((side) => {
    return baseFilename + "_" + side + fileType;
  });
  return pathStrings;*/
}

function createMaterialArray(filename) {
  /*const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture }); // <---
  });
  return materialArray;*/
}

function setSkyBox() {
  /*const materialArray = createMaterialArray(skyboxImage);
  // let temp = new THREE.TextureLoader().load("../img/space_stars_bg.jpg");
  // let temp1 = new THREE.MeshBasicMaterial({ map: temp, side: THREE.BackSide });
  let skyboxGeo = new THREE.BoxGeometry(200, 200, 200);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);*/
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  setSkyBox();
  loadTexture(prompt());
  scene.add(sphere);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "c";

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 100;

  camera.position.z = 20;
}

function loadTexture(texture) {
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const loader = new THREE.TextureLoader();
  const earthTexture = loader.load(texture);
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });

  sphere = new THREE.Mesh(geometry, material);
}

function changeTextQuality(quality) {
  switch (quality) {
    case "high":
      scene.remove(sphere);
      loadTexture("../img/earth_hd.jpg");
      scene.add(sphere);
      break;
    case "low":
      scene.remove(sphere);
      loadTexture("../img/earth_texture.jpg");
      scene.add(sphere);
      break;
    default:
      console.log("error must choose between values: high / low");
  }
}

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
