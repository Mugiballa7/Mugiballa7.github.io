const ATELIER_BASE_PRICE = 89;
const ATELIER_ADDON_PRICE = 29;

const atelierQuotes = {
  Amara: "\"J'avance, je sais pas trop où, mais j'ai l'impression que c'est exactement là qu'il faut aller.\"",
  Lucie: "\"Je garde les fleurs comme une promesse minuscule.\"",
  Malik: "\"Je reste debout, même quand le vent essaie de me faire vaciller.\"",
  Mariama: "\"Je transporte un souvenir plus grand que moi.\"",
  Tiago: "\"Je marche droit, même quand le rêve déborde.\"",
  Mila: "\"Je regarde le monde doucement, pour ne pas l'effrayer.\"",
  Bou: "\"Je m'ouvre lentement, comme un secret qu'on partage.\"",
  LaFière: "\"Je tiens ma place avec grâce, sans jamais crier.\"",
  Nila: "\"Je brille doucement, entre ciel et eau.\"",
  Sol: "\"Je pousse là où l'instant me trouve.\"",
  Yuki: "\"Je garde une trace verte de mon passage.\"",
  "Cali & Macha": "\"Nous volons ensemble, légers comme un souffle.\"",
  "Pink et Jade": "\"Deux ailes, deux couleurs, un même élan.\"",
  "Lazuli & Mona": "\"Nous dansons au rythme de l'été.\"",
  "Habitants du Jardin": "\"Petits compagnons d'un monde tout doux.\"",
};

const atelierAddons = [
  {
    id: "pink-jade",
    label: "Pink & Jade",
    price: ATELIER_ADDON_PRICE,
    images: ["asset/JadeandPink.jpg"],
  },
  {
    id: "cali-macha",
    label: "Cali & Macha",
    price: ATELIER_ADDON_PRICE,
    images: ["asset/CaliandMacha.jpg"],
  },
  {
    id: "lazuli-mona",
    label: "Lazuli & Mona",
    price: ATELIER_ADDON_PRICE,
    images: ["asset/LazuliandMona.jpg"],
  },
  {
    id: "habitants-jardin",
    label: "les habitants du jardin",
    price: ATELIER_ADDON_PRICE,
    images: ["asset/Habitants%20du%20jardin.jpg"],
  },
];

let activeAtelierAddons = new Set();
let lastAtelierTrigger = null;

const formatAtelierPrice = (price) => `${price}€`;

const getAtelierCardData = (card) => {
  const title = card.querySelector("h2")?.textContent.trim() || "Uninstant";
  const image = card.querySelector("img");

  return {
    title,
    imageSrc: image?.getAttribute("src") || "",
    imageAlt: image?.getAttribute("alt") || title,
    quote: atelierQuotes[title] || "\"Un instant doux, prêt à rejoindre votre intérieur.\"",
  };
};

const modalMarkup = `
  <dialog class="atelier-modal" aria-labelledby="atelier-modal-title">
    <div class="atelier-modal__panel">
      <button class="atelier-modal__close" type="button" aria-label="Fermer">
        <span class="material-symbols-outlined" aria-hidden="true">close</span>
      </button>

      <section class="atelier-modal__visual" aria-label="Aperçu">
        <img class="atelier-modal__image" src="" alt="" />
      </section>

      <section class="atelier-modal__details">
        <h2 class="atelier-modal__title" id="atelier-modal-title">AMARA</h2>
        <p class="atelier-modal__quote"></p>
        <p class="atelier-modal__price">89€</p>

        <div class="atelier-modal__addons">
          <p class="atelier-modal__addons-title">compléter ma scène</p>
          <div class="atelier-modal__addon-grid" aria-label="Options à ajouter"></div>
          <div class="atelier-modal__addon-lines" aria-live="polite"></div>
        </div>

        <dl class="atelier-modal__specs">
          <div>
            <dt>
              <span class="material-symbols-outlined" aria-hidden="true">straighten</span>
            </dt>
            <dd>100cm</dd>
          </div>
          <div>
            <dt><span class="atelier-modal__flag" aria-hidden="true"></span></dt>
            <dd>Fabriqué en France</dd>
          </div>
          <div>
            <dt>
              <span class="material-symbols-outlined atelier-modal__diamond" aria-hidden="true">diamond</span>
            </dt>
            <dd>Finition premium</dd>
          </div>
        </dl>

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
const atelierModalPrice = document.querySelector(".atelier-modal__price");
const atelierModalAddonGrid = document.querySelector(".atelier-modal__addon-grid");
const atelierModalAddonLines = document.querySelector(".atelier-modal__addon-lines");
const atelierModalTotal = document.querySelector(".atelier-modal__total");
const atelierModalCart = document.querySelector(".atelier-modal__cart");

const renderAtelierAddonButtons = () => {
  atelierModalAddonGrid.innerHTML = atelierAddons
    .map(
      (addon) => `
        <button
          class="atelier-addon"
          type="button"
          data-addon-id="${addon.id}"
          aria-pressed="${activeAtelierAddons.has(addon.id)}"
          aria-label="Ajouter ${addon.label}"
        >
          <span class="atelier-addon__images">
            ${addon.images.map((src) => `<img src="${src}" alt="" />`).join("")}
          </span>
        </button>
      `,
    )
    .join("");
};

const updateAtelierTotal = () => {
  const selectedAddons = atelierAddons.filter((addon) => activeAtelierAddons.has(addon.id));
  const total = selectedAddons.reduce((sum, addon) => sum + addon.price, ATELIER_BASE_PRICE);

  atelierModalPrice.textContent = formatAtelierPrice(ATELIER_BASE_PRICE);
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
  const { title, imageSrc, imageAlt, quote } = getAtelierCardData(card);

  activeAtelierAddons = new Set();
  lastAtelierTrigger = card;
  atelierModalImage.src = imageSrc;
  atelierModalImage.alt = imageAlt;
  atelierModalTitle.textContent = title.toLocaleUpperCase("fr");
  atelierModalQuote.textContent = quote;

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

atelierModalCart.addEventListener("click", () => {
  atelierModal.close();
});
