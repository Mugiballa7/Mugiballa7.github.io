const menuButton = document.querySelector(".navbar__menu-button");
const primaryMenu = document.querySelector("#primary-menu");
const THEME_STORAGE_KEY = "uninstant-theme";
const themeButtons = document.querySelectorAll(".theme-toggle");

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

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!isOpen));
  primaryMenu?.classList.toggle("is-open", !isOpen);
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
  Animaux: { slug: "animals", label: "Animals" },
  Enfants: { slug: "childs", label: "Childs" },
  Fleurs: { slug: "flowers", label: "Flowers" },
  Insectes: { slug: "insect", label: "Insect" },
  Oiseaux: { slug: "birds", label: "Birds" },
  Plants: { slug: "plants", label: "Plants" },
};

const additionalStickerFiles = {
  Animaux: [
    "A1.png",
    "A2.png",
    "A3.png",
    "A4.png",
    "A5.png",
    "A6.png",
    "A7.png",
    "A9.png",
    "A10.png",
    "A11.png",
  ],
  Fleurs: [
    "A31.png",
    "A32.png",
    "A33.png",
    "A34.png",
    "A35.png",
    "A36.png",
    "A37.png",
    "A38.png",
    "A39.png",
    "A40.png",
    "A41.png",
    "A42.png",
    "A43.png",
    "A44.png",
    "A45.png",
    "A46.png",
    "A47.png",
    "A48.png",
    "A49.png",
    "A50.png",
    "A51.png",
    "A52.png",
    "A53.png",
    "A54.png",
    "A55.png",
    "A56.png",
    "A57.png",
    "A58.png",
    "A59.png",
    "A60.png",
    "A61.png",
    "A62.png",
  ],
  Insectes: [
    "A8.png",
    "A20.png",
    "A21.png",
    "A22.png",
    "A23.png",
    "A24.png",
    "A25.png",
    "A26.png",
    "A27.png",
    "A28.png",
    "A29.png",
    "A30.png",
    "Cocinelle.png",
    "Cocinelle2.png",
    "PAPILLIONmodif.png",
  ],
  Oiseaux: [
    "A12.png",
    "A13.png",
    "A14.png",
    "A15.png",
    "A16.png",
    "A17.png",
    "A18.png",
    "A19.png",
  ],
  Plants: [
    "F1.png",
    "F2.png",
    "F3.png",
    "F4.png",
    "F5.png",
    "F6.png",
    "F7.png",
    "F8.png",
    "F9.png",
    "F10.png",
    "F11.png",
    "F12.png",
    "F13.png",
    "F14.png",
    "F15.png",
    "F16.png",
    "F17.png",
    "F18.png",
    "F19.png",
    "F20.png",
    "F21.png",
    "F22.png",
    "F23.png",
    "F24.png",
    "F25.png",
    "F26.png",
    "F27.png",
    "F28.png",
    "F29.png",
    "F30.png",
    "F31.png",
    "F32.png",
    "F33.png",
    "F34.png",
    "F35.png",
    "F36.png",
    "F37.png",
    "F38.png",
    "F39.png",
    "F40.png",
  ],
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
  const folder = Object.keys(stickerCategories).find((categoryFolder) =>
    src.includes(`/asset/${categoryFolder}/`) || src.includes(`asset/${categoryFolder}/`),
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

  return readableName
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const createStickerCard = ({ id, title, price, src, category }) => {
  const article = document.createElement("article");
  article.className = "sticker";

  article.innerHTML = `
    <a
      class="sticker__link"
      href="#${id}"
      data-title="${title}"
      data-price="${price}"
      data-category="${category}"
      aria-label="${title}, $${price}"
    >
      <figure class="sticker__media">
        <img
          class="sticker__img"
          src="${src}"
          alt="${title} sticker"
          width="900"
          height="900"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div class="sticker__meta" id="${id}">
        <h2 class="sticker__title">${title}</h2>
        <p class="sticker__price">$${price}</p>
      </div>
    </a>
  `;

  return article;
};

if (stickerGrid) {
  let stickerIndex = stickerGrid.querySelectorAll(".sticker").length;

  Object.entries(additionalStickerFiles).forEach(([folder, files]) => {
    const category = stickerCategories[folder];

    files.forEach((filename, index) => {
      stickerIndex += 1;
      const title = normalizeStickerTitle(filename, category.label, index);

      stickerGrid.append(
        createStickerCard({
          id: `sticker-${String(stickerIndex).padStart(2, "0")}`,
          title,
          price: 8,
          src: `asset/${folder}/${filename}`,
          category: category.slug,
        }),
      );
    });
  });

  stickerGrid.querySelectorAll(".sticker__link").forEach((link) => {
    if (!link.dataset.category) {
      const imageSrc = link.querySelector("img")?.getAttribute("src") || "";
      link.dataset.category = getStickerCategoryFromSrc(imageSrc);
    }
  });
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

  stickerGrid.querySelectorAll(".sticker").forEach((sticker) => {
    const category = sticker.querySelector(".sticker__link")?.dataset.category;
    sticker.hidden = filter !== "all" && category !== filter;
  });
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

const productModal = document.querySelector(".product-modal");
const productModalClose = document.querySelector(".product-modal__close");
const productModalTitle = document.querySelector(".product-modal__title");
const productModalPrices = document.querySelectorAll(".product-modal__price");
const productModalImage = document.querySelector(".product-modal__image");
const productModalPrev = document.querySelector(".product-modal__arrow--prev");
const productModalNext = document.querySelector(".product-modal__arrow--next");
const productModalDotsContainer = document.querySelector(".product-modal__dots");
const productModalDots = document.querySelectorAll(".product-modal__dots button");
const productModalDetailsScroll = document.querySelector(".product-modal__scroll");
const productOptionInputs = document.querySelectorAll(".product-options input[type='radio']");
const stickerImageSlides = [
  "asset/placeholder-sticker.svg",
  "asset/placeholder-scene.svg",
  "asset/placeholder-sticker.svg",
];
const sceneImageSlides = [
  "asset/placeholder-scene.svg",
  "asset/placeholder-sticker.svg",
  "asset/placeholder-scene.svg",
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

const formatPrice = (price) => `$${price}`;

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
            <span class="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        <div class="cart-drawer__items" aria-live="polite"></div>

        <div class="cart-drawer__footer">
          <div class="cart-drawer__total">
            <span>Total</span>
            <strong class="cart-drawer__total-value">$0</strong>
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

const getSelectedProductOptions = () =>
  Array.from(productOptionInputs)
    .filter((input) => input.checked)
    .map((input) => input.value)
    .join(" / ");

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

  if (event.key === CART_STORAGE_KEY) {
    syncCart();
  }
});

syncCart();

const updateProductPrice = () => {
  if (productModalPrices.length === 0) {
    return;
  }

  const optionsPrice = Array.from(productOptionInputs).reduce((total, input) => {
    if (!input.checked) {
      return total;
    }

    return total + Number(input.dataset.price || 0);
  }, 0);

  const text = formatPrice(productBasePrice + optionsPrice);
  productModalPrices.forEach((node) => {
    node.textContent = text;
  });
};

const setProductImage = (index) => {
  if (!productModalImage) {
    return;
  }

  productImageIndex = (index + productImageSlides.length) % productImageSlides.length;
  productModalImage.classList.add("is-changing");

  window.setTimeout(() => {
    productModalImage.src = productImageSlides[productImageIndex];
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
  productBasePrice = Number(link.dataset.price || 0);
  const isSceneProduct = link.classList.contains("scene__link");
  const linkImage = link.querySelector("img")?.getAttribute("src");
  productModalTitle.textContent =
    link.dataset.title || (isSceneProduct ? "Scene" : "Sticker");
  productImageSlides = isSceneProduct ? sceneImageSlides : [linkImage || stickerImageSlides[0]];

  const hasMultipleImages = productImageSlides.length > 1;
  productModalPrev.hidden = !hasMultipleImages;
  productModalNext.hidden = !hasMultipleImages;
  productModalDotsContainer.hidden = !hasMultipleImages;

  if (productModalImage) {
    productModalImage.alt = link.dataset.title ? `${link.dataset.title} preview` : "";
  }

  productOptionInputs.forEach((input) => {
    input.checked = input.defaultChecked;
  });

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

document.querySelectorAll(".sticker__link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openProductModal(link, { shouldUpdateUrl: true });
  });
});

document.querySelectorAll(".scene__link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openProductModal(link, { shouldUpdateUrl: true });
  });
});

productOptionInputs.forEach((input) => {
  input.addEventListener("change", updateProductPrice);
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
