import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export const particleText = () => {
  const canvas = document.querySelector('.js-particleTextCanvas');
  if (!canvas) return;

  /* --------------------
   Renderer
  -------------------- */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  /* --------------------
   Scene
  -------------------- */
  const scene = new THREE.Scene();

  /* --------------------
   Camera
  -------------------- */
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  -500 * aspect,
   500 * aspect,
   500,
  -500,
  1,
  2000
);

camera.position.set(0, 0, 1000);
camera.lookAt(0, 0, 0);
scene.add(camera);

  /* --------------------
   Controls
  -------------------- */
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);

  /* --------------------
   Text Particles
  -------------------- */
  const fontLoader = new FontLoader();

  fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
    createTextParticles(font, 'W');
  });

  function createTextParticles(font, text) {
    const shapes = font.generateShapes(text, 200);

    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.center();

    const position = geometry.attributes.position;
    const count = position.count;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = position.getX(i);
      positions[i * 3 + 1] = position.getY(i);
      positions[i * 3 + 2] = position.getZ(i);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0x000000,
      size: 4,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
    });

    const points = new THREE.Points(particleGeometry, material);
    scene.add(points);
  }


  /* --------------------
   Light（最低限）
  -------------------- */
  const light = new THREE.AmbientLight(0x000000, 1);
  scene.add(light);

  /* --------------------
   Animation Loop
  -------------------- */
  function tick() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  /* --------------------
   Resize
  -------------------- */
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
};
