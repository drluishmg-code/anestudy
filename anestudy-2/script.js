/* ==========================================================================
   AneStudy — script.js
   Vanilla JS puro. Sem dependências externas.
   Responsável por: header no scroll, menu mobile, revelação de elementos,
   carrossel de capturas de tela e botão "voltar ao topo".
   ========================================================================== */

(() => {
  "use strict";

  /* ---------- Header: sombra ao rolar a página ---------- */
  const header = document.querySelector(".site-header");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    toggleBackToTop();
  };

  /* ---------- Menu mobile (drawer) ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navDrawer = document.querySelector(".nav-drawer");

  if (navToggle && navDrawer) {
    navToggle.addEventListener("click", () => {
      const isOpen = navDrawer.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Fecha o menu ao clicar em um link
    navDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navDrawer.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Revelação suave dos elementos ao rolar ---------- */
  const revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    // Sem suporte a IntersectionObserver: mostra tudo imediatamente
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Carrossel de capturas de tela (mobile) ---------- */
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsWrap = document.querySelector(".carousel-dots");

  if (track && slides.length) {
    let current = 0;

    // Cria os indicadores (dots) dinamicamente
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Ir para captura ${i + 1}`);
        dot.setAttribute("aria-current", i === 0 ? "true" : "false");
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    const dots = dotsWrap ? dotsWrap.querySelectorAll("button") : [];

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.setAttribute("aria-current", String(i === current)));
    }

    prevBtn && prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener("click", () => goTo(current + 1));

    // Suporte a arraste (swipe) em telas de toque
    let startX = 0;
    let isDragging = false;

    track.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      },
      { passive: true }
    );

    track.addEventListener(
      "touchend",
      (e) => {
        if (!isDragging) return;
        const deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 40) {
          goTo(deltaX < 0 ? current + 1 : current - 1);
        }
        isDragging = false;
      },
      { passive: true }
    );

    // Autoplay discreto, pausa ao interagir
    let autoplay = setInterval(() => goTo(current + 1), 5000);
    const pauseAutoplay = () => clearInterval(autoplay);
    [prevBtn, nextBtn, track].forEach((el) => el && el.addEventListener("pointerdown", pauseAutoplay));
  }

  /* ---------- Botão "voltar ao topo" ---------- */
  const backToTop = document.querySelector(".back-to-top");

  function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Ano corrente no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });



  /* ---------- Realce do link ativo no menu conforme a seção visível ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"], .nav-drawer a[href^="#"]');

  if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            const match = a.getAttribute("href") === `#${id}`;
            a.toggleAttribute("aria-current", match);
            if (match) a.setAttribute("aria-current", "page");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => sectionObserver.observe(s));
  }
})();
