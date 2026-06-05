const menuButton = document.querySelector(".navbar__menu-button");
const primaryMenu = document.querySelector("#primary-menu");
const THEME_STORAGE_KEY = "uninstant-theme";
const themeButtons = document.querySelectorAll(".theme-toggle");
const systemThemeQuery = window.matchMedia?.("(prefers-color-scheme: dark)");

const readStoredTheme = () => {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStoredTheme = (theme) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures; the current page can still update.
  }
};

const getPreferredTheme = () => {
  const storedTheme = readStoredTheme();

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return systemThemeQuery?.matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  themeButtons.forEach((button) => {
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.setAttribute("aria-pressed", String(isDark));

    const icon = button.querySelector(".material-symbols-outlined");
    if (icon) {
      icon.textContent = isDark ? "light_mode" : "dark_mode";
    }
  });
};

applyTheme(getPreferredTheme());

systemThemeQuery?.addEventListener("change", (event) => {
  const storedTheme = readStoredTheme();

  if (storedTheme === "light" || storedTheme === "dark") {
    return;
  }

  applyTheme(event.matches ? "dark" : "light");
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    writeStoredTheme(nextTheme);
  });
});

const stickerGrid = document.querySelector(".stickers-grid");
const viewButtons = document.querySelectorAll(".view-toggle__button");
const filterButton = document.querySelector(".filter-button");
const filterList = document.querySelector(".filters-list");
const filterChips = document.querySelectorAll(".filter-chip");
const stickerViews = ["single", "columns", "compact"];

const stickerCategories = {
  "Le Cercle": { slug: "le-cercle", label: "Le Cercle" },
  "Le Jardin": { slug: "le-jardin", label: "Le Jardin" },
  Minuscules: { slug: "minuscules", label: "Minuscules" },
  Envolées: { slug: "envolees", label: "Envolées" },
  Compagnons: { slug: "compagnons", label: "Compagnons" },
};

/** From Structure_Maquette — Grille Prix & Dimensions.csv */
const stickerPricingByCategory = {
  "le-cercle": [
    { size: "S", label: "Size S", price: 30, dimension: "30 × 21 cm" },
    { size: "M", label: "Size M", price: 40, dimension: "60 × 50 cm" },
    { size: "L", label: "Size L", price: 45, dimension: "100 × 80 cm" },
  ],
  "le-jardin": [
    { size: "S", label: "Size S", price: 20, dimension: "30 × 21 cm" },
    { size: "M", label: "Size M", price: 30, dimension: "60 × 50 cm" },
    { size: "L", label: "Size L", price: 40, dimension: "100 × 80 cm" },
  ],
  minuscules: [
    { size: "S", label: "Size S", price: 20, dimension: "30 × 21 cm" },
    { size: "M", label: "Size M", price: 30, dimension: "60 × 50 cm" },
  ],
  envolees: [
    { size: "S", label: "Size S", price: 20, dimension: "30 × 21 cm" },
    { size: "M", label: "Size M", price: 30, dimension: "60 × 50 cm" },
  ],
  compagnons: [
    { size: "S", label: "Size S", price: 20, dimension: "30 × 21 cm" },
    { size: "M", label: "Size M", price: 30, dimension: "60 × 50 cm" },
    { size: "L", label: "Size L", price: 40, dimension: "100 × 80 cm" },
  ],
};

const formatPrice = (price) => `${price} €`;

const getStickerPricingTiers = (categorySlug) =>
  stickerPricingByCategory[categorySlug] || stickerPricingByCategory["le-jardin"];

const getStickerEntryPrice = (categorySlug) => getStickerPricingTiers(categorySlug)[0].price;

