const ATELIER_CHILDREN_PRICE = 89;
const ATELIER_FLOWER_PRICE = 79;
const ATELIER_PACK_STANDALONE_PRICE = 39;
const ATELIER_ADDON_PRICE = 29;
const ATELIER_FREE_SHIPPING_THRESHOLD = 150;
const MODAL_ASSET = "asset/modal_asset";

const atelierModalImages = {
  Amara: `${MODAL_ASSET}/Amara.png`,
  Lucie: `${MODAL_ASSET}/Lucie.png`,
  Malik: `${MODAL_ASSET}/Malik.png`,
  Mariama: `${MODAL_ASSET}/Mariama.png`,
  Tiago: `${MODAL_ASSET}/Tiago.png`,
  Mila: `${MODAL_ASSET}/Mila.png`,
  Bou: `${MODAL_ASSET}/Bou.png`,
  LaFière: `${MODAL_ASSET}/Lafiere.png`,
  Nila: `${MODAL_ASSET}/Nila.png`,
  Sol: `${MODAL_ASSET}/Sol.png`,
  Yuki: `${MODAL_ASSET}/Yuki.png`,
  "Cali & Macha": `${MODAL_ASSET}/Machaet.png`,
  "Pink et Jade": `${MODAL_ASSET}/PinketRubis.png`,
  "Lazuli & Mona": `${MODAL_ASSET}/Lazuli%26Mona.png`,
  "Habitants du Jardin": `${MODAL_ASSET}/3%20insectes.png`,
};

const shippingOptions = [
  {
    id: "relais",
    name: "Mondial Relay",
    price: 4.5,
    note: "Livraison sous 3 à 5 jours ouvrés en point relais.",
  },
  {
    id: "domicile",
    name: "Colissimo",
    price: 6.9,
    note: "Livraison à domicile avec suivi sous 48h-72h.",
  },
];

const atelierAddons = [
  {
    id: "macha-cali",
    label: "Macha & Cali",
    price: ATELIER_ADDON_PRICE,
    standalonePrice: ATELIER_PACK_STANDALONE_PRICE,
    images: ["asset/thumb/CaliandMacha.jpg"],
    details:
      "Macha : Swallowtail (Asie du Sud-Est) · Cali : Morpho (Amérique centrale & Sud)",
  },
  {
    id: "pink-jade",
    label: "Pink & Jade",
    price: ATELIER_ADDON_PRICE,
    standalonePrice: ATELIER_PACK_STANDALONE_PRICE,
    images: ["asset/thumb/JadeandPink.jpg"],
    details: "Pink : Cattleheartia (Amazonie) · Jade : Papilio palinurus (Asie du Sud-Est)",
  },
  {
    id: "mona-lazuli",
    label: "Mona & Lazuli",
    price: ATELIER_ADDON_PRICE,
    standalonePrice: ATELIER_PACK_STANDALONE_PRICE,
    images: ["asset/thumb/LazuliandMona.jpg"],
    details:
      "Mona : Danaus plexippus (Amérique du Nord) · Lazuli : Morpho didius (Amérique centrale & Sud)",
  },
  {
    id: "habitants-jardin",
    label: "Les habitants du jardin",
    price: ATELIER_ADDON_PRICE,
    standalonePrice: ATELIER_PACK_STANDALONE_PRICE,
    images: ["asset/thumb/Habitants%20du%20jardin.jpg"],
    details:
      "Rubis : Coccinella septempunctata (Europe) · Emera : Chrysomelidae (Europe, Turquie) · Spira : Cornu aspersum (Bassin méditerranéen)",
  },
];

