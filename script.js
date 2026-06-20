const track = document.querySelector('[data-gallery-track]');
const scrollSpace = document.querySelector('[data-scroll-space]');
const pointerDot = document.querySelector('[data-pointer-dot]');
const viewCursor = document.querySelector('[data-view-cursor]');
const pageLoader = document.querySelector('[data-page-loader]');
const loaderBar = document.querySelector('[data-loader-bar]');
const loaderPercent = document.querySelector('[data-loader-percent]');
const projectCaption = document.querySelector('[data-project-caption]');
const projectName = document.querySelector('[data-project-name]');
const projectPrice = document.querySelector('[data-project-price]');
const viewLabel = document.querySelector('[data-view-label]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const siteNav = document.querySelector('.site-nav');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const navCloseTriggers = document.querySelectorAll('[data-nav-close]');
const mobileNavQuery = window.matchMedia('(max-width: 760px)');
const projectModal = document.querySelector('[data-project-modal]');
const modalClose = document.querySelector('[data-modal-close]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalDescription = document.querySelector('[data-modal-description]');
const modalPrice = document.querySelector('[data-modal-price]');
const modalImage = document.querySelector('[data-modal-image]');
const modalThumbs = document.querySelector('[data-modal-thumbs]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const touchUiQuery = window.matchMedia('(hover: none), (max-width: 760px)');
const customCursorQuery = window.matchMedia(
  '(hover: hover) and (pointer: fine) and (min-width: 761px)'
);

const THEME_STORAGE_KEY = 'atelier-theme';

let hoveredCard = null;
let lastScrollActivity = 0;
let pointerDotReady = false;

const isTouchUI = () => touchUiQuery.matches;
const supportsCustomCursor = () => customCursorQuery.matches;

const getCurrentTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  themeToggle?.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
  window.Sky?.setTheme(theme);
};

window.Sky?.init(getCurrentTheme());

themeToggle?.addEventListener('click', () => {
  setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
});

const setNavMenuOpen = (open) => {
  if (!siteNav || !navToggle || !navMenu) {
    return;
  }

  siteNav.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('is-nav-open', open);

  if (mobileNavQuery.matches) {
    navMenu.toggleAttribute('hidden', !open);
  } else {
    navMenu.removeAttribute('hidden');
  }
};

const closeNavMenu = () => setNavMenuOpen(false);

const syncNavMenuMode = () => {
  if (!navMenu) {
    return;
  }

  if (!mobileNavQuery.matches) {
    closeNavMenu();
    navMenu.removeAttribute('hidden');
    return;
  }

  navMenu.toggleAttribute('hidden', !siteNav?.classList.contains('is-open'));
};

navToggle?.addEventListener('click', () => {
  setNavMenuOpen(!siteNav?.classList.contains('is-open'));
});

navCloseTriggers.forEach((trigger) => {
  trigger.addEventListener('click', closeNavMenu);
});

navMenu?.querySelectorAll('.site-nav__links a').forEach((link) => {
  link.addEventListener('click', closeNavMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeNavMenu();
  }
});

mobileNavQuery.addEventListener('change', syncNavMenuMode);
syncNavMenuMode();

const loadInitialImages = () => {
  if (!pageLoader || !track || !loaderBar || !loaderPercent) {
    document.body.classList.remove('is-loading');
    window.Sky?.setLoadingMotion('idle');
    return;
  }

  window.Sky?.setLoadingMotion('loading');

  const images = Array.from(track.querySelectorAll('img'));
  const total = images.length;
  let loaded = 0;
  let currentProgress = 0;
  let targetProgress = total === 0 ? 100 : 0;
  let isComplete = total === 0;

  const setProgressTarget = () => {
    targetProgress = total === 0 ? 100 : Math.round((loaded / total) * 100);
    isComplete = loaded >= total;
  };

  const showPage = () => {
    document.body.classList.remove('is-loading');
  };

  const hideLoader = () => {
    pageLoader.classList.add('is-hidden');
  };

  const finishLoading = () => {
    window.Sky?.setLoadingMotion('winding');
    pageLoader.classList.add('is-parting');
    window.Sky?.playCloudReveal(2200, () => {
      hideLoader();
      window.setTimeout(() => {
        window.Sky?.setLoadingMotion('idle');
        showPage();
      }, 120);
    });
  };

  const renderProgress = () => {
    currentProgress += (targetProgress - currentProgress) * 0.16;

    if (isComplete && currentProgress > 99.5) {
      currentProgress = 100;
    }

    const visibleProgress = Math.round(currentProgress);
    loaderPercent.textContent = String(visibleProgress);
    loaderBar.style.width = `${visibleProgress}%`;
    window.Sky?.setLoaderProgress(visibleProgress);

    if (visibleProgress < 100) {
      requestAnimationFrame(renderProgress);
      return;
    }

    window.setTimeout(finishLoading, 300);
  };

  const markLoaded = () => {
    loaded += 1;
    setProgressTarget();
  };

  images.forEach((image) => {
    if (image.complete) {
      markLoaded();
      return;
    }

    image.addEventListener('load', markLoaded, { once: true });
    image.addEventListener('error', markLoaded, { once: true });
  });

  setProgressTarget();
  requestAnimationFrame(renderProgress);
};

const setPointerDotPosition = (x, y) => {
  pointerDot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
};

const setupPointerDot = () => {
  if (!pointerDot || !supportsCustomCursor() || pointerDotReady) return;

  pointerDotReady = true;
  document.documentElement.classList.add('has-custom-cursor');

  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;
  let isActive = false;

  const moveDot = (x, y) => {
    targetX = x;
    targetY = y;

    if (!isActive) {
      currentX = x;
      currentY = y;
      isActive = true;
      setPointerDotPosition(currentX, currentY);
      pointerDot.classList.add('is-visible');
    }
  };

  const hideDot = () => {
    isActive = false;
    pointerDot.classList.remove('is-visible', 'is-link-hover');
  };

  const trackPointer = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    moveDot(event.clientX, event.clientY);
  };

  document.addEventListener('mousemove', trackPointer, { passive: true });
  document.addEventListener('pointermove', trackPointer, { passive: true });

  document.documentElement.addEventListener('mouseleave', hideDot);

  document.querySelectorAll('a, button').forEach((element) => {
    if (element.closest('.project-card') || element.matches('[data-view-cursor]')) {
      return;
    }

    element.addEventListener('mouseenter', () => {
      if (hoveredCard) return;
      pointerDot.classList.add('is-link-hover');
    });
    element.addEventListener('mouseleave', () => {
      pointerDot.classList.remove('is-link-hover');
    });
  });

  const followDot = () => {
    if (isActive) {
      const ease = reduceMotion.matches ? 1 : 0.2;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      setPointerDotPosition(currentX, currentY);
    }

    requestAnimationFrame(followDot);
  };

  requestAnimationFrame(followDot);
};

const syncPointerDot = () => {
  if (!pointerDot) return;

  if (supportsCustomCursor()) {
    setupPointerDot();
    return;
  }

  document.documentElement.classList.remove('has-custom-cursor');
  pointerDot.classList.remove('is-visible', 'is-link-hover');
};

const bindMediaQueryChange = (query, handler) => {
  if (query.addEventListener) {
    query.addEventListener('change', handler);
    return;
  }

  query.addListener?.(handler);
};

syncPointerDot();
bindMediaQueryChange(customCursorQuery, syncPointerDot);
window.addEventListener('load', syncPointerDot, { once: true });

const setupCardHover = () => {
  if (!track || isTouchUI()) return;

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

  const showCardHover = (card) => {
    hoveredCard = card;
    updateCardDetails(card);
    card.classList.add('is-hovered');
    pointerDot?.classList.remove('is-visible', 'is-link-hover');
    if (viewCursor) {
      viewCursor.hidden = false;
      viewCursor.classList.add('is-visible');
    }
    projectCaption?.classList.add('is-visible');
    projectCaption?.setAttribute('aria-hidden', 'false');
  };

  const hideCardHover = (card) => {
    if (hoveredCard !== card) return;

    hoveredCard = null;
    card.classList.remove('is-hovered');
    viewCursor?.classList.remove('is-visible');
    if (viewCursor) viewCursor.hidden = true;
    if (pointerDotReady) {
      pointerDot?.classList.add('is-visible');
    }
    projectCaption?.classList.remove('is-visible');
    projectCaption?.setAttribute('aria-hidden', 'true');
  };

  cards.forEach((card) => {
    card.addEventListener('mouseenter', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      currentX = targetX;
      currentY = targetY;
      showCardHover(card);
    });
    card.addEventListener('mouseleave', () => hideCardHover(card));
    card.addEventListener('mousemove', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    });
  });

  const followViewCursor = () => {
    if (hoveredCard && viewCursor) {
      const ease = reduceMotion.matches ? 1 : 0.18;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      viewCursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(followViewCursor);
  };

  if (viewCursor) {
    requestAnimationFrame(followViewCursor);
  }
};

