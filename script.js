const track = document.querySelector('[data-gallery-track]');
const scrollSpace = document.querySelector('[data-scroll-space]');
const viewCursor = document.querySelector('[data-view-cursor]');
const projectCaption = document.querySelector('[data-project-caption]');
const projectName = document.querySelector('[data-project-name]');
const projectPrice = document.querySelector('[data-project-price]');
const viewLabel = document.querySelector('[data-view-label]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const THEME_STORAGE_KEY = 'atelier-theme';

let hoveredCard = null;
let lastScrollActivity = 0;

const getCurrentTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

const randomPageColor = (theme) => {
  const hue = Math.floor(Math.random() * 360);

  if (theme === 'dark') {
    const saturation = 22 + Math.random() * 28;
    const lightness = 2 + Math.random() * 5;
    return `hsl(${hue} ${saturation.toFixed(1)}% ${lightness.toFixed(1)}%)`;
  }

  const saturation = 62 + Math.random() * 26;
  const lightness = 82 + Math.random() * 7;
  return `hsl(${hue} ${saturation.toFixed(1)}% ${lightness.toFixed(1)}%)`;
};

const applyRandomPageBackground = (theme = getCurrentTheme()) => {
  document.documentElement.style.setProperty('--page-bg', randomPageColor(theme));
};

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  themeToggle?.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
  applyRandomPageBackground(theme);
};

applyRandomPageBackground(getCurrentTheme());

themeToggle?.addEventListener('click', () => {
  setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
});

const setupCardHover = () => {
  if (!track || !viewCursor) return;

  const cards = track.querySelectorAll('.project-card');
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const updateCardDetails = (card) => {
    const name = card.dataset.name || 'Name';
    const price = card.dataset.price || 'Price';

    if (projectName) projectName.textContent = name;
    if (projectPrice) projectPrice.textContent = price;
    if (viewLabel) viewLabel.textContent = `View ${name}`;
    viewCursor?.setAttribute('aria-label', `View ${name}`);
  };

  const showCursor = (card) => {
    hoveredCard = card;
    updateCardDetails(card);
    card.classList.add('is-hovered');
    viewCursor.hidden = false;
    viewCursor.classList.add('is-visible');
    projectCaption?.classList.add('is-visible');
    projectCaption?.setAttribute('aria-hidden', 'false');
  };

  const hideCursor = (card) => {
    if (hoveredCard !== card) return;

    hoveredCard = null;
    card.classList.remove('is-hovered');
    viewCursor.classList.remove('is-visible');
    viewCursor.hidden = true;
    projectCaption?.classList.remove('is-visible');
    projectCaption?.setAttribute('aria-hidden', 'true');
  };

  cards.forEach((card) => {
    card.addEventListener('mouseenter', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      currentX = targetX;
      currentY = targetY;
      showCursor(card);
    });
    card.addEventListener('mouseleave', () => hideCursor(card));
    card.addEventListener('mousemove', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    });
  });

  const followCursor = () => {
    if (hoveredCard) {
      const ease = reduceMotion.matches ? 1 : 0.18;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      viewCursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(followCursor);
  };

  requestAnimationFrame(followCursor);
};

if (track && !reduceMotion.matches) {
  const originalItems = Array.from(track.children);

  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  setupCardHover();

  let x = 0;
  let width = 1;
  let lastScrollY = window.scrollY;
  let scrollBoost = 0;
  let lastTime = performance.now();
  let isRepositioning = false;

  const scrollLoopHeight = scrollSpace?.offsetHeight || 14000;
  const scrollCenter = scrollLoopHeight / 2;
  const scrollEdge = Math.min(1800, scrollLoopHeight * 0.18);

  const measure = () => {
    width = track.scrollWidth / 2;
  };

  const jumpToScroll = (y) => {
    isRepositioning = true;
    window.scrollTo(0, y);
    lastScrollY = y;

    requestAnimationFrame(() => {
      lastScrollY = window.scrollY;
      isRepositioning = false;
    });
  };

  const keepScrollInfinite = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (window.scrollY < scrollEdge) {
      jumpToScroll(window.scrollY + scrollCenter);
    }

    if (window.scrollY > maxScroll - scrollEdge) {
      jumpToScroll(window.scrollY - scrollCenter);
    }
  };

  const wrap = (value) => {
    if (value > 0) return value - width;
    if (value < -width) return value + width;
    return value;
  };

  const animate = (time) => {
    const deltaTime = Math.min(32, time - lastTime);
    lastTime = time;

    keepScrollInfinite();

    const currentScrollY = window.scrollY;
    const scrollDelta = isRepositioning ? 0 : currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    if (scrollDelta !== 0) {
      lastScrollActivity = time;
    }

    const isHovering = hoveredCard !== null;
    const isScrolling = time - lastScrollActivity < 120;
    const shouldPauseGallery = isHovering && !isScrolling;

    if (!shouldPauseGallery) {
      scrollBoost += scrollDelta * 0.055;
      scrollBoost *= 0.91;

      const idleSpeed = isHovering ? 0 : 0.018 * deltaTime;
      x = wrap(x + idleSpeed + scrollBoost);
    } else {
      scrollBoost *= 0.88;
    }

    track.style.transform = `translate3d(${x}px, 0, 0)`;
    requestAnimationFrame(animate);
  };

  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);

  measure();
  jumpToScroll(scrollCenter);
  requestAnimationFrame(animate);
} else if (track) {
  setupCardHover();
}