const atelierCatalog = {
  Amara: {
    id: "ENF-001",
    type: "enfant",
    price: ATELIER_CHILDREN_PRICE,
    quote:
      "J'avance, je sais pas trop où, mais j'ai l'impression que c'est exactement là qu'il faut aller.",
    addonIds: ["pink-jade", "habitants-jardin"],
    specs: ["100cm", "Fabriqué en France", "Finition premium"],
  },
  Lucie: {
    id: "ENF-004",
    type: "enfant",
    price: ATELIER_CHILDREN_PRICE,
    quote: "Quand on est trop heureuse, on se cache un peu",
    addonIds: ["pink-jade", "habitants-jardin"],
    specs: ["100cm", "Fabriqué en France", "Finition premium"],
  },
  Malik: {
    id: "ENF-005",
    type: "enfant",
    price: ATELIER_CHILDREN_PRICE,
    quote: "Une bulle dans l'air, le soleil dans le dos. Ça suffit.",
    addonIds: ["pink-jade", "habitants-jardin"],
    specs: ["100cm", "Fabriqué en France", "Finition premium"],
  },
  Mariama: {
    id: "ENF-006",
    type: "enfant",
    price: ATELIER_CHILDREN_PRICE,
    quote:
      "Attendez, bougez plus ! Non en fait bougez, c'est plus joli en mouvement.",
    addonIds: ["pink-jade", "habitants-jardin"],
    specs: ["100cm", "Fabriqué en France", "Finition premium"],
  },
  Tiago: {
    id: "ENF-003",
    type: "enfant",
    price: ATELIER_CHILDREN_PRICE,
    quote: "Ouais c'est moi le patron ici. Enfin… jusqu'à la sieste",
    addonIds: ["pink-jade", "habitants-jardin"],
    specs: ["100cm", "Fabriqué en France", "Finition premium"],
  },
  Mila: {
    id: "ENF-002",
    type: "enfant",
    price: ATELIER_CHILDREN_PRICE,
    quote: "Tout le monde peut voler. Faut juste pas regarder en bas",
    addonIds: ["pink-jade", "habitants-jardin"],
    specs: ["100cm", "Fabriqué en France", "Finition premium"],
  },
  Bou: {
    type: "fleur",
    price: ATELIER_FLOWER_PRICE,
    quote: "Je m'ouvre lentement, comme un secret qu'on partage.",
    addonIds: ["macha-cali", "pink-jade", "mona-lazuli", "habitants-jardin"],
    specs: ["Fabriqué en France", "Finition premium"],
  },
  LaFière: {
    id: "FLR-001",
    type: "fleur",
    price: ATELIER_FLOWER_PRICE,
    quote: "Je tiens ma place avec grâce, sans jamais crier.",
    botanical:
      "Echinacea · Osteospermum · Dahlia (Amérique du Nord, Afrique, Mexique)",
    addonIds: ["macha-cali", "pink-jade", "mona-lazuli", "habitants-jardin"],
    specs: ["Fabriqué en France", "Finition premium"],
  },
  Nila: {
    id: "FLR-003",
    type: "fleur",
    price: ATELIER_FLOWER_PRICE,
    quote: "Je brille doucement, entre ciel et eau.",
    botanical: "Aquilegia / Ancolie (Europe, Asie et Amérique du Nord)",
    addonIds: ["macha-cali", "pink-jade", "mona-lazuli", "habitants-jardin"],
    specs: ["Fabriqué en France", "Finition premium"],
  },
  Sol: {
    type: "fleur",
    price: ATELIER_FLOWER_PRICE,
    quote: "Je pousse là où l'instant me trouve.",
    addonIds: ["macha-cali", "pink-jade", "mona-lazuli", "habitants-jardin"],
    specs: ["Fabriqué en France", "Finition premium"],
  },
  Yuki: {
    id: "FLR-002",
    type: "fleur",
    price: ATELIER_FLOWER_PRICE,
    quote: "Je garde une trace verte de mon passage.",
    botanical: "Aquilegia / Ancolie double (Europe centrale et occidentale)",
    addonIds: ["macha-cali", "pink-jade", "mona-lazuli", "habitants-jardin"],
    specs: ["Fabriqué en France", "Finition premium"],
  },
  "Cali & Macha": {
    type: "pack",
    price: ATELIER_PACK_STANDALONE_PRICE,
    quote: "Nous volons ensemble, légers comme un souffle.",
    addonIds: [],
    specs: ["20 cm", "Fabriqué en France", "Finition premium"],
  },
  "Pink et Jade": {
    type: "pack",
    price: ATELIER_PACK_STANDALONE_PRICE,
    quote: "Deux ailes, deux couleurs, un même élan.",
    addonIds: [],
    specs: ["20 cm", "Fabriqué en France", "Finition premium"],
  },
  "Lazuli & Mona": {
    type: "pack",
    price: ATELIER_PACK_STANDALONE_PRICE,
    quote: "Nous dansons au rythme de l'été.",
    addonIds: [],
    specs: ["20 cm", "Fabriqué en France", "Finition premium"],
  },
  "Habitants du Jardin": {
    type: "pack",
    price: ATELIER_PACK_STANDALONE_PRICE,
    quote: "Petits compagnons d'un monde tout doux.",
    addonIds: [],
    specs: ["20 cm", "Fabriqué en France", "Finition premium"],
  },
};

