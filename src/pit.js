// The long-jump pit at true scale: board at x = 0, her mark at x = 5.17 m,
// and the visitor laid out head to toe in the sand from the board onward.
import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, HemisphereLight, DirectionalLight,
  Mesh, Group, BoxGeometry, PlaneGeometry, CapsuleGeometry, MeshStandardMaterial,
  PCFSoftShadowMap, Vector3, ACESFilmicToneMapping, SRGBColorSpace,
} from 'three';

const PIT_LENGTH = 8;
const PIT_WIDTH = 2.75;
const COLORS = {
  ground: 0x00239f,
  runway: 0x0034eb,
  sand: 0xe4cfa3,
  board: 0xffffff,
  mark: 0x5fe07a,
  body: [0xffffff, 0xc5d0ff],
};

export function createPit(container, { jump, height, animate }) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.background = new Color(COLORS.ground);

  const camera = new PerspectiveCamera(32, 4 / 3, 0.1, 100);
  const target = new Vector3(3.5, 0, 0.1);

  scene.add(new HemisphereLight(0xffffff, 0x1a2a80, 1.6));
  const sun = new DirectionalLight(0xffffff, 2.4);
  sun.position.set(-3, 9, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -2, right: 10, top: 4, bottom: -4 });
  scene.add(sun);

  const material = (color, roughness = 0.9) => new MeshStandardMaterial({ color, roughness });

  const runway = new Mesh(new PlaneGeometry(6, 1.22), material(COLORS.runway));
  runway.rotation.x = -Math.PI / 2;
  runway.position.set(-3.2, 0.001, 0);
  runway.receiveShadow = true;
  scene.add(runway);

  const sand = new Mesh(new BoxGeometry(PIT_LENGTH, 0.06, PIT_WIDTH), material(COLORS.sand, 1));
  sand.position.set(PIT_LENGTH / 2 + 0.1, -0.02, 0);
  sand.receiveShadow = true;
  scene.add(sand);

  const board = new Mesh(new BoxGeometry(0.2, 0.03, 1.22), material(COLORS.board, 0.6));
  board.position.set(-0.1, 0.015, 0);
  scene.add(board);

  const mark = new Mesh(new BoxGeometry(0.05, 0.05, PIT_WIDTH + 0.3), material(COLORS.mark, 0.5));
  mark.position.set(jump, 0.03, 0);
  scene.add(mark);

  // A tick at every metre along the near edge of the pit
  for (let m = 1; m <= 7; m++) {
    const tick = new Mesh(new BoxGeometry(0.03, 0.04, 0.25), material(COLORS.board, 0.6));
    tick.position.set(m, 0.02, PIT_WIDTH / 2 - 0.12);
    scene.add(tick);
  }

  const bodies = new Group();
  scene.add(bodies);

  // DOM labels, placed by projecting their 3D anchor each frame.
  const labels = [
    { text: 'Board', at: new Vector3(-0.1, 0.05, -1.2) },
    { text: `Her mark, ${jump.toFixed(2)} m`, at: new Vector3(jump, 0.05, PIT_WIDTH / 2 + 0.25), strong: true },
  ].map((label) => {
    const el = document.createElement('span');
    el.className = `pit-label${label.strong ? ' pit-label--strong' : ''}`;
    el.textContent = label.text;
    el.setAttribute('aria-hidden', 'true');
    container.appendChild(el);
    return { ...label, el };
  });

  const geometryCache = new Map();
  let arrivals = [];

  function setHeight(h) {
    bodies.clear();
    const count = Math.ceil(jump / h);
    const radius = Math.min(0.17, h * 0.1);
    const key = h.toFixed(2);
    if (!geometryCache.has(key)) geometryCache.set(key, new CapsuleGeometry(radius, h - radius * 2, 6, 16));
    const geometry = geometryCache.get(key);
    arrivals = [];
    for (let i = 0; i < count; i++) {
      const body = new Mesh(geometry, material(COLORS.body[i % 2], 0.7));
      body.rotation.z = Math.PI / 2;
      body.castShadow = true;
      const x = 0.05 + h * i + h / 2;
      body.position.set(x, radius, (i % 2 ? 0.18 : -0.18));
      bodies.add(body);
      arrivals.push({ body, x, delay: i * 70 });
    }
    startTime = performance.now();
    if (!animate()) arrivals.forEach(({ body, x }) => body.position.setX(x));
    needsRender = true;
  }

  let startTime = 0;
  let needsRender = true;

  function resize() {
    const { clientWidth: w, clientHeight: h } = container;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull back on narrow screens so the runway, board and mark all stay in view.
    const distance = camera.aspect < 1.2 ? 11.5 : 9.2;
    camera.position.set(target.x - 0.6, distance * 0.8, distance * 0.6);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    needsRender = true;
  }

  function placeLabels() {
    const { clientWidth: w, clientHeight: h } = container;
    for (const label of labels) {
      const p = label.at.clone().project(camera);
      label.el.style.transform = `translate(${((p.x + 1) / 2) * w}px, ${((1 - p.y) / 2) * h}px) translate(-50%, 0)`;
    }
  }

  function frame(now) {
    let moving = false;
    if (animate()) {
      for (const { body, x, delay } of arrivals) {
        const t = Math.min(1, Math.max(0, (now - startTime - delay) / 600));
        const eased = 1 - (1 - t) ** 4;
        body.position.x = x - (1 - eased) * 1.2;
        body.position.y = body.geometry.parameters.radius + (1 - eased) * 0.6;
        if (t < 1) moving = true;
      }
    }
    if (moving || needsRender) {
      renderer.render(scene, camera);
      placeLabels();
      needsRender = false;
    }
  }

  new ResizeObserver(resize).observe(container);
  resize();
  setHeight(height);
  renderer.setAnimationLoop(frame);

  // Stop drawing while the pit is off screen.
  new IntersectionObserver(([entry]) => {
    renderer.setAnimationLoop(entry.isIntersecting ? frame : null);
  }).observe(container);

  return { setHeight };
}
