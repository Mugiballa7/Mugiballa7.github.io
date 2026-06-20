(() => {
  const canvas = document.querySelector('[data-sky-canvas]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!canvas) return;

  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false });

  const vertexShaderSource = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

  const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iScroll;
uniform float iCloudPart;
uniform float iIsDark;
uniform vec3 uSkyTop;
uniform vec3 uSkyBottom;
uniform vec3 uCloudSky;
uniform vec3 uCloudWhite;

out vec4 fragColor;

vec4 permute(vec4 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise3(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = inversesqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm3(vec2 uv, float t) {
  float total = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 6; i++) {
    vec3 p = vec3(uv * frequency, t * 0.03);
    total += snoise3(p) * amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return total * 0.5 + 0.5;
}

float starField(vec2 uv, float t) {
  vec2 scaled = uv * vec2(140.0, 96.0);
  vec2 cell = floor(scaled);
  vec2 local = fract(scaled) - 0.5;
  float n = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);

  if (n > 0.994) {
    float twinkle = 0.45 + 0.55 * sin(t * 1.6 + n * 18.0);
    return smoothstep(0.14, 0.0, length(local)) * twinkle;
  }

  return 0.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float part = clamp(iCloudPart, 0.0, 1.0);
  float clear = part * part * (3.0 - 2.0 * part);

  vec3 sky = mix(uSkyBottom, uSkyTop, pow(uv.y, 0.92));

  vec2 cloudUv = uv * 2.0 - 1.0;
  cloudUv.x *= iResolution.x / iResolution.y;
  cloudUv.x += iTime * 0.02 + iScroll;
  cloudUv.y += iTime * 0.006 + (1.0 - clear) * 0.06;

  float noise = fbm3(cloudUv * 1.35, iTime);
  float mistNoise = fbm3(cloudUv * 1.15 + vec2(iTime * 0.008, 0.0), iTime * 0.85);
  float cloud = smoothstep(0.34, 0.7, noise);
  float cloudWisp = smoothstep(0.4, 0.58, noise);
  float mist = smoothstep(mix(0.14, 0.32, clear), mix(0.42, 0.6, clear), mistNoise);

  vec3 cloudColor = mix(uCloudSky, uCloudWhite, cloud);
  vec3 mistColor = mix(sky, uCloudWhite, 0.88);
  float cloudMix = iIsDark > 0.5 ? 0.4 : 0.58;
  float mistAmount = mist * mix(0.92, 0.0, clear);

  vec3 cloudLayer = mix(sky, cloudColor, cloud * 0.82 + cloudWisp * 0.18);
  vec3 col = mix(sky, cloudLayer, cloudMix);
  col = mix(col, mistColor, mistAmount);

  if (iIsDark > 0.5) {
    col += vec3(starField(uv + vec2(iTime * 0.004, 0.0), iTime)) * clear;
  }

  fragColor = vec4(col, 1.0);
}`;

  const lightBiomes = [
    { name: 'Forever Blue', top: '#7ec8ff', bottom: '#dff3ff', page: '#c8e8ff', cloudSky: '#8fb5dc' },
    { name: 'Coral Dawn', top: '#8ec5ff', bottom: '#ffd9c7', page: '#ffe8dc', cloudSky: '#9eb8d8' },
    { name: 'Lavender Drift', top: '#9eb9ff', bottom: '#f0e6ff', page: '#e8ddff', cloudSky: '#a8b4e0' },
    { name: 'Golden Hour', top: '#74b7ff', bottom: '#ffe7b0', page: '#fff0c8', cloudSky: '#8eb0d8' },
    { name: 'Mint Sky', top: '#7fd0e8', bottom: '#e7fff7', page: '#d4f7ee', cloudSky: '#8ec8dc' },
  ];

  const darkBiomes = [
    { name: 'Midnight Garden', top: '#070b1f', bottom: '#1a2348', page: '#10162e', cloudSky: '#1a2848' },
    { name: 'Starlit Violet', top: '#0a0818', bottom: '#2a1f4f', page: '#151028', cloudSky: '#221a42' },
    { name: 'Deep Ocean', top: '#030b16', bottom: '#12314f', page: '#0a1c30', cloudSky: '#102840' },
  ];

  let theme = 'light';
  let biome = null;
  let scrollOffset = 0;
  let scrollVelocity = 0;
  let cloudPart = 0;
  let partFrame = null;
  let motionSpeed = 1;
  let targetMotionSpeed = 1;
  let idleDriftRate = 0;
  let targetIdleDriftRate = 0;
  let lastFrame = 0;
  let animationId = null;
  let program = null;
  let uniforms = null;
  let width = 0;
  let height = 0;

  const hexToRgb = (hex) => {
    const value = hex.replace('#', '');
    return [
      parseInt(value.slice(0, 2), 16) / 255,
      parseInt(value.slice(2, 4), 16) / 255,
      parseInt(value.slice(4, 6), 16) / 255,
    ];
  };

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  };

  const createProgram = () => {
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return null;

    const nextProgram = gl.createProgram();
    gl.attachShader(nextProgram, vertexShader);
    gl.attachShader(nextProgram, fragmentShader);
    gl.linkProgram(nextProgram);

    if (!gl.getProgramParameter(nextProgram, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(nextProgram));
      return null;
    }

    return nextProgram;
  };

  const setupGeometry = () => {
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
  };

  const pickBiome = (nextTheme) => {
    const pool = nextTheme === 'dark' ? darkBiomes : lightBiomes;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const applyPageColor = () => {
    document.documentElement.style.setProperty('--page-bg', biome.page);
  };

  const drawSky = (now = 0) => {
    if (!program || !biome) return;

    const seconds = reduceMotion.matches ? 0 : now * 0.00028 * motionSpeed;

    gl.useProgram(program);
    gl.uniform1f(uniforms.iTime, seconds);
    gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.iScroll, scrollOffset);
    gl.uniform1f(uniforms.iCloudPart, cloudPart);
    gl.uniform1f(uniforms.iIsDark, theme === 'dark' ? 1 : 0);
    gl.uniform3fv(uniforms.uSkyTop, hexToRgb(biome.top));
    gl.uniform3fv(uniforms.uSkyBottom, hexToRgb(biome.bottom));
    gl.uniform3fv(uniforms.uCloudSky, hexToRgb(biome.cloudSky));
    gl.uniform3fv(uniforms.uCloudWhite, theme === 'dark' ? [0.72, 0.76, 0.9] : [1, 1, 1]);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  const animate = (now) => {
    const delta = lastFrame ? Math.min(32, now - lastFrame) : 16;
    lastFrame = now;

    motionSpeed += (targetMotionSpeed - motionSpeed) * 0.035;
    idleDriftRate += (targetIdleDriftRate - idleDriftRate) * 0.035;

    scrollVelocity *= 0.975;
    scrollOffset += scrollVelocity + idleDriftRate * delta;
    drawSky(now);
    animationId = requestAnimationFrame(animate);
  };

  const setTheme = (nextTheme) => {
    theme = nextTheme;
    biome = pickBiome(theme);
    applyPageColor();
    drawSky(performance.now());
  };

  const initWebGL = () => {
    if (!gl) return false;

    program = createProgram();
    if (!program) return false;

    gl.useProgram(program);
    setupGeometry();

    uniforms = {
      iTime: gl.getUniformLocation(program, 'iTime'),
      iResolution: gl.getUniformLocation(program, 'iResolution'),
      iScroll: gl.getUniformLocation(program, 'iScroll'),
      iCloudPart: gl.getUniformLocation(program, 'iCloudPart'),
      iIsDark: gl.getUniformLocation(program, 'iIsDark'),
      uSkyTop: gl.getUniformLocation(program, 'uSkyTop'),
      uSkyBottom: gl.getUniformLocation(program, 'uSkyBottom'),
      uCloudSky: gl.getUniformLocation(program, 'uCloudSky'),
      uCloudWhite: gl.getUniformLocation(program, 'uCloudWhite'),
    };

    return true;
  };

  const setCloudPart = (value) => {
    cloudPart = Math.max(0, Math.min(1, value));
  };

  const playCloudReveal = (duration = 2200, onComplete) => {
    if (partFrame) {
      cancelAnimationFrame(partFrame);
      partFrame = null;
    }

    if (reduceMotion.matches) {
      setCloudPart(1);
      onComplete?.();
      return;
    }

    const startPart = cloudPart;
    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress * progress * (3 - 2 * progress);
      setCloudPart(startPart + (1 - startPart) * eased);

      if (progress < 1) {
        partFrame = requestAnimationFrame(step);
        return;
      }

      setCloudPart(1);
      partFrame = null;
      onComplete?.();
    };

    partFrame = requestAnimationFrame(step);
  };

  window.Sky = {
    init(initialTheme = 'light') {
      if (!initWebGL()) {
        console.warn('WebGL2 unavailable — sky disabled.');
        return;
      }

      resize();
      setCloudPart(0);
      setTheme(initialTheme);

      if (!reduceMotion.matches) {
        animationId = requestAnimationFrame(animate);
      }

      window.addEventListener('resize', () => {
        resize();
        drawSky(performance.now());
      });
    },

    setTheme(nextTheme) {
      setTheme(nextTheme);
    },

    setScrollDelta(delta) {
      scrollVelocity += delta * 0.000018;
    },

    setLoaderProgress(progress) {
      setCloudPart((progress / 100) * 0.62);
    },

    playCloudReveal(duration, onComplete) {
      playCloudReveal(duration, onComplete);
    },

    setLoadingMotion(mode = 'idle') {
      if (mode === 'loading') {
        targetMotionSpeed = 2.4;
        targetIdleDriftRate = 0.0002;
        return;
      }

      if (mode === 'winding') {
        targetMotionSpeed = 1.5;
        targetIdleDriftRate = 0.00007;
        return;
      }

      targetMotionSpeed = 1;
      targetIdleDriftRate = 0;
    },
  };
})();
