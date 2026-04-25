function createSpace(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4;

  // ===== CIRCLE TEXTURE =====
  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 32;
  spriteCanvas.height = 32;
  const ctx = spriteCanvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(16, 16, 16, 0, Math.PI * 2);
  ctx.fill();
  const sprite = new THREE.CanvasTexture(spriteCanvas);

  // ===== STARS =====
  const starsGeo = new THREE.BufferGeometry();
  const starsCount = 500;
  const starsPos = new Float32Array(starsCount * 3);
  const starsColors = new Float32Array(starsCount * 3);

  const starColorOptions = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#aaaaff'),
    new THREE.Color('#ffddaa'),
    new THREE.Color('#aaffff'),
  ];

  for (let i = 0; i < starsCount; i++) {
    const i3 = i * 3;
    starsPos[i3]     = (Math.random() - 0.5) * 30;
    starsPos[i3 + 1] = (Math.random() - 0.5) * 30;
    starsPos[i3 + 2] = (Math.random() - 0.5) * 30;
    const c = starColorOptions[Math.floor(Math.random() * starColorOptions.length)];
    starsColors[i3]     = c.r;
    starsColors[i3 + 1] = c.g;
    starsColors[i3 + 2] = c.b;
  }

  starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
  starsGeo.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));

  const starsMat = new THREE.PointsMaterial({
    size: 0.15,
    map: sprite,
    vertexColors: true,
    depthWrite: false,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  const stars = new THREE.Points(starsGeo, starsMat);
  scene.add(stars);

  // ===== GALAXY =====
  const galaxyGeo = new THREE.BufferGeometry();
  const galaxyCount = 6000;
  const galaxyPos = new Float32Array(galaxyCount * 3);
  const galaxyColors = new Float32Array(galaxyCount * 3);

  const colorA = new THREE.Color('#5b37eb');
  const colorB = new THREE.Color('#4ddc9e');
  const colorC = new THREE.Color('#f1307e');

  for (let i = 0; i < galaxyCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 6;
    const spinAngle = radius * 3;
    const branchAngle = ((i % 4) / 4) * Math.PI * 2;
    const scatter = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;

    galaxyPos[i3]     = Math.cos(branchAngle + spinAngle) * radius + scatter;
    galaxyPos[i3 + 1] = scatter * 0.3;
    galaxyPos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + scatter;

    const mixColor = radius < 3
      ? colorA.clone().lerp(colorB, radius / 3)
      : colorB.clone().lerp(colorC, (radius - 3) / 3);

    galaxyColors[i3]     = mixColor.r;
    galaxyColors[i3 + 1] = mixColor.g;
    galaxyColors[i3 + 2] = mixColor.b;
  }

  galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3));
  galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));

  const galaxyMat = new THREE.PointsMaterial({
    size: 0.12,
    map: sprite,
    vertexColors: true,
    depthWrite: false,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
  scene.add(galaxy);

  // ===== NEBULA =====
  const nebulaGeo = new THREE.BufferGeometry();
  const nebulaCount = 2000;
  const nebulaPos = new Float32Array(nebulaCount * 3);
  const nebulaColors = new Float32Array(nebulaCount * 3);

  const nebulaColorOptions = [
    new THREE.Color('#ff6b6b'),
    new THREE.Color('#5b37eb'),
    new THREE.Color('#4ddc9e'),
    new THREE.Color('#f1307e'),
  ];

  for (let i = 0; i < nebulaCount; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random() * 4 + 1;

    nebulaPos[i3]     = r * Math.sin(phi) * Math.cos(theta);
    nebulaPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
    nebulaPos[i3 + 2] = r * Math.cos(phi);

    const c = nebulaColorOptions[Math.floor(Math.random() * nebulaColorOptions.length)];
    nebulaColors[i3]     = c.r;
    nebulaColors[i3 + 1] = c.g;
    nebulaColors[i3 + 2] = c.b;
  }

  nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
  nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

  const nebulaMat = new THREE.PointsMaterial({
    size: 0.2,
    map: sprite,
    vertexColors: true,
    depthWrite: false,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
  });

  const nebula = new THREE.Points(nebulaGeo, nebulaMat);
  scene.add(nebula);

  return { renderer, scene, camera, stars, galaxy, nebula };
}

// ===== INIT =====
const sections = [
  createSpace(document.querySelector('.bg1')),
  createSpace(document.querySelector('.boo')),
  createSpace(document.querySelector('.bg2')),
  createSpace(document.querySelector('.bg3')),
  createSpace(document.querySelector('.section:nth-child(5)')),
  createSpace(document.querySelector('.bg4')),
  createSpace(document.querySelector('.bg5')),
];

// ===== ANIMATE =====
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.0003;

  sections.forEach(({ renderer, scene, camera, stars, galaxy, nebula }) => {
    stars.rotation.y  += 0.0001;
    stars.rotation.x  += 0.00005;
    galaxy.rotation.y += 0.0003;
    galaxy.rotation.z += 0.0001;
    nebula.rotation.y -= 0.0002;
    nebula.rotation.x += 0.0001;
    galaxy.rotation.x += Math.sin(t) * 0.0002;
    renderer.render(scene, camera);
  });
}
animate();

// ===== RESIZE =====
window.addEventListener('resize', () => {
  sections.forEach(({ renderer, camera }) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
