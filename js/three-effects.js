// ===== SECTION 1 - Particles =====
const canvas1 = document.createElement('canvas');
canvas1.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
document.querySelector('.bg1').appendChild(canvas1);

const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1, alpha: true });
renderer1.setSize(window.innerWidth, window.innerHeight);

const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.z = 5;

// Particles
const particlesGeo = new THREE.BufferGeometry();
const count = 2000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMat = new THREE.PointsMaterial({ color: 0x4ddc9e, size: 0.05 });
const particles = new THREE.Points(particlesGeo, particlesMat);
scene1.add(particles);

// ===== SECTION 3 - Rotating Torus =====
const canvas3 = document.createElement('canvas');
canvas3.style.cssText = 'position:absolute;top:0;left:0;z-index:0;width:100%;height:100%;';
document.querySelector('.bg2').appendChild(canvas3);

const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3, alpha: true });
renderer3.setSize(window.innerWidth, window.innerHeight);

const scene3 = new THREE.Scene();
const camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera3.position.z = 5;

const torusGeo = new THREE.TorusGeometry(2, 0.3, 16, 100);
const torusMat = new THREE.MeshStandardMaterial({ color: 0x5b37eb, wireframe: true });
const torus = new THREE.Mesh(torusGeo, torusMat);
scene3.add(torus);

const light3 = new THREE.PointLight(0xffffff, 1);
light3.position.set(5, 5, 5);
scene3.add(light3);

// ===== SECTION 4 - Floating Sphere (bg3 - logo section) =====
const canvas4 = document.createElement('canvas');
canvas4.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
document.querySelector('.bg3').appendChild(canvas4);

const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4, alpha: true });
renderer4.setSize(window.innerWidth, window.innerHeight);

const scene4 = new THREE.Scene();
const camera4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera4.position.z = 5;

const sphereGeo = new THREE.SphereGeometry(1.5, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0x9b59b6, wireframe: true });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene4.add(sphere);

const light4 = new THREE.PointLight(0xffffff, 1);
light4.position.set(5, 5, 5);
scene4.add(light4);

// ===== SECTION 5 - Video Section Stars =====
const canvas5 = document.createElement('canvas');
canvas5.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
document.querySelector('.section:nth-child(5)').appendChild(canvas5);

const renderer5 = new THREE.WebGLRenderer({ canvas: canvas5, alpha: true });
renderer5.setSize(window.innerWidth, window.innerHeight);

const scene5 = new THREE.Scene();
const camera5 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera5.position.z = 5;

const starsGeo = new THREE.BufferGeometry();
const starsCount = 1500;
const starsPos = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount * 3; i++) {
  starsPos[i] = (Math.random() - 0.5) * 30;
}
starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08 });
const stars = new THREE.Points(starsGeo, starsMat);
scene5.add(stars);

// ===== SECTION 6 - bg4 Floating Boxes =====
const canvas6 = document.createElement('canvas');
canvas6.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
document.querySelector('.bg4').appendChild(canvas6);

const renderer6 = new THREE.WebGLRenderer({ canvas: canvas6, alpha: true });
renderer6.setSize(window.innerWidth, window.innerHeight);

const scene6 = new THREE.Scene();
const camera6 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera6.position.z = 5;

const boxes = [];
for (let i = 0; i < 10; i++) {
  const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff9d00, wireframe: true });
  const box = new THREE.Mesh(geo, mat);
  box.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5);
  scene6.add(box);
  boxes.push(box);
}
const light6 = new THREE.PointLight(0xffffff, 1);
light6.position.set(5, 5, 5);
scene6.add(light6);

// ===== SECTION 7 - bg5 Water Particles =====
const canvas7 = document.createElement('canvas');
canvas7.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
document.querySelector('.bg5').appendChild(canvas7);

const renderer7 = new THREE.WebGLRenderer({ canvas: canvas7, alpha: true });
renderer7.setSize(window.innerWidth, window.innerHeight);

const scene7 = new THREE.Scene();
const camera7 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera7.position.z = 5;

const waterGeo = new THREE.BufferGeometry();
const waterCount = 1000;
const waterPos = new Float32Array(waterCount * 3);
for (let i = 0; i < waterCount * 3; i++) {
  waterPos[i] = (Math.random() - 0.5) * 20;
}
waterGeo.setAttribute('position', new THREE.BufferAttribute(waterPos, 3));
const waterMat = new THREE.PointsMaterial({ color: 0x2E17FF, size: 0.08 });
const waterParticles = new THREE.Points(waterGeo, waterMat);
scene7.add(waterParticles);

// ===== ANIMATE ALL =====
function animate() {
  requestAnimationFrame(animate);

  // Section 1 - particles rotate
  particles.rotation.y += 0.001;
  particles.rotation.x += 0.0005;
  renderer1.render(scene1, camera1);

  // Section 3 - torus rotate
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  renderer3.render(scene3, camera3);

  // Section 4 - sphere rotate
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.01;
  renderer4.render(scene4, camera4);

  // Section 5 - stars rotate
  stars.rotation.y += 0.0005;
  renderer5.render(scene5, camera5);

  // Section 6 - boxes float
  boxes.forEach((box, i) => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    box.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
  });
  renderer6.render(scene6, camera6);

  // Section 7 - water particles
  waterParticles.rotation.y += 0.001;
  renderer7.render(scene7, camera7);
}

animate();

// ===== RESIZE =====
window.addEventListener('resize', () => {
  [camera1, camera3, camera4, camera5, camera6, camera7].forEach(cam => {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
  });
  [renderer1, renderer3, renderer4, renderer5, renderer6, renderer7].forEach(ren => {
    ren.setSize(window.innerWidth, window.innerHeight);
  });
});
