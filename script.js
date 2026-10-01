const toTop = document.getElementById("to-top");

addEventListener("scroll", () => toTop.classList.toggle("is-visible", scrollY > 200), { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const lorem = "Placeholder text. Describe the problem, who it was for, what you shipped, and the impact it had.";
const placeholderSections = ["Context", "What I did", "Outcome"].map((title) => ({ title, text: lorem }));

const helpdesk = (id) => `https://helpdesk.caldera.com/hc/article_attachments/${id}`;

const projects = {
  caldera: {
    title: "Caldera",
    ublo:
      "At Caldera I learned to build in a small, close team, where everyone talks to each other and to customers. Ublo is still a human-sized company, so I'd fit right into that way of working.",
    props: { Company: "Caldera", Location: "Strasbourg, France", Date: "October 2025 → Present" },
    intro:
      "Caldera makes software that print shops use to run their printers. CalderaDock is the app that installs that software, keeps it up to date and checks the customer has paid for it. My first project was making account sign-up fit on one page. Then I was the Product Manager for four versions of CalderaDock. My goal: buy it, start printing, and never need to call for help. To decide what to build, I looked at what people asked support for most, how they used the app, and what the company needed.",
    sections: [
      {
        title: "CalderaDock 4.0: everything in one place",
        items: [
          {
            title: "A new home page",
            compare: {
              before: "v4-home-before.png",
              after: "v4-home-after.png",
            },
            result: "How many people create an account, instead of using the software without one.",
          },
          {
            title: "User's plan at a glance",
            before: "To see what they owned and when it ended, people had to dig into settings and menus.",
            after: "One panel on the right shows it all.",
          },
          {
            title: "No surprise endings",
            before: "A license could run out without anyone noticing.",
            after: "A red banner warns people before it happens.",
            result: "Support tickets from people surprised that their license had ended.",
          },
          {
            title: "Try other apps easily",
            before: "Apps people didn't have yet were hidden away.",
            after: "They're on the home page, with a free trial button.",
          },
          {
            title: "Fewer places to look",
            before: "Seven tabs, plus a search bar.",
            after: "Four tabs, and all the help links in one menu.",
          },
        ],
      },
      {
        title: "CalderaDock 3.17: getting started faster",
        items: [
          {
            title: "The license sets itself up",
            before: "After buying, people had to link their license to the software by hand.",
            after: "If there's only one license, it links itself. People can start right away.",
          },
          {
            title: "One click to activate",
            before: "People copied a long code from an email and pasted it into the app.",
            after: "A button in the email fills everything in for them.",
            result: "Time from receiving the license email to the software working.",
          },
          {
            title: "A button you can see",
            before: "The button to add a license was just a small icon.",
            after: "It now says \"Add\".",
            shot: helpdesk("43441577693457"),
          },
        ],
      },
      {
        title: "CalderaDock 3.16: an app that takes care of itself",
        items: [
          {
            title: "Opens on its own",
            before: "People had to remember to open the app to get updates.",
            after: "It starts quietly when the computer turns on.",
            result: "How many days it takes most users to get a new update.",
            shot: helpdesk("41323765814801"),
          },
          {
            title: "Tells you when something is new",
            before: "People only saw updates if they went looking.",
            after: "A small message pops up when an update is ready.",
            shot: helpdesk("41323765807121"),
          },
          {
            title: "Clear about signing in",
            before: "Some things didn't work when signed out, and nobody said why.",
            after: "A message explains it, with a sign-in link on every page.",
            shot: helpdesk("41323751315217"),
          },
          {
            title: "Works on more computers",
            before: "The app installed an extra tool most people didn't need, and it broke some computers.",
            after: "That tool is now optional.",
          },
          {
            title: "Backups that finish",
            before: "Backups gave up on slow computers.",
            after: "They now wait long enough to finish.",
          },
        ],
      },
      {
        title: "CalderaDock 3.15: safer updates",
        items: [
          {
            title: "An undo button for updates",
            before: "If an update went wrong, the printers could stop working.",
            after: "The app saves a copy before every update. If something breaks, one click brings it back.",
            result: "How often people use undo after an update.",
          },
          {
            title: "Knowing what you paid for",
            before: "People couldn't see which version or plan they had.",
            after: "The app shows it clearly.",
          },
          {
            title: "Printer settings in the app",
            before: "People had to look elsewhere for ready-made printer settings.",
            after: "They can download them right in the app.",
          },
        ],
      },
      {
        title: "What changed for users",
        bullets: [
          "Starting takes one click.",
          "Every update can be undone.",
          "The app tells them what's new and what's ending.",
          "Everything they own is on one screen.",
        ],
      },
      {
        title: "CalderaRIP 19.1.1 to 19.3",
        text: 'I also led three versions of CalderaRIP, the software that prepares files and sends them to the printer. <a href="https://helpdesk.caldera.com/hc/en-us/articles/38260212577041-CalderaRIP-V19-Changelog" target="_blank" rel="noopener">See the changelog</a>.',
      },
      {
        title: "First project: sign up on one page",
        items: [
          {
            title: "A shorter sign-up",
            compare: {
              before: "signup-before.png",
              after: "signup-after.png",
            },
            before: "A long page with a banner, a password to type twice, and fields far down the screen.",
            after: "Everything fits on one page, with no password to invent before getting started.",
            result: "How many people who start the form finish creating their account.",
          },
        ],
      },
    ],
    links: [
      { label: "CalderaDock 3 release notes", href: "https://helpdesk.caldera.com/hc/en-us/articles/17648627298321-CalderaDock-V3-Changelog" },
      { label: "CalderaDock 4 release notes", href: "https://helpdesk.caldera.com/hc/en-us/articles/45361538689169-CalderaDock-V4-Changelog" },
    ],
    details: {
      Releases: "3.15, 3.16, 3.17, 4.0",
      "Team size": "5 people",
      Role: ["Product Manager"],
      Users: ["Print shops"],
      Platforms: ["Windows", "macOS", "Linux"],
      Areas: ["Getting started", "Updates", "Licenses", "Desktop app"],
    },
  },
  hackly: {
    title: "Hackly",
    ublo:
      "With Hackly I owned every part of a product, always starting from what users needed. Same user-first approach Ublo takes when it designs with property professionals.",
    props: { Project: "Personal", Community: "400+ on Discord", Date: "2025" },
    intro:
      "Hackly was a personal project I designed, built and ran on my own. It started with my own frustrations at hackathons, and became a new way to compete with AI.",
    sections: [
      {
        title: "The problem",
        items: [
          {
            text: "I love hackathons, but I kept seeing the same two problems.",
            before: "You needed to find teammates before you could even join. And people often felt the jury wasn't fair.",
            after: "With Hackly, you joined alone and worked with everyone. A clear score decided who won.",
          },
        ],
      },
      {
        title: "How it worked",
        text: "It also let me explore a bigger question: what happens when a group of people use AI together, instead of each person alone?",
        items: [
          {
            title: "Share an idea",
            text: "Someone wrote an idea as a prompt. Anyone could make a copy, called a branch, and try to make it better. No team needed.",
            result: "How many prompts people sent in each hackathon.",
            shot: "hackly-project.png",
          },
          {
            title: "Let AI be the judge",
            text: "You picked a model, pressed Evaluate, and the AI gave a score. It also explained what was weak and how to improve it. Same rules for everyone, and you saw why you got your score.",
          },
          {
            title: "Win the branch",
            text: "The best score owned the branch and earned points. People who built the earlier versions still earned points when others improved their work, so helping paid off. Prizes went to the top of the leaderboard.",
            result: "How often people improved someone else's prompt.",
            shot: "hackly-ranking.png",
          },
        ],
      },
      {
        title: "Built with the community",
        text: "I changed a lot based on what people said on Discord. The AI judge wasn't there at the start. It came later, from that feedback.",
      },
      {
        title: "How I built it",
        text: "I built everything myself: the website in HTML, CSS and JavaScript, the backend in Python, and the data on Firebase and Firestore. I also built Discord bots and automations to welcome people, run the hackathons and keep the community going.",
      },
      {
        title: "What happened",
        items: [
          {
            text: "More than 400 people joined the Discord, mostly from Reddit posts and emails I sent.",
            result: "How many people joined the Discord.",
          },
          {
            text: "I didn't find a sponsor to pay for the prizes and the AI costs, so I couldn't keep it running.",
          },
        ],
      },
      {
        title: "What I learned",
        text: "People really wanted to build with AI together. The hard part wasn't getting interest, it was finding someone to pay for it.",
      },
    ],
    linksTitle: "See the community",
    links: [{ label: "Hackly on Discord", href: "https://discord.gg/AnNhFPcsk" }],
    details: {
      "Built by": "Me, alone",
      Community: "400+ on Discord",
      Role: ["Product", "Design", "Code", "Community"],
      Stack: ["Python", "HTML", "CSS", "JavaScript", "Firebase", "Firestore", "Discord bots"],
      Areas: ["AI", "Collaboration", "Gamification"],
    },
  },
  rebelbase: {
    title: "Rebelbase",
    props: { Company: "RebelBase", Location: "New York, USA", Date: "February 2023 → June 2023" },
    intro:
      "RebelBase helps everyday people turn an idea into a real project that fixes a problem where they live, one small step at a time. As the CEO's assistant, I wrote our application to MIT Solve, a global contest for ideas that make the world better. I told it through real people using the product and a few clear numbers, and it reached the semi-finals.",
    sections: [],
    linksTitle: "Read it",
    links: [
      { label: "The full application on MIT Solve", href: "https://solve.mit.edu/solutions/74670" },
    ],
  },
};

const slug = (s) => "s-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const list = (items) => `<ul>${items.map((b) => `<li>${b}</li>`).join("")}</ul>`;

const figure = (shot) => {
  const src = shot.startsWith("http") ? shot : `files/screenshots/${shot}`;
  return `<figure class="peek-figure"><img src="${src}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'Add ${src}'}))"></figure>`;
};

const renderItem = (it) =>
  [
    it.title && `<h3>${it.title}</h3>`,
    it.compare && `<div class="peek-compare"><div><span class="ba-label">Before</span>${figure(it.compare.before)}</div><div><span class="ba-label">Now</span>${figure(it.compare.after)}</div></div>`,
    it.text && `<p>${it.text}</p>`,
    it.before && `<p class="ba ba-before"><span class="ba-label">Before</span>${it.before}</p>`,
    it.after && `<p class="ba ba-now"><span class="ba-label">Now</span>${it.after}</p>`,
    it.result && `<p class="ba ba-tracked"><span class="ba-label">Tracked</span>${it.result}</p>`,
    it.shot && figure(it.shot),
  ]
    .filter(Boolean)
    .join("");

const renderSection = (s) =>
  [
    `<h2 id="${slug(s.title)}">${s.title}</h2>`,
    s.text && `<p>${s.text}</p>`,
    s.bullets && list(s.bullets),
    (s.items || []).map(renderItem).join(""),
  ]
    .filter(Boolean)
    .join("");

const renderDetails = (d) =>
  `<dl class="peek-details">${Object.entries(d)
    .map(([k, v]) => `<dt>${k}</dt><dd>${Array.isArray(v) ? v.map((t) => `<span class="tag">${t}</span>`).join("") : v}</dd>`)
    .join("")}</dl>`;

const linksTitle = (p) => p.linksTitle || "Release notes";
const extraSections = (p) => [p.links && linksTitle(p), p.details && "Properties"].filter(Boolean);

const renderBody = (p) =>
  [
    p.intro && `<p class="peek-intro">${p.intro}</p>`,
    p.sections.length > 1 &&
      `<nav class="peek-toc">${[...p.sections.map((s) => s.title), ...extraSections(p)].map((t) => `<a href="#${slug(t)}">${t}</a>`).join("")}</nav>`,
    p.sections.map(renderSection).join(""),
    p.links &&
      `<h2 id="${slug(linksTitle(p))}">${linksTitle(p)}</h2>${list(p.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`))}`,
    p.details && `<h2 id="${slug("Properties")}">Properties</h2>${renderDetails(p.details)}`,
  ]
    .filter(Boolean)
    .join("");

const peek = document.getElementById("peek");
const peekInner = peek.querySelector(".peek-inner");
const minimap = document.getElementById("peek-minimap");
const $ = (id) => document.getElementById(id);

const renderMinimap = (titles) => {
  minimap.innerHTML = titles
    .map((t) => `<a href="#${slug(t)}"><span>${t}</span><i></i></a>`)
    .join("");
};

const updateMinimap = () => {
  const heads = [...peek.querySelectorAll("#peek-body h2")];
  const atBottom = peekInner.scrollTop + peekInner.clientHeight >= peekInner.scrollHeight - 4;
  const current = atBottom
    ? heads.length - 1
    : heads.reduce((acc, h, i) => (h.offsetTop - 80 <= peekInner.scrollTop ? i : acc), 0);
  minimap.querySelectorAll("a").forEach((a, i) => a.classList.toggle("active", i === current));
};

const openProject = (key) => {
  const p = projects[key];
  if (!p) return;
  $("peek-title").textContent = p.title;
  const ublo = $("peek-ublo");
  if (p.ublo) {
    ublo.hidden = false;
    ublo.innerHTML = `<span>Why it matters for Ublo</span>${p.ublo}`;
  } else {
    ublo.hidden = true;
    ublo.textContent = "";
  }
  $("peek-props").innerHTML = Object.entries(p.props)
    .map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`)
    .join("");
  $("peek-body").innerHTML = renderBody(p);
  renderMinimap(p.sections.length > 1 ? [...p.sections.map((s) => s.title), ...extraSections(p)] : []);
  peek.classList.remove("expanded");
  peek.showModal();
  peekInner.scrollTop = 0;
  updateMinimap();
  document.body.style.overflow = "hidden";
};

document.querySelectorAll("[data-project]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    openProject(a.dataset.project);
  })
);

peek.addEventListener("click", (e) => {
  const a = e.target.closest(".peek-minimap a, .peek-toc a");
  if (!a) return;
  e.preventDefault();
  peek.querySelector(a.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
});

peekInner.addEventListener("scroll", updateMinimap, { passive: true });
peek.addEventListener("close", () => (document.body.style.overflow = ""));
peek.addEventListener("click", (e) => e.target === peek && peek.close());
$("peek-close").addEventListener("click", () => peek.close());
$("peek-expand").addEventListener("click", () => peek.classList.toggle("expanded"));
