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

  vec3 sky = mix(uSkyBottom, uSkyTop, pow(uv.y, 0.78));
  sky = mix(sky, mix(uSkyBottom, uSkyTop, 0.42), exp(-pow((uv.y - 0.18) * 4.2, 2.0)) * 0.18);

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
    { name: 'Rosé Morning', top: '#ff8fa8', bottom: '#fff0e8', page: '#ffe4dc', cloudSky: '#e8a0b0' },
    { name: 'Verdant Glow', top: '#4ec99a', bottom: '#f0ffd8', page: '#dff5c8', cloudSky: '#88c8a0' },
    { name: 'Apricot Sky', top: '#ff9a5c', bottom: '#fff4d6', page: '#ffecc4', cloudSky: '#e8b880' },
    { name: 'Iris Light', top: '#8b6cff', bottom: '#f0e8ff', page: '#e4d8ff', cloudSky: '#b0a0e0' },
    { name: 'Desert Bloom', top: '#d4886a', bottom: '#faf0d4', page: '#f5e6c8', cloudSky: '#c8a890' },
    { name: 'Glacier', top: '#3ab8d8', bottom: '#e8f8ff', page: '#d0eef8', cloudSky: '#80c8dc' },
    { name: 'Honeydew Mist', top: '#c8d86a', bottom: '#f8fff0', page: '#eef8d8', cloudSky: '#b0c888' },
    { name: 'Blush Horizon', top: '#f07898', bottom: '#ffe8f0', page: '#ffdce8', cloudSky: '#e8a0b8' },
  ];

  const darkBiomes = [
    { name: 'Bordeaux Night', top: '#2a0f1a', bottom: '#6a2848', page: '#3a1828', cloudSky: '#4a2038' },
    { name: 'Aurora Deep', top: '#0a2838', bottom: '#1a5848', page: '#143028', cloudSky: '#1a4048' },
    { name: 'Molten Copper', top: '#1a1008', bottom: '#4a3020', page: '#2a1c14', cloudSky: '#3a2820' },
    { name: 'Velvet Plum', top: '#1a1028', bottom: '#3a2858', page: '#281838', cloudSky: '#302048' },
    { name: 'Petrol Haze', top: '#081828', bottom: '#183858', page: '#102838', cloudSky: '#143040' },
    { name: 'Moss & Ember', top: '#141a10', bottom: '#2a3818', page: '#1c2414', cloudSky: '#243020' },
    { name: 'Wine & Smoke', top: '#280818', bottom: '#4a1838', page: '#341024', cloudSky: '#401830' },
    { name: 'Slate Aurora', top: '#101828', bottom: '#284858', page: '#1c3040', cloudSky: '#243848' },
  ];

  const themeUi = {
    light: {
      cloudWhite: [1, 1, 1],
      text: '#111111',
      muted: '#969696',
      navActive: '#111111',
      backBg: '#050505',
      backFg: '#ffffff',
    },
    dark: {
      cloudWhite: [0.72, 0.76, 0.9],
      text: '#f2f0ec',
      muted: '#8f8d88',
      navActive: '#ffffff',
      backBg: '#f2f0ec',
      backFg: '#111111',
    },
  };

  let theme = 'light';
  let biome = null;
  let displayColors = null;
  let targetColors = null;
  let themeShiftUntil = 0;
  let skyTime = 0;
  let skyMotionSpeed = 0;
  let loadingMotionMode = 'idle';
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

  const rgbToHex = (rgb) =>
    `#${rgb
      .map((channel) =>
        Math.round(Math.max(0, Math.min(1, channel)) * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .join('')}`;

  const lerp = (from, to, amount) => from + (to - from) * amount;

  const lerpRgb = (from, to, amount) => from.map((channel, index) => lerp(channel, to[index], amount));

  const buildThemeColors = (nextTheme, nextBiome) => {
    const ui = themeUi[nextTheme];

    return {
      top: hexToRgb(nextBiome.top),
      bottom: hexToRgb(nextBiome.bottom),
      cloudSky: hexToRgb(nextBiome.cloudSky),
      cloudWhite: [...ui.cloudWhite],
      page: hexToRgb(nextBiome.page),
      isDark: nextTheme === 'dark' ? 1 : 0,
      text: hexToRgb(ui.text),
      muted: hexToRgb(ui.muted),
      navActive: hexToRgb(ui.navActive),
      backBg: hexToRgb(ui.backBg),
      backFg: hexToRgb(ui.backFg),
    };
  };

  const cloneColors = (colors) => ({
    top: [...colors.top],
    bottom: [...colors.bottom],
    cloudSky: [...colors.cloudSky],
    cloudWhite: [...colors.cloudWhite],
    page: [...colors.page],
    isDark: colors.isDark,
    text: [...colors.text],
    muted: [...colors.muted],
    navActive: [...colors.navActive],
    backBg: [...colors.backBg],
    backFg: [...colors.backFg],
  });

  const colorsAreClose = (from, to) =>
    Math.abs(from.isDark - to.isDark) < 0.002 &&
    ['top', 'bottom', 'cloudSky', 'cloudWhite', 'page', 'text', 'muted', 'navActive', 'backBg', 'backFg']
      .every((key) => {
        if (key === 'isDark') return true;
        return from[key].every((channel, index) => Math.abs(channel - to[key][index]) < 0.002);
      });

  const stepThemeColors = (amount) => {
    if (!displayColors || !targetColors) return;

    displayColors = {
      top: lerpRgb(displayColors.top, targetColors.top, amount),
      bottom: lerpRgb(displayColors.bottom, targetColors.bottom, amount),
      cloudSky: lerpRgb(displayColors.cloudSky, targetColors.cloudSky, amount),
      cloudWhite: lerpRgb(displayColors.cloudWhite, targetColors.cloudWhite, amount),
      page: lerpRgb(displayColors.page, targetColors.page, amount),
      isDark: lerp(displayColors.isDark, targetColors.isDark, amount),
      text: lerpRgb(displayColors.text, targetColors.text, amount),
      muted: lerpRgb(displayColors.muted, targetColors.muted, amount),
      navActive: lerpRgb(displayColors.navActive, targetColors.navActive, amount),
      backBg: lerpRgb(displayColors.backBg, targetColors.backBg, amount),
      backFg: lerpRgb(displayColors.backFg, targetColors.backFg, amount),
    };

    if (colorsAreClose(displayColors, targetColors)) {
      displayColors = cloneColors(targetColors);
    }
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

  const applyThemeColors = () => {
    if (!displayColors) return;

    const root = document.documentElement.style;
    root.setProperty('--page-bg', rgbToHex(displayColors.page));
    root.setProperty('--text', rgbToHex(displayColors.text));
    root.setProperty('--muted', rgbToHex(displayColors.muted));
    root.setProperty('--nav-active', rgbToHex(displayColors.navActive));
    root.setProperty('--back-bg', rgbToHex(displayColors.backBg));
    root.setProperty('--back-fg', rgbToHex(displayColors.backFg));
  };

  const getSkyMotionTarget = () => {
    if (loadingMotionMode === 'loading') return 2;
    if (loadingMotionMode === 'winding') return 1.25;
    return 0;
  };

  const drawSky = (now = 0) => {
    if (!program || !displayColors) return;

    gl.useProgram(program);
    gl.uniform1f(uniforms.iTime, reduceMotion.matches ? 0 : skyTime);
    gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.iScroll, scrollOffset);
    gl.uniform1f(uniforms.iCloudPart, cloudPart);
    gl.uniform1f(uniforms.iIsDark, displayColors.isDark);
    gl.uniform3fv(uniforms.uSkyTop, displayColors.top);
    gl.uniform3fv(uniforms.uSkyBottom, displayColors.bottom);
    gl.uniform3fv(uniforms.uCloudSky, displayColors.cloudSky);
    gl.uniform3fv(uniforms.uCloudWhite, displayColors.cloudWhite);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  const animate = (now) => {
    const delta = lastFrame ? Math.min(32, now - lastFrame) : 16;
    lastFrame = now;

    const motionTarget = getSkyMotionTarget();
    const motionEase = motionTarget > skyMotionSpeed ? 0.05 : 0.013;
    skyMotionSpeed += (motionTarget - skyMotionSpeed) * motionEase;

    motionSpeed += (targetMotionSpeed - motionSpeed) * 0.035;
    idleDriftRate += (targetIdleDriftRate - idleDriftRate) * 0.035;

    if (!reduceMotion.matches && skyMotionSpeed > 0.0005) {
      skyTime += delta * 0.000032 * motionSpeed * skyMotionSpeed;
    }

    if (!reduceMotion.matches && displayColors && targetColors) {
      const transitionAmount = themeShiftUntil > now ? 0.02 : 0.035;
      stepThemeColors(transitionAmount);
      applyThemeColors();
    }

    scrollVelocity *= 0.975;
    scrollOffset += scrollVelocity + idleDriftRate * delta;
    drawSky(now);
    animationId = requestAnimationFrame(animate);
  };

  const setTheme = (nextTheme) => {
    theme = nextTheme;
    biome = pickBiome(theme);
    targetColors = buildThemeColors(theme, biome);

    if (!displayColors || reduceMotion.matches) {
      displayColors = cloneColors(targetColors);
      applyThemeColors();
      drawSky(performance.now());
      return;
    }

    themeShiftUntil = performance.now() + 4200;
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
      loadingMotionMode = mode;

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
