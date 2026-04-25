// ===== WAVES - bg1 =====
function createWaves(container, color) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
  container.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 5);
  camera.lookAt(0, 0, 0);

  const geo = new THREE.PlaneGeometry(10, 10, 50, 50);
  const mat = new THREE.MeshStandardMaterial({ color, wireframe: true });
  const plane = new THREE.Mesh(geo, mat);
  plane.rotation.x = -Math.PI / 3;
  scene.add(plane);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  return { renderer, scene, camera, plane, geo };
}

// ===== LIGHTNING - boo =====
function createLightning(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
  container.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  function makeBolt() {
    const points = [];
    let x = (Math.random() - 0.5) * 6;
    let y = 4;
    while (y > -4) {
      points.push(new THREE.Vector3(x, y, 0));
      x += (Math.random() - 0.5) * 1.2;
      y -= Math.random() * 0.5 + 0.2;
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: 0x647eff, linewidth: 2 });
    return new THREE.Line(geo, mat);
  }

  let bolts = [];
  function refreshBolts() {
    bolts.forEach(b => scene.remove(b));
    bolts = [];
    const n = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < n; i++) {
      const b = makeBolt();
      scene.add(b);
      bolts.push(b);
    }
  }
  refreshBolts();
  setInterval(refreshBolts, 400);

  return { renderer, scene, camera };
}

// ===== NETWORK - bg2 =====
function createNetwork(container, color) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
  container.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 8;

  const nodes = [];
  const nodeCount = 40;
  for (let i = 0; i < nodeCount; i++) {
    const geo = new THREE.SphereGeometry(0.08, 8, 8);
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4
    );
    mesh.userData.vel = new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      0
    );
    scene.add(mesh);
    nodes.push(mesh);
  }

  let linesMesh = null;
  function updateLines() {
    if (linesMesh) scene.remove(linesMesh);
    const points = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 3) {
          points.push(nodes[i].position.clone());
          points.push(nodes[j].position.clone());
        }
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color, opacity: 0.3, transparent: true });
    linesMesh = new THREE.LineSegments(geo, mat);
    scene.add(linesMesh);
  }

  return { renderer, scene, camera, nodes, updateLines };
}

// ===== VORTEX - bg3 =====
function createVortex(container, color) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
  container.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const count = 3000;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const angles = new Float32Array(count);
  const radii = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    angles[i] = Math.random() * Math.PI * 2;
    radii[i] = Math.random() * 4 + 0.5;
    positions[i * 3] = Math.cos(angles[i]) * radii[i];
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = Math.sin(angles[i]) * radii[i];
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color, size: 0.03, blending: THREE.AdditiveBlending });
  const vortex = new THREE.Points(geo, mat);
  scene.add(vortex);

  return { renderer, scene, camera, vortex, geo, positions, angles, radii, count };
}

// ===== SHOOTING STARS - section 5 =====
function createShootingStars(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
  container.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const stars = [];
  function makeStar() {
    const points = [
      new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, 0),
      new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, 0)
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
    const line = new THREE.Line(geo, mat);
    line.userData = { life: 1, vel: new THREE.Vector3((Math.random() - 0.5) * 0.1, -0.05, 0) };
    scene.add(line);
    stars.push(line);
  }

  setInterval(makeStar, 300);
  return { renderer, scene, camera, stars };
}

// ===== INIT =====
const w1 = createWaves(document.querySelector('.bg1'), 0x4ddc9e);
const l1 = createLightning(document.querySelector('.boo'));
const n1 = createNetwork(document.querySelector('.bg2'), 0x5b37eb);
const v1 = createVortex(document.querySelector('.bg3'), 0x9b59b6);
const ss = createShootingStars(document.querySelector('.section:nth-child(5)'));
const w2 = createWaves(document.querySelector('.bg4'), 0xff9d00);
const n2 = createNetwork(document.querySelector('.bg5'), 0x2E17FF);

let t = 0;

function animate() {
  requestAnimationFrame(animate);
  t += 0.05;

  // Waves bg1
  const pos1 = w1.geo.attributes.position;
  for (let i = 0; i < pos1.count; i++) {
    const x = pos1.getX(i);
    const z = pos1.getZ(i);
    pos1.setY(i, Math.sin(x * 0.5 + t) * 0.5 + Math.cos(z * 0.5 + t) * 0.5);
  }
  pos1.needsUpdate = true;
  w1.renderer.render(w1.scene, w1.camera);

  // Lightning
  l1.renderer.render(l1.scene, l1.camera);

  // Network bg2
  n1.nodes.forEach(node => {
    node.position.add(node.userData.vel);
    if (Math.abs(node.position.x) > 6) node.userData.vel.x *= -1;
    if (Math.abs(node.position.y) > 4) node.userData.vel.y *= -1;
  });
  n1.updateLines();
  n1.renderer.render(n1.scene, n1.camera);

  // Vortex
  const vPos = v1.geo.attributes.position;
  for (let i = 0; i < v1.count; i++) {
    v1.angles[i] += 0.005 / (v1.radii[i] * 0.5);
    vPos.setX(i, Math.cos(v1.angles[i]) * v1.radii[i]);
    vPos.setZ(i, Math.sin(v1.angles[i]) * v1.radii[i]);
  }
  vPos.needsUpdate = true;
  v1.renderer.render(v1.scene, v1.camera);

  // Shooting Stars
  ss.stars.forEach((star, idx) => {
    star.position.add(star.userData.vel);
    star.material.opacity -= 0.02;
    if (star.material.opacity <= 0) {
      ss.scene.remove(star);
      ss.stars.splice(idx, 1);
    }
  });
  ss.renderer.render(ss.scene, ss.camera);

  // Waves bg4
  const pos2 = w2.geo.attributes.position;
  for (let i = 0; i < pos2.count; i++) {
    const x = pos2.getX(i);
    const z = pos2.getZ(i);
    pos2.setY(i, Math.sin(x * 0.5 + t) * 0.5 + Math.cos(z * 0.5 + t) * 0.5);
  }
  pos2.needsUpdate = true;
  w2.renderer.render(w2.scene, w2.camera);

  // Network bg5
  n2.nodes.forEach(node => {
    node.position.add(node.userData.vel);
    if (Math.abs(node.position.x) > 6) node.userData.vel.x *= -1;
    if (Math.abs(node.position.y) > 4) node.userData.vel.y *= -1;
  });
  n2.updateLines();
  n2.renderer.render(n2.scene, n2.camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
  [w1, w2].forEach(({ renderer, camera }) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  [l1, n1, v1, ss, n2].forEach(({ renderer, camera }) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