const additionalStickerFiles = {
  "Le Cercle": [
    "Alba.png",
    "Amal & Zoé.png",
    "Amara.png",
    "Aïna & Reva.png",
    "Coumba.png",
    "Eberechi.png",
    "Imany.png",
    "Inaya.png",
    "Iris.png",
    "Jax.png",
    "Kaï.png",
    "Kenzo.png",
    "Kofi & Luca.png",
    "Lani.png",
    "Lena & Safi.png",
    "Lucie.png",
    "Malik.png",
    "Manon.png",
    "Mariama.png",
    "Meï.png",
    "Mila.png",
    "Mira.png",
    "Nia & Tom.png",
    "Ryo & Yuki.png",
    "Sylia.png",
    "Theo.png",
    "Tiago.png",
    "Yara.png",
  ],
  "Le Jardin": [
    "Bou.png",
    "DAWA.png",
    "FIA.png",
    "Gül.png",
    "HANA.png",
    "KEVA.png",
    "KIBO.png",
    "LALE.png",
    "LAncienne.png",
    "LEphémère.png",
    "LEtrange.png",
    "LILA.png",
    "LUMA.png",
    "LaBrûlante.png",
    "LaDouce.png",
    "LaFière.png",
    "LaJeûne.png",
    "LaLumineuse.png",
    "LaNocturne.png",
    "LaSimple.png",
    "LaTimide.png",
    "LaVoyageuse.png",
    "LeMurmure.png",
    "MELO.png",
    "NILA.png",
    "ORA.png",
    "PETI.png",
    "SENA.png",
    "SOL.png",
    "TILI.png",
    "YUKI.png",
  ],
  Minuscules: [
    "Aura.png",
    "Bomby.png",
    "Cali.png",
    "Cocca.png",
    "Emera.png",
    "Jade.png",
    "Lazuli.png",
    "Macha.png",
    "Mona.png",
    "PAPILLIONmodif.png",
    "Pink.png",
    "Rubis.png",
    "Soli.png",
    "Spira.png",
    "Zéphir.png",
  ],
  "Envolées": [
    "Braise.png",
    "Celo.png",
    "Ivo.png",
    "Koda.png",
    "Liria.png",
    "Sialia.png",
    "Vola.png",
    "Zola.png",
  ],
  Compagnons: [
    "DUSK.png",
    "LUNO.png",
    "MISO.png",
    "NOISETTE.png",
    "OMA.png",
    "ORI.png",
    "PIKO.png",
    "SOKO.png",
    "TAO.png",
  ],
};

