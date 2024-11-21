import * as THREE from "three";
import vertexShader from "./shaders/vertexShader.glsl";
import fragmentShader from "./shaders/fragmentShader.glsl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const geometry = new THREE.IcosahedronGeometry(4, 50);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uColorChange: {
      value: 0,
    },
  },
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = -6;
scene.add(mesh);
camera.position.z = 7;

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing",
    start: "top top",
    end: "bottom center",
    scrub: 2,
  },
});
tl.to(
  mesh.position,
  {
    y: 0,
    ease: "Power2.inOut",
  },
  "a"
).to(
  material.uniforms.uColorChange,
  {
    value: 1,
    ease: "linear",
  },
  "a"
).to(
  ".landing h1",
  {
    opacity: 0,
  },
  
).to(
  ".landing p",
  {
    opacity:1,
  },
  
);

let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  material.uniforms.uTime.value = clock.getElapsedTime();
}
animate();
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
