:root {
  color-scheme: light;
  --atelier-page: #f8f8f8;
  --atelier-text: #242322;
  --atelier-muted: #6f6a68;
  --atelier-lavender: #7d7a9d;
  --atelier-card: #ffffff;
  --atelier-card-image: #f8f8f8;
  --atelier-shadow: rgb(35 31 28 / 0.06);
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  background: var(--atelier-page);
}

body {
  min-height: 100svh;
  margin: 0;
  color: var(--atelier-text);
  background: var(--atelier-page);
  font-family: var(--font-body);
}

html.atelier-modal-open,
body.atelier-modal-open {
  overflow: hidden;
}

body.atelier-modal-open .atelier-page {
  touch-action: none;
}

img {
  max-width: 100%;
}

.atelier-page {
  width: min(100%, 760px);
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4.5rem) clamp(1.1rem, 4vw, 2.25rem) clamp(2.5rem, 7vw, 5rem);
}

.atelier-hero {
  display: grid;
  justify-items: center;
  text-align: center;
  overflow: visible;
}

.atelier-kicker {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.1rem, 9vw, 4.85rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.07em;
}

.atelier-title {
  margin: clamp(0.45rem, 1.5vw, 0.75rem) 0 0;
  padding-bottom: 0.12em;
  background: linear-gradient(to right, #3b4a81 0%, #8b93c4 55%, #c4c9e4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 5.8vw, 3rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.075em;
}

.atelier-mascot {
  width: clamp(2.35rem, 6vw, 3.2rem);
  height: clamp(2.35rem, 6vw, 3.2rem);
  margin-top: clamp(0.55rem, 1.5vw, 0.85rem);
  object-fit: contain;
  mix-blend-mode: multiply;
}

.atelier-intro {
  max-width: min(100%, 52rem);
  margin: clamp(0.75rem, 2vw, 1.1rem) 0 0;
  color: #545150;
  font-family: var(--font-display);
  font-size: clamp(0.78rem, 1.6vw, 0.92rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1.45;
}

@media (min-width: 720px) {
  .atelier-intro {
    white-space: nowrap;
  }
}

.atelier-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.8rem, 2vw, 1.25rem);
  width: min(100%, 440px);
  margin: clamp(1.6rem, 4vw, 2.4rem) auto 0;
}

.atelier-card {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: clamp(190px, 35vw, 250px);
  padding: clamp(0.45rem, 1.2vw, 0.7rem);
  border: 1px solid #ffffff;
  border-radius: 0.35rem;
  background: #ffffff;
  box-shadow: 0 0.35rem 1.2rem var(--atelier-shadow);
  cursor: pointer;
  content-visibility: auto;
  contain-intrinsic-size: 250px 210px;
  transform-origin: center center;
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.atelier-card:hover,
.atelier-card:focus-visible {
  box-shadow: 0 0.55rem 1.6rem rgb(35 31 28 / 0.1);
  outline: none;
  transform: rotate(-2.5deg);
}

.atelier-card:nth-child(even):hover,
.atelier-card:nth-child(even):focus-visible {
  transform: rotate(2.5deg);
}

.atelier-card img {
  display: block;
  width: 100%;
  height: clamp(145px, 27vw, 198px);
  border-radius: 0.2rem;
  object-fit: contain;
  background: var(--atelier-card-image);
}

.atelier-card h2 {
  margin: clamp(0.45rem, 1.2vw, 0.7rem) 0 0.15rem;
  font-size: clamp(0.74rem, 1.4vw, 0.88rem);
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
}

.atelier-card__duo-images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: 0.2rem;
  background: var(--atelier-card-image);
  border-radius: 0.2rem;
}

.atelier-card__duo-images img {
  height: clamp(145px, 27vw, 198px);
  border-radius: 0.2rem;
  background: var(--atelier-card-image);
}

.atelier-card--feature {
  grid-column: 1 / -1;
  justify-self: center;
  width: min(100%, 220px);
  margin-top: clamp(0.6rem, 2vw, 1rem);
}

.atelier-footer {
  position: relative;
  display: grid;
  justify-items: center;
  margin-top: clamp(1.4rem, 4vw, 2.5rem);
  padding-bottom: clamp(2.5rem, 8vw, 5rem);
}

.atelier-social {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
}

.atelier-social a {
  display: inline-grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 999px;
  background: #2d2d2c;
  color: #ffffff;
  text-decoration: none;
}

.atelier-social__icon {
  width: 1.05rem;
  height: 1.05rem;
}

.atelier-social a:hover,
.atelier-social a:focus-visible {
  background: var(--atelier-lavender);
  outline: none;
}

.atelier-floating {
  position: absolute;
  right: max(0.5rem, 8vw);
  bottom: 0;
  width: clamp(2.2rem, 6vw, 3rem);
  height: clamp(2.2rem, 6vw, 3rem);
  object-fit: contain;
  transform: rotate(18deg);
}

.atelier-modal {
  width: min(1180px, calc(100vw - 1.5rem));
  max-width: none;
  height: min(820px, calc(100svh - 1.5rem));
  margin: auto;
  padding: 0;
  border: 0;
  border-radius: 1.35rem;
  background: #ffffff;
  color: #1f1d1b;
  overflow: hidden;
}