const getAssetPath = (folder, filename) =>
  `asset/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;

/** macOS / git can store NFD vs NFC; GitHub Pages is case-sensitive. Try variants on <img> error. */
const stickerFilenameCaseFallbacks = {
  "Coumba.png": ["coumba.png"],
};

const uniqueStickerImageUrls = (folder, filename) => {
  const folderOpts = [...new Set([folder.normalize("NFC"), folder.normalize("NFD")])];
  const fileOpts = [...new Set([filename.normalize("NFC"), filename.normalize("NFD")])];
  const urls = [];

  folderOpts.forEach((fo) => {
    fileOpts.forEach((fi) => {
      urls.push(getAssetPath(fo, fi));
    });
  });

  const extras = stickerFilenameCaseFallbacks[filename.normalize("NFC")] || [];
  extras.forEach((alt) => {
    folderOpts.forEach((fo) => {
      urls.push(getAssetPath(fo, alt));
    });
  });

  return [...new Set(urls)];
};

const setStickerImageSrcWithFallbacks = (img, folder, filename) => {
  const urls = uniqueStickerImageUrls(folder, filename);
  let index = 0;
  img.src = urls[0];

  if (urls.length <= 1) {
    return;
  }

  const onError = () => {
    index += 1;
    if (index < urls.length) {
      img.src = urls[index];
      return;
    }

    img.removeEventListener("error", onError);
  };

  img.addEventListener("error", onError);
};

const setStickerViewUrl = (view) => {
  const url = new URL(window.location.href);

  url.searchParams.set("view", view);
  window.history.replaceState(window.history.state, "", url);
};

const setStickerView = (view, activeButton, shouldUpdateUrl = false) => {
  if (!stickerGrid || !view) {
    return;
  }

  stickerGrid.classList.remove(
    "stickers-grid--single",
    "stickers-grid--columns",
    "stickers-grid--compact",
  );
  stickerGrid.classList.add(`stickers-grid--${view}`);

  viewButtons.forEach((viewButton) => {
    const isActive = viewButton === activeButton;

    viewButton.classList.toggle("is-active", isActive);
    viewButton.setAttribute("aria-pressed", String(isActive));
  });

  if (shouldUpdateUrl) {
    setStickerViewUrl(view);
  }
};

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;

    if (!view || button.classList.contains("is-active")) {
      return;
    }

    if (document.startViewTransition) {
      document.startViewTransition(() => setStickerView(view, button, true));
      return;
    }

    setStickerView(view, button, true);
  });
});

const initialStickerView = new URLSearchParams(window.location.search).get("view");

if (stickerViews.includes(initialStickerView)) {
  const initialStickerViewButton = Array.from(viewButtons).find(
    (button) => button.dataset.view === initialStickerView,
  );

  setStickerView(initialStickerView, initialStickerViewButton);
}

const getStickerCategoryFromSrc = (src) => {
  const decodedSrc = decodeURIComponent(src);
  const folder = Object.keys(stickerCategories).find((categoryFolder) =>
    decodedSrc.includes(`/asset/${categoryFolder}/`) ||
    decodedSrc.includes(`asset/${categoryFolder}/`),
  );

  return folder ? stickerCategories[folder].slug : "";
};

const normalizeStickerTitle = (filename, label, index) => {
  const name = filename.replace(/\.[^.]+$/, "");
  const readableName = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim();

  if (/^[A-Z]?\d+$/i.test(readableName)) {
    return `${label} ${String(index + 1).padStart(2, "0")}`;
  }

  // Use \p{L} so letters like ï, é count as word characters (/\b\w/ only matches ASCII \w).
  return readableName
    .toLocaleLowerCase("fr")
    .replace(/(^|[\s&-]+)(\p{L})/gu, (match, sep, letter) => sep + letter.toLocaleUpperCase("fr"));
};

const createStickerCard = ({ id, title, price, folder, filename, category }) => {
  const article = document.createElement("article");
  article.className = "sticker";

  const primarySrc = uniqueStickerImageUrls(folder, filename)[0];

  article.innerHTML = `
    <a
      class="sticker__link"
      href="#${id}"
      data-title="${title}"
      data-price="${price}"
      data-category="${category}"
      aria-label="${title}, from ${formatPrice(price)}"
    >
      <figure class="sticker__media">
        <img
          class="sticker__img"
          src="${primarySrc}"
          alt="${title} sticker"
          width="900"
          height="900"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div class="sticker__meta" id="${id}">
        <h2 class="sticker__title">${title}</h2>
        <p class="sticker__price">${formatPrice(price)}</p>
      </div>
    </a>
  `;

  const img = article.querySelector(".sticker__img");
  if (img) {
    setStickerImageSrcWithFallbacks(img, folder, filename);
  }

  return article;
};

const getMixedStickerItems = () => {
  const stickerGroups = Object.entries(additionalStickerFiles).map(([folder, files]) => ({
    folder,
    category: stickerCategories[folder],
    files,
  }));
  const maxFileCount = Math.max(...stickerGroups.map(({ files }) => files.length));
  const items = [];

  for (let fileIndex = 0; fileIndex < maxFileCount; fileIndex += 1) {
    stickerGroups.forEach(({ folder, category, files }) => {
      const filename = files[fileIndex];

      if (!filename) {
        return;
      }

      items.push({
        folder,
        filename,
        category,
        title: normalizeStickerTitle(filename, category.label, fileIndex),
      });
    });
  }

  return items;
};

const STICKERS_PER_PAGE = 18;
const stickerPagination = document.querySelector(".stickers-pagination");
const stickerPaginationStatus = document.querySelector(".stickers-pagination__status");
const stickerPaginationPrev = document.querySelector(".stickers-pagination__button--prev");
const stickerPaginationNext = document.querySelector(".stickers-pagination__button--next");
const stickerCatalogItems = getMixedStickerItems().map((item, index) => ({
  ...item,
  id: `sticker-${String(index + 1).padStart(2, "0")}`,
  price: getStickerEntryPrice(item.category.slug),
}));
let activeStickerFilter = "all";
let activeStickerPage = 1;

const getFilteredStickerItems = () =>
  stickerCatalogItems.filter(
    ({ category }) => activeStickerFilter === "all" || category.slug === activeStickerFilter,
  );

const renderStickerPage = ({ shouldScroll = false } = {}) => {
  if (!stickerGrid) {
    return;
  }

  const filteredItems = getFilteredStickerItems();
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / STICKERS_PER_PAGE));
  activeStickerPage = Math.min(Math.max(activeStickerPage, 1), pageCount);

  const start = (activeStickerPage - 1) * STICKERS_PER_PAGE;
  const pageItems = filteredItems.slice(start, start + STICKERS_PER_PAGE);

  stickerGrid.replaceChildren(
    ...pageItems.map(({ id, title, price, folder, filename, category }) =>
      createStickerCard({
        id,
        title,
        price,
        folder,
        filename,
        category: category.slug,
      }),
    ),
  );

  if (stickerPagination && stickerPaginationStatus && stickerPaginationPrev && stickerPaginationNext) {
    stickerPagination.hidden = filteredItems.length <= STICKERS_PER_PAGE;
    stickerPaginationStatus.textContent = `Page ${activeStickerPage} / ${pageCount}`;
    stickerPaginationPrev.disabled = activeStickerPage === 1;
    stickerPaginationNext.disabled = activeStickerPage === pageCount;
  }

  if (shouldScroll) {
    stickerGrid.scrollIntoView({ block: "start" });
  }
};

const renderStickerPageForHash = (hash) => {
  if (!stickerGrid || !hash.startsWith("#sticker-")) {
    return;
  }

  const stickerIndex = getFilteredStickerItems().findIndex(({ id }) => `#${id}` === hash);
  if (stickerIndex === -1) {
    return;
  }

  activeStickerPage = Math.floor(stickerIndex / STICKERS_PER_PAGE) + 1;
  renderStickerPage();
};

if (stickerGrid) {
  renderStickerPage();
}

