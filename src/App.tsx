import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Category,
  categories,
  heroImage,
  materials,
  nav,
  process,
  projects,
  quotes,
  services,
  site,
} from "./data";

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Re-observe reveal nodes whenever the dependency key changes (e.g. filter). */
function useReveal(depsKey: string | number) {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    nodes.forEach((n) => {
      // Already-visible nodes stay visible across filter changes
      if (!n.classList.contains("is-visible")) io.observe(n);
    });
    // Immediately reveal nodes already in (or near) the viewport
    requestAnimationFrame(() => {
      nodes.forEach((n) => {
        if (n.classList.contains("is-visible")) return;
        const r = n.getBoundingClientRect();
        const vh = window.innerHeight || 0;
        if (r.top < vh * 0.96 && r.bottom > 0) {
          n.classList.add("is-visible");
          io.unobserve(n);
        }
      });
    });
    return () => io.disconnect();
  }, [depsKey]);
}

export default function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Category>("All");
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  useReveal(`${filter}:${filtered.length}`);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const subject = encodeURIComponent(`Project inquiry — ${name || "Client"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    setFormStatus("Opening your email client…");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const onFilter = (c: Category) => {
    setFilter(c);
  };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header
        className={`site-header ${scrolled ? "is-scrolled" : "is-top"} ${
          menuOpen ? "menu-open" : ""
        }`}
      >
        <div className="header-inner">
          <a className="logo" href="#top" aria-label="LUMEN Atelier home">
            <span className="logo-mark" aria-hidden="true">
              L
            </span>
            <span className="logo-text">
              LUMEN <em>Atelier</em>
            </span>
          </a>
          <nav className="nav-desktop" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contact">
            Start a project
          </a>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-menu-inner">
          <p className="eyebrow">Navigate</p>
          <nav aria-label="Mobile">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <a href={`mailto:${site.email}`} onClick={closeMenu}>
              {site.email}
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              WhatsApp
            </a>
            <p>{site.location}</p>
          </div>
        </div>
      </div>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-media">
            <img
              src={heroImage}
              alt="Sunlit open-plan living room with floor-to-ceiling glass"
            />
            <div className="hero-veil" />
          </div>
          <div className="hero-content">
            <p className="eyebrow gold" data-reveal>
              Architectural interiors · Est. 2018
            </p>
            <h1 data-reveal>
              Rooms that breathe
              <span> with the light.</span>
            </h1>
            <p className="lede" data-reveal>
              {site.name} designs calm, material-honest interiors for homes and
              hospitality — Gulf climate, European restraint.
            </p>
            <div className="hero-actions" data-reveal>
              <a className="btn btn-primary" href="#work">
                View selected work
              </a>
              <a className="btn btn-ghost" href="#studio">
                Our approach
              </a>
            </div>
            <div className="hero-meta" data-reveal>
              <div>
                <strong>48</strong>
                <span>projects delivered</span>
              </div>
              <div>
                <strong>3</strong>
                <span>studios</span>
              </div>
              <div>
                <strong>6</strong>
                <span>countries</span>
              </div>
            </div>
          </div>
          <a className="scroll-hint" href="#work" aria-label="Scroll to work">
            <span />
          </a>
        </section>

        <section className="section work" id="work">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Spaces with quiet conviction.</h2>
            </div>
            <p className="section-note">
              Residential, hospitality, and retail interiors composed around
              daylight and tactile materials.
            </p>
          </div>

          <div
            className="filters"
            role="tablist"
            aria-label="Project filters"
            data-reveal
          >
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                className={filter === c ? "is-active" : ""}
                onClick={() => onFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="filter-count" aria-live="polite">
            {filtered.length} project{filtered.length === 1 ? "" : "s"}
            {filter !== "All" ? ` · ${filter}` : ""}
          </p>

          <div className="work-grid" key={filter}>
            {filtered.map((p, i) => (
              <article
                className={`work-card ${i % 5 === 0 ? "is-wide" : ""}`}
                key={p.id}
                data-reveal
              >
                <div className="work-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="work-overlay">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
                <div className="work-body">
                  <h3>{p.title}</h3>
                  <p className="work-loc">
                    {p.location} · {p.year}
                  </p>
                  <p>{p.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section studio" id="studio">
          <div className="studio-grid">
            <div data-reveal>
              <p className="eyebrow">Studio</p>
              <h2>
                We design for the way light
                <em> moves through a day.</em>
              </h2>
            </div>
            <div className="studio-copy" data-reveal>
              <p>
                Founded by Noura Al-Hassan, {site.name} is an interior
                architecture practice working between Riyadh, Dubai, and
                Copenhagen. We favour honest materials, measured colour, and
                rooms that feel settled rather than staged.
              </p>
              <p>
                Every project begins with site and sun path — then plan,
                joinery, and atmosphere follow. Quiet luxury is not excess; it
                is clarity.
              </p>
              <dl className="studio-facts">
                <div>
                  <dt>Founder</dt>
                  <dd>Noura Al-Hassan</dd>
                </div>
                <div>
                  <dt>Studios</dt>
                  <dd>{site.location}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Homes · Hotels · Retail</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">How we work</p>
              <h2>How we work with you.</h2>
            </div>
            <p className="section-note">
              Four clear steps from first conversation to first light — designed
              to feel calm on every screen.
            </p>
          </div>

          {/* Mobile: horizontal swipe cards */}
          <div
            className="services-rail"
            aria-label="How we work — swipe for each step"
            data-reveal
          >
            {services.map((s) => (
              <article className="service-card service-card--rail" key={`rail-${s.num}`}>
                <div className="service-card-top">
                  <span className="service-num">{s.num}</span>
                  <span className="service-pill">Step {s.num}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>

          {/* Desktop / large: vertical timeline */}
          <ol className="services-timeline" data-reveal>
            {services.map((s) => (
              <li key={`tl-${s.num}`}>
                <span className="timeline-marker" aria-hidden="true">
                  <span className="timeline-dot" />
                </span>
                <div className="timeline-body">
                  <span className="service-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section materials" id="materials">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Palette</p>
              <h2>Materials we return to.</h2>
            </div>
            <p className="section-note">
              Champagne metals, pale stone, oak, and linen — a vocabulary of
              tactility.
            </p>
          </div>
          <div className="materials-strip">
            {materials.map((m) => (
              <figure key={m.name} data-reveal>
                <img src={m.image} alt={m.name} loading="lazy" />
                <figcaption>{m.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section approach" id="approach">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Approach</p>
              <h2>From first conversation to first light.</h2>
            </div>
          </div>
          <ol className="process-list">
            {process.map((p) => (
              <li key={p.step} data-reveal>
                <span className="process-step">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section press">
          <div className="press-track" data-reveal>
            {quotes.map((q) => (
              <blockquote key={q.attrib}>
                <p>“{q.text}”</p>
                <cite>{q.attrib}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-grid">
            <div data-reveal>
              <p className="eyebrow">Contact</p>
              <h2>Tell us about the space you imagine.</h2>
              <p className="lede-sm">
                Share a brief, a site, or a feeling. We reply within two business
                days.
              </p>
              <ul className="contact-list">
                <li>
                  <span>Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <span>WhatsApp</span>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {site.phone}
                  </a>
                </li>
                <li>
                  <span>Studio</span>
                  <span>{site.address}</span>
                </li>
                <li>
                  <span>Presence</span>
                  <span>{site.location}</span>
                </li>
              </ul>
            </div>
            <form className="contact-form" onSubmit={onSubmit} data-reveal>
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@studio.com"
                  autoComplete="email"
                />
              </label>
              <label>
                Project type
                <select name="type" defaultValue="Residential">
                  <option>Residential</option>
                  <option>Hospitality</option>
                  <option>Retail</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Site, timeline, atmosphere…"
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Send inquiry
              </button>
              {formStatus && <p className="form-status">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <p className="logo-text">
              LUMEN <em>Atelier</em>
            </p>
            <p className="footer-tag">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Designed for light · Built with care</p>
        </div>
      </footer>

      <a className="sticky-cta" href="#contact">
        Start a project
      </a>
    </>
  );
}
