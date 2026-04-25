function createGalaxy(container, color1, color2) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;z-index:0;';
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  const count = 5000;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorA = new THREE.Color(color1);
  const colorB = new THREE.Color(color2);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 5;
    const spinAngle = radius * 5;
    const branchAngle = ((i % 3) / 3) * Math.PI * 2;
    const randomX = (Math.random() - 0.5) * 0.5;
    const randomY = (Math.random() - 0.5) * 0.5;
    const randomZ = (Math.random() - 0.5) * 0.5;

    positions[i3]     = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = colorA.clone().lerp(colorB, radius / 5);
    colors[i3]     = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const galaxy = new THREE.Points(geo, mat);
  scene.add(galaxy);

  return { renderer, scene, camera, galaxy };
}

// كل section بلون مختلف
const sections = [
  createGalaxy(document.querySelector('.bg1'), '#4ddc9e', '#5b37eb'),
  createGalaxy(document.querySelector('.boo'),  '#647eff', '#42d392'),
  createGalaxy(document.querySelector('.bg2'),  '#ff6b6b', '#f1307e'),
  createGalaxy(document.querySelector('.bg3'),  '#ffffff', '#9b59b6'),
  createGalaxy(document.querySelector('.section:nth-child(5)'), '#ffffff', '#aaaaff'),
  createGalaxy(document.querySelector('.bg4'),  '#ff9d00', '#ff4444'),
  createGalaxy(document.querySelector('.bg5'),  '#2E17FF', '#00ffff'),
];

function animate() {
  requestAnimationFrame(animate);
  sections.forEach(({ renderer, scene, camera, galaxy }) => {
    galaxy.rotation.y += 0.001;
    renderer.render(scene, camera);
  });
}
animate();

window.addEventListener('resize', () => {
  sections.forEach(({ renderer, camera }) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