const setStickerFilter = (filter) => {
  if (!stickerGrid || !filter) {
    return;
  }

  filterChips.forEach((chip) => {
    const isActive = chip.dataset.filter === filter;
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });

  activeStickerFilter = filter;
  activeStickerPage = 1;
  renderStickerPage({ shouldScroll: true });
};

filterButton?.addEventListener("click", () => {
  const isOpen = filterList?.classList.toggle("is-open");
  filterButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    setStickerFilter(chip.dataset.filter);
  });
});

stickerPaginationPrev?.addEventListener("click", () => {
  activeStickerPage -= 1;
  renderStickerPage({ shouldScroll: true });
});

stickerPaginationNext?.addEventListener("click", () => {
  activeStickerPage += 1;
  renderStickerPage({ shouldScroll: true });
});

const productModalOptionsMarkup = `
  <form class="product-options">
    <div class="product-options-sticker">
      <fieldset class="product-option-group" data-sticker-sizes>
        <legend>Size</legend>
      </fieldset>
    </div>

    <div class="product-options-scene" hidden>
      <fieldset class="product-option-group">
        <legend>Run length</legend>
        <label class="option-card">
          <input type="radio" name="scene-run" value="Short" data-price="0" checked />
          <span>Short</span>
          <small>Base price</small>
        </label>
        <label class="option-card">
          <input type="radio" name="scene-run" value="Standard" data-price="6" />
          <span>Standard</span>
          <small>+$6</small>
        </label>
        <label class="option-card">
          <input type="radio" name="scene-run" value="Extended" data-price="14" />
          <span>Extended</span>
          <small>+$14</small>
        </label>
      </fieldset>

      <fieldset class="product-option-group">
        <legend>Look</legend>
        <label class="option-card">
          <input type="radio" name="scene-look" value="Clean" data-price="0" checked />
          <span>Clean</span>
          <small>Included</small>
        </label>
        <label class="option-card">
          <input type="radio" name="scene-look" value="Film" data-price="5" />
          <span>Film</span>
          <small>+$5</small>
        </label>
        <label class="option-card">
          <input type="radio" name="scene-look" value="Grain" data-price="9" />
          <span>Grain</span>
          <small>+$9</small>
        </label>
      </fieldset>

      <fieldset class="product-option-group">
        <legend>License</legend>
        <label class="option-card">
          <input type="radio" name="scene-license" value="Personal" data-price="0" checked />
          <span>Personal</span>
          <small>Non-commercial</small>
        </label>
        <label class="option-card">
          <input type="radio" name="scene-license" value="Creator" data-price="18" />
          <span>Creator</span>
          <small>+$18</small>
        </label>
      </fieldset>
    </div>
  </form>
`;

