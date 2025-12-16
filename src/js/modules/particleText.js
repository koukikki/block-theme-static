import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const particleText = () => {
  const canvas = document.querySelector('.js-particleTextCanvas');
  if (!canvas) return;

  // レンダラーの作成
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  });

  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(1);
  renderer.setSize(width, height);

  // シーンの作成
  const scene = new THREE.Scene();

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(10, width / height);
  camera.position.set(20, 1000, 200);
  scene.add(camera);

  const controls = new OrbitControls(camera);

  // モデルを読み込み
  const loader = new GLTFLoader();
  const url = '/model/text-wb.glb';

  let model = null;
  loader.load(
    url,
    function (gltf) {
      model = gltf.scene;
      model.name = 'model_with_cloth';
      model.scale.set(100, 100, 100);
      model.position.set(0, 0, 0);
      scene.add(model);
      console.log('GLB loaded');
    },
    undefined,
  );

  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;

  // 平行光源
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);
  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();
  function tick() {
    controls.update();

    scene.traverse(function (obj) {
      if (obj.name == 'J_Bip_C_Chest') {
        obj.rotation.z += (2 / 180) * 3.1415;
      }
    });
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  // 初期化のために実行
  onResize();
  // リサイズイベント発生時に実行
  window.addEventListener('resize', onResize);
  function onResize() {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    console.log(width);
  }
};