.atelier-modal::backdrop {
  background: rgb(18 18 18 / 0.56);
  backdrop-filter: blur(4px);
}

.atelier-modal__panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.9fr) minmax(300px, 0.95fr);
  height: 100%;
}

.atelier-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  display: inline-grid;
  width: 2.1rem;
  height: 2.1rem;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.82);
  color: #1f1d1b;
  cursor: pointer;
  font-size: 1.8rem;
  line-height: 1;
}

.atelier-modal__visual {
  display: block;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  background: #ececea;
}

.atelier-modal__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.atelier-modal__details {
  display: grid;
  align-content: start;
  gap: clamp(0.65rem, 1.7vw, 1rem);
  min-height: 0;
  overflow-y: auto;
  padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem);
}

.atelier-modal__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.45rem, 5vw, 3.8rem);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: 0.02em;
}

.atelier-modal__quote {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2vw, 1.28rem);
  font-weight: 600;
  line-height: 1.2;
}

.atelier-modal__botanical {
  margin: 0.35rem 0 0;
  color: var(--atelier-muted);
  font-family: var(--font-body);
  font-size: clamp(0.78rem, 1.5vw, 0.88rem);
  font-weight: 500;
  line-height: 1.35;
}

.atelier-modal__botanical[hidden] {
  display: none;
}

.atelier-modal__addons[hidden] {
  display: none;
}

.atelier-modal__price {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.15rem);
  font-weight: 600;
  line-height: 0.9;
}

.atelier-modal__addons {
  display: grid;
  gap: 0.65rem;
}

.atelier-modal__addons-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 600;
}

.atelier-modal__addon-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.65rem;
}

.atelier-addon {
  display: grid;
  place-items: center;
  padding: 0 0.35rem;
  border: 1px solid transparent;
  background: #f6f4f0;
  cursor: pointer;
}

.atelier-addon.is-selected,
.atelier-addon[aria-pressed="true"] {
  border-color: #4b176f;
  box-shadow: inset 0 0 0 1px #4b176f;
}

.atelier-addon:focus-visible {
  outline: 2px solid #4b176f;
  outline-offset: 2px;
}

.atelier-addon__images {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
}

.atelier-addon__images:has(img:nth-child(2)) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.1rem;
}

.atelier-addon__images img {
  width: 100%;
  height: clamp(4.2rem, 8vw, 5.4rem);
  object-fit: contain;
}

.atelier-modal__addon-lines {
  min-height: 2.3rem;
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.25;
}

.atelier-modal__addon-lines p {
  margin: 0;
}

.atelier-modal__specs {
  display: grid;
  gap: 0.7rem;
  margin: 0.3rem 0 0;
}

.atelier-modal__specs div {
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  gap: 0.9rem;
}

.atelier-modal__specs dt,
.atelier-modal__specs dd {
  margin: 0;
}

.atelier-modal__specs dt {
  display: grid;
  place-items: center;
}

.atelier-modal__specs dd {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
}

.atelier-modal__flag {
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  background:
    linear-gradient(to right, #0055a4 0 33%, #ffffff 33% 66%, #ef4135 66% 100%);
}

.atelier-modal__icon {
  font-size: 1.45rem;
  line-height: 1;
}

.atelier-modal__diamond {
  color: #36c7e8;
  font-size: 1.45rem;
  line-height: 1;
}

.atelier-modal__cart {
  justify-self: start;
  margin-top: 0.4rem;
  padding: 0.95rem 1.8rem;
  border: 0;
  border-radius: 0.2rem;
  background: #4b0f83;
  color: #ffffff;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2.2vw, 1.55rem);
  font-weight: 600;
  line-height: 1;
}

.atelier-modal__cart:hover,
.atelier-modal__cart:focus-visible {
  background: #5d18a0;
  outline: none;
}

.atelier-modal__total {
  margin: 0;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 3vw, 2.3rem);
  font-weight: 600;
}

@media (max-width: 520px) {
  .atelier-page {
    padding-inline: 1rem;
  }

  .atelier-grid {
    width: min(100%, 360px);
  }

  .atelier-card {
    min-height: 170px;
  }

  .atelier-card img,
  .atelier-card__duo-images img {
    height: 128px;
  }
}

@media (max-width: 760px) {
  .atelier-grid {
    grid-template-columns: 1fr;
    width: min(100%, 320px);
  }

  .atelier-card--feature {
    grid-column: auto;
    width: 100%;
    margin-top: 0;
  }

  .atelier-modal {
    width: calc(100vw - 1rem);
    height: calc(100svh - 1rem);
    border-radius: 1rem;
  }

  .atelier-modal__panel {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(260px, 42svh) minmax(0, 1fr);
  }

  .atelier-modal__details {
    padding: 1.35rem;
  }

  .atelier-modal__addon-grid {
    grid-template-columns: repeat(4, minmax(3.6rem, 1fr));
    overflow-x: auto;
  }
}