const ensureProductModal = () => {
  if (document.querySelector(".product-modal")) {
    return;
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <dialog class="product-modal" aria-labelledby="product-modal-title">
        <div class="product-modal__panel">
          <button class="product-modal__close" type="button" aria-label="Close product modal">
            <span class="material-symbols-outlined notranslate" translate="no" aria-hidden="true">close</span>
          </button>

          <section class="product-modal__gallery" aria-label="Product preview">
            <button
              class="product-modal__arrow product-modal__arrow--prev"
              type="button"
              aria-label="Previous image"
            >
              <span class="material-symbols-outlined notranslate" translate="no" aria-hidden="true">chevron_left</span>
            </button>

            <img
              class="product-modal__image"
              src="asset/placeholder-sticker.svg"
              alt=""
              width="900"
              height="900"
            />

            <button
              class="product-modal__arrow product-modal__arrow--next"
              type="button"
              aria-label="Next image"
            >
              <span class="material-symbols-outlined notranslate" translate="no" aria-hidden="true">chevron_right</span>
            </button>

            <div class="product-modal__dots" aria-label="Image position">
              <button class="is-active" type="button" aria-label="Show image 1"></button>
              <button type="button" aria-label="Show image 2"></button>
              <button type="button" aria-label="Show image 3"></button>
            </div>
          </section>

          <section class="product-modal__details">
            <div class="product-modal__head">
              <div class="product-modal__sticky-title">
                <h2 class="product-modal__title" id="product-modal-title">Product</h2>
                <p class="product-modal__price product-modal__price--header" aria-live="polite">0 €</p>
              </div>
            </div>

            <div class="product-modal__sheet">
              <div class="product-modal__scroll">
                ${productModalOptionsMarkup}
              </div>

              <div class="product-modal__footer">
                <p class="product-modal__price product-modal__price--cta">0 €</p>
                <button class="button product-modal__cta" type="button">Add to cart</button>
              </div>
            </div>
          </section>
        </div>
      </dialog>
    `,
  );
};

ensureProductModal();


const productModal = document.querySelector(".product-modal");
const productModalClose = document.querySelector(".product-modal__close");
const productModalTitle = document.querySelector(".product-modal__title");
const productModalPrices = document.querySelectorAll(".product-modal__price");
const productModalImage = document.querySelector(".product-modal__image");
const productModalPrev = document.querySelector(".product-modal__arrow--prev");
const productModalNext = document.querySelector(".product-modal__arrow--next");
const productModalDotsContainer = document.querySelector(".product-modal__dots");
const productModalDots = document.querySelectorAll(".product-modal__dots button");
const productModalGallery = document.querySelector(".product-modal__gallery");
const productModalDetailsScroll = document.querySelector(".product-modal__scroll");
const productOptionsSticker = document.querySelector(".product-options-sticker");
const productOptionsScene = document.querySelector(".product-options-scene");
const productOptionsForm = document.querySelector(".product-options");

const getActiveProductOptionsRoot = () => {
  if (productOptionsSticker && productOptionsScene) {
    return productOptionsScene.hidden ? productOptionsSticker : productOptionsScene;
  }

  return productOptionsForm;
};

const getActiveProductOptionInputs = () =>
  Array.from(getActiveProductOptionsRoot()?.querySelectorAll("input[type='radio']") || []);
const stickerImageSlides = [
  "asset/placeholder-sticker.svg",
  "asset/scenes/711c49a0-31a9-4a23-935e-ecaa4d996d8a.png",
  "asset/placeholder-sticker.svg",
];
const sceneImageSlides = [
  "asset/scenes/711c49a0-31a9-4a23-935e-ecaa4d996d8a.png",
  "asset/placeholder-sticker.svg",
  "asset/scenes/711c49a0-31a9-4a23-935e-ecaa4d996d8a.png",
];
const stickerZoomSlides = [
  { scale: 1, origin: "50% 50%" },
  { scale: 2.7, origin: "30% 32%" },
  { scale: 3.15, origin: "68% 68%" },
];
let productImageSlides = stickerImageSlides;
let productBasePrice = 0;
let productImageIndex = 0;
let lastFocusedModalTrigger = null;
let modalScrollLockY = 0;
let isClosingModalFromHistory = false;

const lockBodyScroll = () => {
  if (document.body.classList.contains("modal-scroll-lock")) {
    return;
  }

  modalScrollLockY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${modalScrollLockY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.classList.add("modal-scroll-lock");
};

const unlockBodyScroll = () => {
  if (!document.body.classList.contains("modal-scroll-lock")) {
    return;
  }

  document.body.classList.remove("modal-scroll-lock");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  const root = document.documentElement;
  const prevRootBehavior = root.style.scrollBehavior;
  const prevBodyBehavior = document.body.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  window.scrollTo(0, modalScrollLockY);
  root.style.scrollBehavior = prevRootBehavior;
  document.body.style.scrollBehavior = prevBodyBehavior;
};

const setMobileMenuOpen = (isOpen) => {
  if (!menuButton || !primaryMenu) {
    return;
  }

  menuButton.setAttribute("aria-expanded", String(isOpen));
  primaryMenu.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

  const icon = menuButton.querySelector(".material-symbols-outlined");
  if (icon) {
    icon.textContent = isOpen ? "close" : "menu";
  }

  if (isOpen) {
    lockBodyScroll();
  } else if (!document.querySelector(".product-modal")?.open) {
    unlockBodyScroll();
  }
};

const closeMobileMenu = () => {
  setMobileMenuOpen(false);
};

const toggleMobileMenu = () => {
  setMobileMenuOpen(menuButton?.getAttribute("aria-expanded") !== "true");
};

menuButton?.addEventListener("click", toggleMobileMenu);

primaryMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    closeMobileMenu();
  }
});

const mobileMenuQuery = window.matchMedia?.("(min-width: 761px)");

mobileMenuQuery?.addEventListener("change", (event) => {
  if (event.matches) {
    closeMobileMenu();
  }
});

const CART_STORAGE_KEY = "uninstant-cart";
const cartButtons = document.querySelectorAll("button[aria-label='Cart']");
let cartItems = [];

document.body.insertAdjacentHTML(
  "beforeend",
  `
    <div class="cart-shell" aria-hidden="true">
      <button class="cart-backdrop" type="button" aria-label="Close cart"></button>
      <aside class="cart-drawer" aria-labelledby="cart-title" role="dialog">
        <div class="cart-drawer__header">
          <h2 class="cart-drawer__title" id="cart-title">Cart</h2>
          <button class="cart-drawer__close" type="button" aria-label="Close cart">
            <span class="material-symbols-outlined notranslate" translate="no" aria-hidden="true">close</span>
          </button>
        </div>

        <div class="cart-drawer__items" aria-live="polite"></div>

        <div class="cart-drawer__footer">
          <div class="cart-drawer__total">
            <span>Total</span>
            <strong class="cart-drawer__total-value">0 €</strong>
          </div>
          <button class="button cart-drawer__checkout" type="button">Checkout</button>
          <p class="cart-drawer__hint">Stripe checkout will connect here later.</p>
        </div>
      </aside>
    </div>
  `,
);

const cartShell = document.querySelector(".cart-shell");
const cartItemsContainer = document.querySelector(".cart-drawer__items");
const cartTotalValue = document.querySelector(".cart-drawer__total-value");
const cartCloseButtons = document.querySelectorAll(".cart-drawer__close, .cart-backdrop");

const readCart = () => {
  try {
    return JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const writeCart = () => {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

const getCartTotal = () =>
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

const updateCartButtons = () => {
  const count = getCartCount();

  cartButtons.forEach((button) => {
    let badge = button.querySelector(".cart-count");

    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cart-count";
      button.append(badge);
    }

    badge.textContent = String(count);
    badge.hidden = count === 0;
    button.setAttribute("aria-label", count === 0 ? "Cart" : `Cart, ${count} items`);
  });
};

const renderCart = () => {
  if (!cartItemsContainer || !cartTotalValue) {
    return;
  }

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `<p class="cart-drawer__empty">Your cart is empty.</p>`;
  } else {
    cartItemsContainer.innerHTML = cartItems
      .map(
        (item) => `
          <article class="cart-item">
            <div>
              <h3 class="cart-item__title">${item.title}</h3>
              <p class="cart-item__meta">${item.options || "Default configuration"}</p>
              <button class="cart-item__remove" type="button" data-cart-id="${item.id}">
                Remove
              </button>
            </div>
            <div class="cart-item__side">
              <p>${formatPrice(item.price)}</p>
              <p>× ${item.quantity}</p>
            </div>
          </article>
        `,
      )
      .join("");
  }

  cartTotalValue.textContent = formatPrice(getCartTotal());
  updateCartButtons();
};

const openCart = () => {
  cartShell?.classList.add("is-open");
  cartShell?.setAttribute("aria-hidden", "false");
};

const closeCart = () => {
  cartShell?.classList.remove("is-open");
  cartShell?.setAttribute("aria-hidden", "true");
};

const syncCart = () => {
  cartItems = readCart();
  renderCart();
};

const getSelectedProductOptions = () => {
  if (productOptionsScene && !productOptionsScene.hidden) {
    return getActiveProductOptionInputs()
      .filter((input) => input.checked)
      .map((input) => input.value)
      .join(" / ");
  }

  const sizeInput = productOptionsSticker?.querySelector('input[name="sticker-size"]:checked');
  if (!sizeInput) {
    return "";
  }

  const dimension = sizeInput.dataset.dimension || "";
  return dimension ? `Size ${sizeInput.value} · ${dimension}` : `Size ${sizeInput.value}`;
};

const addCurrentProductToCart = () => {
  if (!productModalTitle || productModalPrices.length === 0) {
    return;
  }

  const title = productModalTitle.textContent.trim();
  const price = Number(productModalPrices[0].textContent.replace(/[^0-9.]/g, ""));
  const options = getSelectedProductOptions();
  const existingItem = cartItems.find((item) => item.title === title && item.options === options);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title,
      price,
      options,
      quantity: 1,
    });
  }

  writeCart();
  renderCart();
  productModal?.close();
  openCart();
};

cartButtons.forEach((button) => {
  button.addEventListener("click", openCart);
});

cartCloseButtons.forEach((button) => {
  button.addEventListener("click", closeCart);
});

cartItemsContainer?.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-cart-id]");

  if (!removeButton) {
    return;
  }

  cartItems = cartItems.filter((item) => item.id !== removeButton.dataset.cartId);
  writeCart();
  renderCart();
});

document.querySelector(".cart-drawer__checkout")?.addEventListener("click", () => {
  alert("Stripe checkout will be connected later.");
});

document.querySelector(".product-modal__cta")?.addEventListener("click", addCurrentProductToCart);

window.addEventListener("storage", (event) => {
  if (event.key === THEME_STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
    applyTheme(event.newValue);
  }

  if (event.key === THEME_STORAGE_KEY && event.newValue !== "light" && event.newValue !== "dark") {
    applyTheme(getPreferredTheme());
  }

  if (event.key === CART_STORAGE_KEY) {
    syncCart();
  }
});

syncCart();

const renderStickerSizeOptions = (categorySlug) => {
  const fieldset = document.querySelector("[data-sticker-sizes]");
  if (!fieldset) {
    return;
  }

  const tiers = getStickerPricingTiers(categorySlug);

  fieldset.innerHTML = `
    <legend>Size</legend>
    ${tiers
      .map(
        (tier, index) => `
        <label class="option-card">
          <input
            type="radio"
            name="sticker-size"
            value="${tier.size}"
            data-price="${tier.price}"
            data-dimension="${tier.dimension}"
            ${index === 0 ? "checked" : ""}
          />
          <span>${tier.label}</span>
          <small>${tier.dimension}</small>
        </label>
      `,
      )
      .join("")}
  `;
};

const getStickerSelectedPrice = () => {
  const sizeInput = productOptionsSticker?.querySelector('input[name="sticker-size"]:checked');
  if (sizeInput) {
    return Number(sizeInput.dataset.price || 0);
  }

  return productBasePrice;
};

const updateProductPrice = () => {
  if (productModalPrices.length === 0) {
    return;
  }

  let totalPrice;

  if (productOptionsScene && !productOptionsScene.hidden) {
    const optionsPrice = getActiveProductOptionInputs().reduce((sum, input) => {
      if (!input.checked) {
        return sum;
      }

      return sum + Number(input.dataset.price || 0);
    }, 0);

    totalPrice = productBasePrice + optionsPrice;
  } else {
    totalPrice = getStickerSelectedPrice();
  }

  const text = formatPrice(totalPrice);
  productModalPrices.forEach((node) => {
    node.textContent = text;
  });
};

const setProductImage = (index) => {
  if (!productModalImage) {
    return;
  }

  productImageIndex = (index + productImageSlides.length) % productImageSlides.length;
  const slide = productImageSlides[productImageIndex];
  const src = typeof slide === "string" ? slide : slide.src;
  const scale = typeof slide === "string" ? 1 : slide.scale || 1;
  const origin = typeof slide === "string" ? "50% 50%" : slide.origin || "50% 50%";

  productModalImage.classList.add("is-changing");

  window.setTimeout(() => {
    productModalImage.src = src;
    productModalImage.style.setProperty("--product-image-scale", scale);
    productModalImage.style.setProperty("--product-image-origin", origin);
    productModalImage.classList.remove("is-changing");
  }, 120);

  productModalDots.forEach((dot, dotIndex) => {
    dot.hidden = dotIndex >= productImageSlides.length;
    dot.classList.toggle("is-active", dotIndex === productImageIndex);
  });
};

const getModalLinkFromHash = () => {
  if (!window.location.hash) {
    return null;
  }

  const currentLink = Array.from(document.querySelectorAll(".sticker__link, .scene__link")).find(
    (link) => link.getAttribute("href") === window.location.hash,
  );

  if (currentLink) {
    return currentLink;
  }

  renderStickerPageForHash(window.location.hash);

  return Array.from(document.querySelectorAll(".sticker__link, .scene__link")).find(
    (link) => link.getAttribute("href") === window.location.hash,
  );
};

const clearModalHash = () => {
  if (!getModalLinkFromHash()) {
    return;
  }

  const url = new URL(window.location.href);
  url.hash = "";
  window.history.pushState(window.history.state, "", url);
};

const openProductModal = (link, { shouldUpdateUrl = false } = {}) => {
  if (!productModal || !productModalTitle) {
    return;
  }

  lastFocusedModalTrigger = link;
  const isSceneProduct = link.classList.contains("scene__link");
  const stickerCategory =
    link.dataset.category ||
    getStickerCategoryFromSrc(link.querySelector("img")?.getAttribute("src") || "");

  productBasePrice = isSceneProduct
    ? Number(link.dataset.price || 0)
    : getStickerEntryPrice(stickerCategory);
  const linkImage = link.querySelector("img")?.getAttribute("src");
  productModalTitle.textContent =
    link.dataset.title || (isSceneProduct ? "Scene" : "Sticker");
  productImageSlides = isSceneProduct
    ? sceneImageSlides
    : stickerZoomSlides.map((slide) => ({
        ...slide,
        src: linkImage || stickerImageSlides[0],
      }));

  productModalPrev.hidden = false;
  productModalNext.hidden = false;
  productModalDotsContainer.hidden = productImageSlides.length <= 1;

  if (productModalImage) {
    productModalImage.alt = link.dataset.title ? `${link.dataset.title} preview` : "";
  }

  if (productOptionsSticker && productOptionsScene) {
    productOptionsSticker.hidden = isSceneProduct;
    productOptionsScene.hidden = !isSceneProduct;
  }

  if (!isSceneProduct) {
    renderStickerSizeOptions(stickerCategory);
  } else {
    getActiveProductOptionInputs().forEach((input) => {
      input.checked = input.defaultChecked;
    });
  }

  setProductImage(0);
  updateProductPrice();
  lockBodyScroll();

  if (productModalDetailsScroll) {
    productModalDetailsScroll.scrollTop = 0;
  }

  if (shouldUpdateUrl && link.getAttribute("href") !== window.location.hash) {
    const url = new URL(window.location.href);
    url.hash = link.getAttribute("href") || "";
    window.history.pushState(window.history.state, "", url);
  }

  if (!productModal.open) {
    productModal.showModal();
  }
};

productModal?.addEventListener("close", () => {
  unlockBodyScroll();

  if (!isClosingModalFromHistory) {
    clearModalHash();
  }

  isClosingModalFromHistory = false;
  if (lastFocusedModalTrigger && typeof lastFocusedModalTrigger.focus === "function") {
    try {
      lastFocusedModalTrigger.focus({ preventScroll: true });
    } catch {
      lastFocusedModalTrigger.focus();
    }
  }
});

productModal?.addEventListener(
  "wheel",
  (event) => {
    if (!productModal?.open || !productModalDetailsScroll) {
      return;
    }

    if (event.target instanceof Node) {
      if (event.target.closest(".product-modal__scroll")) {
        return;
      }

      if (event.target.closest(".product-modal__gallery")) {
        event.preventDefault();
        return;
      }
    }

    event.preventDefault();
    productModalDetailsScroll.scrollTop += event.deltaY;
  },
  { passive: false },
);

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const productLink = target.closest(".sticker__link, .scene__link");

  if (!productLink) {
    return;
  }

  event.preventDefault();
  openProductModal(productLink, { shouldUpdateUrl: true });
});

productOptionsForm?.addEventListener("change", (event) => {
  if (event.target.matches("input[type='radio']")) {
    updateProductPrice();
  }
});

document.querySelector("[data-sticker-sizes]")?.addEventListener("change", (event) => {
  if (event.target.matches('input[name="sticker-size"]')) {
    updateProductPrice();
  }
});

productModalPrev?.addEventListener("click", () => {
  setProductImage(productImageIndex - 1);
});

productModalNext?.addEventListener("click", () => {
  setProductImage(productImageIndex + 1);
});

productModalDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    setProductImage(index);
  });
});

const PRODUCT_MODAL_SWIPE_THRESHOLD = 42;

let gallerySwipePointerId = null;
let gallerySwipeStartX = 0;
let gallerySwipeStartY = 0;

productModalGallery?.addEventListener("pointerdown", (event) => {
  if (
    !productModal?.open ||
    productImageSlides.length <= 1 ||
    gallerySwipePointerId !== null
  ) {
    return;
  }

  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  const target = event.target;
  if (target instanceof Element && target.closest("button")) {
    return;
  }

  gallerySwipePointerId = event.pointerId;
  gallerySwipeStartX = event.clientX;
  gallerySwipeStartY = event.clientY;

  try {
    productModalGallery.setPointerCapture(event.pointerId);
  } catch {
    // ignore (e.g. unsupported)
  }
});

productModalGallery?.addEventListener("pointerup", (event) => {
  if (!productModal?.open || event.pointerId !== gallerySwipePointerId) {
    return;
  }

  gallerySwipePointerId = null;

  try {
    productModalGallery.releasePointerCapture(event.pointerId);
  } catch {
    // ignore
  }

  const dx = event.clientX - gallerySwipeStartX;
  const dy = event.clientY - gallerySwipeStartY;

  if (Math.abs(dx) < PRODUCT_MODAL_SWIPE_THRESHOLD) {
    return;
  }

  if (Math.abs(dx) <= Math.abs(dy)) {
    return;
  }

  if (dx > 0) {
    setProductImage(productImageIndex - 1);
  } else {
    setProductImage(productImageIndex + 1);
  }
});

productModalGallery?.addEventListener("pointercancel", (event) => {
  if (event.pointerId === gallerySwipePointerId) {
    gallerySwipePointerId = null;
  }
});

const closeProductModal = () => {
  productModal?.close();
};

productModalClose?.addEventListener("click", closeProductModal);

productModal?.addEventListener("click", (event) => {
  if (event.target === productModal) {
    closeProductModal();
  }
});

const openProductModalFromHash = () => {
  const modalLink = getModalLinkFromHash();

  if (!modalLink) {
    return false;
  }

  openProductModal(modalLink);
  return true;
};

openProductModalFromHash();

window.addEventListener("popstate", () => {
  if (openProductModalFromHash()) {
    return;
  }

  if (productModal?.open) {
    isClosingModalFromHistory = true;
    productModal.close();
  }
});

document.querySelectorAll("a[href]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target ||
      link.hasAttribute("download")
    ) {
      return;
    }

    const url = new URL(link.href, window.location.href);
    const isSamePage =
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search;

    if (url.origin !== window.location.origin || isSamePage) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("page-leaving");

    window.setTimeout(() => {
      window.location.href = url.href;
    }, 220);
  });
});