const setupProjectModal = (items) => {
  if (!track || !projectModal || !modalImage || !modalThumbs) return;

  const projects = items.map((item, index) => {
    const image = item.querySelector('img');

    return {
      index,
      name: item.dataset.name || image?.alt || 'Untitled',
      price: item.dataset.price || 'Price',
      format: item.dataset.format || '',
      description: item.dataset.description || '',
      src: image?.getAttribute('src') || '',
      alt: image?.alt || item.dataset.name || 'Artwork',
    };
  });

  let activeIndex = 0;

  const setActiveSize = (button) => {
    projectModal
      .querySelectorAll('.project-modal__sizes button')
      .forEach((sizeButton) => sizeButton.classList.toggle('is-active', sizeButton === button));
  };

  const renderModal = (index) => {
    const project = projects[index];
    if (!project) return;

    activeIndex = index;

    if (modalTitle) modalTitle.textContent = project.name;
    if (modalPrice) modalPrice.textContent = project.price;
    if (modalDescription) {
      const details = [project.format, project.description].filter(Boolean).join(' — ');
      modalDescription.textContent = details || 'Chapter 1 — Forever Young';
    }

    modalImage.src = project.src;
    modalImage.alt = project.alt;

    modalThumbs.querySelectorAll('button').forEach((button, thumbIndex) => {
      button.classList.toggle('is-active', thumbIndex === index);
      button.setAttribute('aria-current', thumbIndex === index ? 'true' : 'false');
    });
  };

  const openModal = (index) => {
    renderModal(index);
    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    projectModal.scrollTo({ top: 0, behavior: 'auto' });
    document.body.classList.add('modal-open');
    hoveredCard = null;
    track.querySelectorAll('.project-card.is-hovered').forEach((card) => {
      card.classList.remove('is-hovered');
    });
    viewCursor?.classList.remove('is-visible');
    if (viewCursor) viewCursor.hidden = true;
    if (pointerDotReady) {
      pointerDot?.classList.add('is-visible');
    }
    projectCaption?.classList.remove('is-visible');
    projectCaption?.setAttribute('aria-hidden', 'true');
  };

  const closeModal = () => {
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  modalThumbs.innerHTML = '';
  projects.forEach((project, index) => {
    const button = document.createElement('button');
    const image = document.createElement('img');

    button.type = 'button';
    button.setAttribute('aria-label', `View ${project.name}`);
    button.addEventListener('click', () => renderModal(index));

    image.src = project.src;
    image.alt = '';
    image.loading = 'lazy';

    button.appendChild(image);
    modalThumbs.appendChild(button);
  });

  track.querySelectorAll('.project-card').forEach((card) => {
    card.tabIndex = 0;
    card.addEventListener('click', () => {
      const index = Number(card.dataset.index || 0);
      openModal(index);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      const index = Number(card.dataset.index || 0);
      openModal(index);
    });
  });

  projectModal.querySelectorAll('.project-modal__sizes button').forEach((button) => {
    button.addEventListener('click', () => setActiveSize(button));
  });

  modalClose?.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) closeModal();
  });

  window.addEventListener('keydown', (event) => {
    if (!projectModal.classList.contains('is-open')) return;

    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowRight') renderModal((activeIndex + 1) % projects.length);
    if (event.key === 'ArrowLeft') {
      renderModal((activeIndex - 1 + projects.length) % projects.length);
    }
  });
};

if (track && !reduceMotion.matches) {
  const originalItems = Array.from(track.children);
  const scrollLoopHeight = scrollSpace?.offsetHeight || 14000;
  const scrollCenter = scrollLoopHeight / 2;
  const scrollEdge = Math.min(1800, scrollLoopHeight * 0.18);

  window.scrollTo(0, scrollCenter);

  loadInitialImages();

  originalItems.forEach((item, index) => {
    item.dataset.index = String(index);
  });

  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  setupCardHover();
  setupProjectModal(originalItems);

  let x = 0;
  let width = 1;
  let lastScrollY = window.scrollY;
  let scrollBoost = 0;
  let lastTime = performance.now();
  let isRepositioning = false;

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

    const isHovering = !isTouchUI() && hoveredCard !== null;
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

    if (scrollDelta !== 0) {
      window.Sky?.setScrollDelta(scrollDelta);
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
  const originalItems = Array.from(track.children);
  originalItems.forEach((item, index) => {
    item.dataset.index = String(index);
  });
  loadInitialImages();
  setupCardHover();
  setupProjectModal(originalItems);
}
