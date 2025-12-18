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
    createTextParticles(font, 'WB');
  });

  function createTextParticles(font, text) {
  const shapes = font.generateShapes(text, 300);

  const geometry = new THREE.ShapeGeometry(shapes);
  geometry.center();

  const pos = geometry.attributes.position.array;

  const points = [];

  const skip = 2; 
  // ↑ 数値を上げるほど軽く・荒くなる
  //   1: 密 / 2〜3: おすすめ / 5: かなり軽い

  for (let i = 0; i < pos.length; i += 9 * skip) {
    points.push(
      pos[i],     // x
      pos[i + 1], // y
      pos[i + 2]  // z
    );
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(points, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0x000000,
    size: 6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeometry, material);
  scene.add(particles);
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