let activeAtelierAddons = new Set();
let lastAtelierTrigger = null;
let currentProduct = null;

const formatAtelierPrice = (price) =>
  Number.isInteger(price) ? `${price}€` : `${price.toFixed(2).replace(".", ",")}€`;

const getShippingCost = (cartTotal, selectedId) => {
  if (cartTotal >= ATELIER_FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  const option = shippingOptions.find((entry) => entry.id === selectedId);
  return option ? option.price : 0;
};

const getProductFromCard = (card) => {
  const title = card.querySelector("h2")?.textContent.trim() || "Uninstant";
  const image = card.querySelector("img");
  const catalogEntry = atelierCatalog[title] || {
    type: "enfant",
    price: ATELIER_CHILDREN_PRICE,
    quote: "Un instant doux, prêt à rejoindre votre intérieur.",
    addonIds: ["pink-jade", "habitants-jardin"],
    specs: ["100cm", "Fabriqué en France", "Finition premium"],
  };

  return {
    title,
    imageSrc: image?.getAttribute("src") || "",
    modalImageSrc: atelierModalImages[title] || image?.getAttribute("src") || "",
    imageAlt: image?.getAttribute("alt") || title,
    ...catalogEntry,
  };
};

const modalMarkup = `
  <dialog class="atelier-modal" aria-labelledby="atelier-modal-title">
    <div class="atelier-modal__panel">
      <button class="atelier-modal__close" type="button" aria-label="Fermer">
        <span aria-hidden="true">×</span>
      </button>

      <section class="atelier-modal__visual" aria-label="Aperçu">
        <img class="atelier-modal__image" src="" alt="" decoding="async" />
      </section>

      <section class="atelier-modal__details">
        <h2 class="atelier-modal__title" id="atelier-modal-title">AMARA</h2>
        <p class="atelier-modal__quote"></p>
        <p class="atelier-modal__botanical"></p>
        <p class="atelier-modal__price">89€</p>

        <div class="atelier-modal__addons">
          <p class="atelier-modal__addons-title">compléter ma scène</p>
          <div class="atelier-modal__addon-grid" aria-label="Options à ajouter"></div>
          <div class="atelier-modal__addon-lines" aria-live="polite"></div>
        </div>

        <dl class="atelier-modal__specs" aria-label="Caractéristiques"></dl>

        <button class="atelier-modal__cart" type="button">ajouter au panier</button>
        <p class="atelier-modal__total" aria-live="polite">Total : 89€</p>
      </section>
    </div>
  </dialog>
`;

document.body.insertAdjacentHTML("beforeend", modalMarkup);

const atelierModal = document.querySelector(".atelier-modal");
const atelierModalClose = document.querySelector(".atelier-modal__close");
const atelierModalImage = document.querySelector(".atelier-modal__image");
const atelierModalTitle = document.querySelector(".atelier-modal__title");
const atelierModalQuote = document.querySelector(".atelier-modal__quote");
const atelierModalBotanical = document.querySelector(".atelier-modal__botanical");
const atelierModalPrice = document.querySelector(".atelier-modal__price");
const atelierModalAddons = document.querySelector(".atelier-modal__addons");
const atelierModalAddonGrid = document.querySelector(".atelier-modal__addon-grid");
const atelierModalAddonLines = document.querySelector(".atelier-modal__addon-lines");
const atelierModalSpecs = document.querySelector(".atelier-modal__specs");
const atelierModalTotal = document.querySelector(".atelier-modal__total");

const renderAtelierSpecs = (specs) => {
  const specIcons = {
    "100cm": "↕",
    "20 cm": "↕",
    "Fabriqué en France": "flag",
    "Finition premium": "◆",
  };

  atelierModalSpecs.innerHTML = specs
    .map((spec) => {
      if (spec === "Fabriqué en France") {
        return `
          <div>
            <dt><span class="atelier-modal__flag" aria-hidden="true"></span></dt>
            <dd>${spec}</dd>
          </div>
        `;
      }

      const icon = specIcons[spec] || "check";
      const iconClass = spec === "Finition premium" ? "atelier-modal__diamond" : "atelier-modal__icon";

      return `
        <div>
          <dt><span class="${iconClass}" aria-hidden="true">${icon}</span></dt>
          <dd>${spec}</dd>
        </div>
      `;
    })
    .join("");
};

const getAvailableAddons = () => {
  if (!currentProduct?.addonIds?.length) {
    return [];
  }

  return atelierAddons.filter((addon) => currentProduct.addonIds.includes(addon.id));
};

const renderAtelierAddonButtons = () => {
  const availableAddons = getAvailableAddons();

  atelierModalAddons.hidden = availableAddons.length === 0;
  atelierModalAddonGrid.innerHTML = availableAddons
    .map(
      (addon) => `
        <button
          class="atelier-addon"
          type="button"
          data-addon-id="${addon.id}"
          aria-pressed="${activeAtelierAddons.has(addon.id)}"
          aria-label="Ajouter ${addon.label}"
          title="${addon.details}"
        >
          <span class="atelier-addon__images">
            ${addon.images.map((src) => `<img src="${src}" alt="" loading="lazy" decoding="async" />`).join("")}
          </span>
        </button>
      `,
    )
    .join("");
};

const updateAtelierTotal = () => {
  if (!currentProduct) {
    return;
  }

  const selectedAddons = getAvailableAddons().filter((addon) => activeAtelierAddons.has(addon.id));
  const total = selectedAddons.reduce((sum, addon) => sum + addon.price, currentProduct.price);

  atelierModalPrice.textContent = formatAtelierPrice(currentProduct.price);
  atelierModalTotal.textContent = `Total : ${formatAtelierPrice(total)}`;
  atelierModalAddonLines.innerHTML = selectedAddons
    .map((addon) => `<p>${addon.label} : + ${formatAtelierPrice(addon.price)}</p>`)
    .join("");
};

const lockPageScroll = () => {
  document.documentElement.classList.add("atelier-modal-open");
  document.body.classList.add("atelier-modal-open");
};

const unlockPageScroll = () => {
  document.documentElement.classList.remove("atelier-modal-open");
  document.body.classList.remove("atelier-modal-open");
};

const openAtelierModal = (card) => {
  currentProduct = getProductFromCard(card);
  activeAtelierAddons = new Set();
  lastAtelierTrigger = card;

  atelierModalImage.src = currentProduct.modalImageSrc;
  atelierModalImage.alt = currentProduct.imageAlt;
  atelierModalTitle.textContent = currentProduct.title.toLocaleUpperCase("fr");
  atelierModalQuote.textContent = `"${currentProduct.quote}"`;
  atelierModalBotanical.textContent = currentProduct.botanical || "";
  atelierModalBotanical.hidden = !currentProduct.botanical;

  renderAtelierSpecs(currentProduct.specs);
  renderAtelierAddonButtons();
  updateAtelierTotal();
  lockPageScroll();
  atelierModal.showModal();
};

document.querySelectorAll(".atelier-card").forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Voir ${card.querySelector("h2")?.textContent.trim() || "ce produit"}`);

  card.addEventListener("click", () => openAtelierModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openAtelierModal(card);
  });
});

atelierModalAddonGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const button = target.closest("[data-addon-id]");
  if (!button) {
    return;
  }

  const addonId = button.dataset.addonId;
  if (activeAtelierAddons.has(addonId)) {
    activeAtelierAddons.delete(addonId);
  } else {
    activeAtelierAddons.add(addonId);
  }

  button.classList.toggle("is-selected", activeAtelierAddons.has(addonId));
  button.setAttribute("aria-pressed", String(activeAtelierAddons.has(addonId)));
  updateAtelierTotal();
});

atelierModalClose.addEventListener("click", () => {
  atelierModal.close();
});

atelierModal.addEventListener("click", (event) => {
  if (event.target === atelierModal) {
    atelierModal.close();
  }
});

atelierModal.addEventListener("close", () => {
  unlockPageScroll();
  lastAtelierTrigger?.focus();
});

document.querySelector(".atelier-modal__cart").addEventListener("click", () => {
  atelierModal.close();
});
