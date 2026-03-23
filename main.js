// --- Countdown target date (from config) ---
const countdownDate = new Date(window.EVENT.dateCountdown).getTime();

// --- Navbar Scroll Effect ---
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const currentScroll = window.pageYOffset;
  if (currentScroll > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// --- Mobile Menu ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// --- Init from config ---
function initFromConfig() {
  const E = window.EVENT;
  if (!E) return;

  // Titulok stránky a meta description
  document.title = `${E.name} - ${E.edition} ${E.dateDisplay}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `${E.edition} ${E.name}. ${E.dateDisplay}, ${E.location}.`;

  // Navbar logo text
  const navLogo = document.getElementById('cfg-nav-logo');
  if (navLogo) navLogo.textContent = E.name;

  // Copyright
  const copyright = document.getElementById('cfg-copyright');
  if (copyright) copyright.innerHTML = `&copy; ${E.year} ${E.name}. Všetky práva vyhradené.`;

  // Hero
  const edition = document.getElementById('cfg-edition');
  if (edition) edition.textContent = E.edition;

  const heroDate = document.getElementById('cfg-hero-date');
  if (heroDate) heroDate.textContent = E.dateDisplay;

  const heroLoc = document.getElementById('cfg-hero-location');
  if (heroLoc) heroLoc.textContent = E.location;

  // Registračné URL (všetky tlačidlá naraz)
  document.querySelectorAll('.cfg-reg-url').forEach(el => { el.href = E.registrationUrl; });

  // Sociálne siete
  document.querySelectorAll('.cfg-fb-url').forEach(el => { el.href = E.social.facebook; });
  document.querySelectorAll('.cfg-ig-url').forEach(el => { el.href = E.social.instagram; });

  // YouTube videá
  const ytContainer = document.getElementById('cfg-yt-videos');
  if (ytContainer) {
    if (E.youtube.length > 0) {
      ytContainer.innerHTML = E.youtube.map((id, i) => `
        <div class="video-container reveal slide-${i === 0 ? 'right' : 'left'}"${i > 0 ? ' style="transition-delay: 200ms"' : ''}>
          <div class="yt-facade" data-videoid="${id}">
            <img src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" alt="YouTube video" loading="lazy">
            <button class="yt-play" aria-label="Prehrať video"></button>
          </div>
        </div>`).join('');
    } else {
      ytContainer.innerHTML = `
        <div class="video-container reveal slide-right" style="display:flex;align-items:center;justify-content:center;background:#1a1a1a;border-radius:12px;">
          <p style="color:#888;text-align:center;padding:2rem;">📹 Tu budú videá z podujatia</p>
        </div>
        <div class="video-container reveal slide-left" style="transition-delay:200ms;display:flex;align-items:center;justify-content:center;background:#1a1a1a;border-radius:12px;">
          <p style="color:#888;text-align:center;padding:2rem;">📹 Tu budú videá z podujatia</p>
        </div>`;
    }
  }

  // Výsledky
  const results = document.getElementById('cfg-results');
  if (results) {
    results.innerHTML = E.results
      .map(r => `<a href="${r.url}" target="_blank" class="btn btn-primary btn-large" style="margin: 0.5rem">Výsledky ${r.year}</a>`)
      .join('');
  }

  // Sponzori (duplikát pre plynulý loop)
  const track = document.getElementById('cfg-sponsors-track');
  if (track) {
    const items = E.sponsors.map(s => `<div class="sponsor-item">${s}</div>`).join('');
    track.innerHTML = items + items;
  }

  // Footer
  const footerDateLoc = document.getElementById('cfg-footer-date-loc');
  if (footerDateLoc) footerDateLoc.textContent = `${E.dateDisplay} • ${E.location}`;

  const organizer = document.getElementById('cfg-organizer');
  if (organizer) organizer.textContent = `Organizátor: ${E.contact.organizer}`;

  const email = document.getElementById('cfg-email');
  if (email) { email.href = `mailto:${E.contact.email}`; email.textContent = E.contact.email; }

  const phone = document.getElementById('cfg-phone');
  if (phone) { phone.href = `tel:+421${E.contact.phone.replace(/\s/g, '')}`; phone.textContent = E.contact.phone; }
}

initFromConfig();

// --- Countdown Timer ---
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "<span style='font-size:1.5rem'>Beh začal! 🏃</span>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("cd-days").innerText = days < 10 ? '0' + days : days;
  document.getElementById("cd-hours").innerText = hours < 10 ? '0' + hours : hours;
  document.getElementById("cd-minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById("cd-seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
}

updateCountdown();
const interval = setInterval(updateCountdown, 1000);

// --- Reveal on Scroll ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Hero elements activate immediately on load
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('active'));
  });
});

// --- YouTube Facade ---
document.querySelectorAll('.yt-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const id = facade.dataset.videoid;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?controls=1&autoplay=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    facade.replaceWith(iframe);
  });
});

// Handle bfcache restore (back/forward navigation)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.remove('active');
      void el.offsetWidth;
      el.classList.add('active');
    });
  }
});
