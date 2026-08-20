/* =========================================================
   MOHD FAIZ — 23RD CENTURY PORTFOLIO JS
   Features: Particle canvas · Custom cursor · Holographic loader
             Smooth scroll · Scroll reveal · Active nav
   ========================================================= */

/* ─── TECH STACK DATA ─────────────────────────── */
const techStack = {
  'programming-languages': [
    { name: 'Python',     image: 'TS Logo/PYTHON.png' },
    { name: 'C#',         image: 'TS Logo/Csharp.png' },
    { name: 'Java',       image: 'TS Logo/JAVA.png' },
    { name: 'JavaScript', image: 'TS Logo/JAVASCRIPT.png' },
    { name: 'TypeScript', image: 'TS Logo/TYPESCRIPT.png' },
    { name: 'Bash',       image: 'TS Logo/Bash.png' }
  ],
  'web-technologies': [
    { name: 'HTML5',      image: 'TS Logo/HTML5.png' },
    { name: 'CSS3',       image: 'TS Logo/CSS3.png' },
    { name: 'React.js',   image: 'TS Logo/REACT.png' },
    { name: 'Node.js',    image: 'TS Logo/NODEJS.png' },
    { name: 'Express.js', image: 'TS Logo/EXPRESSJS.png' }
  ],
  'databases': [
    { name: 'MySQL',    image: 'TS Logo/MYSQL.png' },
    { name: 'MongoDB',  image: 'TS Logo/MONGODB.png' },
    { name: 'Supabase', image: 'TS Logo/supabase.png' },
    { name: 'Firebase', image: 'TS Logo/fiebase.png' }
  ],
  'dev-tools': [
    { name: 'GitHub',      image: 'TS Logo/GITHUB.png' },
    { name: 'Docker',      image: 'TS Logo/DOCKER.png' },
    { name: 'Flutter',     image: 'TS Logo/flutter.png' },
    { name: 'VS Code',     image: 'TS Logo/VScode.png' },
    { name: 'Spring Boot', image: 'TS Logo/Springboot.png' },
    { name: 'Kali Linux',  image: 'TS Logo/kali linux.png' }
  ]
};

function populateSkills() {
  Object.keys(techStack).forEach(categoryId => {
    const grid = document.getElementById(categoryId);
    if (!grid) return;
    techStack[categoryId].forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skill-item';
      item.innerHTML = `<img src="${skill.image}" alt="${skill.name}" class="skill-logo" loading="lazy"><p>${skill.name}</p>`;
      grid.appendChild(item);
    });
  });
}

/* ─── PARTICLE CANVAS ─────────────────────────── */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  // Create particle nodes
  const NUM_PARTICLES = 80;
  const CONNECTION_DIST = 150;

  const tealColor   = [0, 230, 204];
  const redColor    = [255, 68, 85];
  const purpleColor = [168, 85, 247];

  const particles = Array.from({ length: NUM_PARTICLES }, () => ({
    x:    Math.random() * W,
    y:    Math.random() * H,
    vx:   (Math.random() - 0.5) * 0.35,
    vy:   (Math.random() - 0.5) * 0.35,
    r:    Math.random() * 1.8 + 0.6,
    color: Math.random() < 0.65 ? tealColor : Math.random() < 0.5 ? redColor : purpleColor,
    alpha: Math.random() * 0.5 + 0.2
  }));

  // Mouse repulsion
  let mouseX = W / 2, mouseY = H / 2;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update & draw particles
    particles.forEach(p => {
      // Mouse repulsion
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.vx += (dx / dist) * force * 0.06;
        p.vy += (dy / dist) * force * 0.06;
      }

      // Damp velocity
      p.vx *= 0.99;
      p.vy *= 0.99;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.join(',')}, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECTION_DIST) {
          const alpha = (1 - d / CONNECTION_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${a.color.join(',')}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

/* ─── CUSTOM CURSOR ───────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let rx = 0, ry = 0;
  let tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px';
    dot.style.top  = ty + 'px';
  });

  function animateCursor() {
    rx += (tx - rx) * 0.15;
    ry += (ty - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Interactive hover states
  const interactives = document.querySelectorAll('a, button, [onclick], .glass-card, .skill-item, .certification-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'var(--teal)';
      dot.style.transform = 'translate(-50%, -50%) scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'var(--teal)';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  document.addEventListener('mousedown', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });
  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

/* ─── LOADING SCREEN ──────────────────────────── */
function initLoader() {
  const loader  = document.getElementById('loading-screen');
  const pctEl   = document.getElementById('loader-pct');
  if (!loader) return;

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) { pct = 100; clearInterval(interval); }
    if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
  }, 80);

  window.addEventListener('load', () => {
    setTimeout(() => {
      pct = 100;
      if (pctEl) pctEl.textContent = '100%';
      setTimeout(() => loader.classList.add('hidden'), 200);
    }, 500);
  });
}

/* ─── MOBILE NAV ──────────────────────────────── */
function toggleMobileMenu() {
  const mobileNav  = document.querySelector('.mobile-nav');
  const hamburger  = document.querySelector('.hamburger');
  mobileNav.classList.toggle('active');
  hamburger.innerHTML = mobileNav.classList.contains('active')
    ? '<div class="x-symbol">&times;</div>'
    : '<span></span><span></span><span></span>';
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  document.querySelector('.mobile-nav').classList.remove('active');
  document.querySelector('.hamburger').innerHTML = '<span></span><span></span><span></span>';
  document.body.style.overflow = '';
}

/* ─── EMAIL HELPER ────────────────────────────── */
function openEmail(event) {
  event.preventDefault();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = 'mailto:mdfaiz0871@gmail.com';
  } else {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mdfaiz0871@gmail.com', '_blank');
  }
}

/* ─── CERTIFICATES ────────────────────────────── */
function viewCertificate(certificateId) {
  const certificateUrls = {
    'red-hat-linux-fundamentals':       'Certificates/red hat linux fundamentals.pdf',
    'red-hat-system-administration-1':  'Certificates/red hat administration 1.pdf',
    'red-hat-system-administration-2':  'Certificates/red hat administartion 2.pdf',
    'ccna-introduction-to-networks':    'Certificates/CCNA-_Introduction_to_Networks_certificate.pdf',
    'aws-cloud-foundations':            'Certificates/AWS_Academy_Graduate___Cloud_Foundations.pdf',
    'cybersecurity-foundation':         'Certificates/Cybersecurity_Foundation.pdf',
    'cisco-final-certificate':          'Certificates/cisco final certificate.pdf',
    'cisco-netacad-rider-certificate':  'Certificates/Cisco netacad rider certificate.pdf',
    'network-security-fundamentals':    'Certificates/Network_Security_Fundamentals.pdf',
    'cloud-security-fundamentals':      'Certificates/Cloud_Security_Fundamentals.pdf',
    'cloud-security-automation':        'Certificates/_Cloud_Security_Automation.pdf',
    'security-operations-fundamentals': 'Certificates/Security_Operations_Fundamentals.pdf',
    'security-operations-configurations':'Certificates/Security_Operations_Configuration.pdf'
  };
  const url = certificateUrls[String(certificateId || '').trim()];
  if (url) {
    window.open(url + '#zoom=80&toolbar=0&navpanes=0', '_blank');
  } else {
    alert('This certificate file is being added to the Certificates folder.');
  }
}

/* ─── SMOOTH SCROLL + ACTIVE NAV ─────────────── */
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link, .hero-contact-btn');
  const nav      = document.getElementById('nav');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const targetSection = document.getElementById(href.substring(1));
      if (!targetSection) return;
      const navHeight = nav ? nav.offsetHeight : 70;
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 10;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  const sections = document.querySelectorAll('.section, .hero-section');

  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 180;
    let activeSection = 'about';
    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) activeSection = section.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSection}`) link.classList.add('active');
    });
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (!scrollTick) {
      requestAnimationFrame(() => { updateActiveNavigation(); scrollTick = false; });
      scrollTick = true;
    }
  });
  updateActiveNavigation();
}

function initMobileNavigation() {
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      closeMobileMenu();
      if (targetSection) {
        setTimeout(() => {
          const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }, 320);
      }
    });
  });
}

/* ─── SCROLL REVEAL ───────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  targets.forEach(t => observer.observe(t));
}

/* ─── VIDEO KEEP-ALIVE ────────────────────────── */
function forceVideoVisible() {
  const video = document.querySelector('.blob-background video');
  if (!video) return;
  video.style.setProperty('display', 'block', 'important');
  video.style.setProperty('visibility', 'visible', 'important');
  video.style.setProperty('opacity', '1', 'important');
  video.play().catch(() => {});
}

/* ─── TYPING EFFECT for hero title ───────────── */
function initTypingEffect() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const texts = [
    'Aspiring Cybersecurity Engineer',
    'SOC Analyst in Training',
    'Ethical Hacker',
    'Network Security Learner'
  ];

  let ti = 0, ci = 0, deleting = false;
  const caret = titleEl.querySelector('.caret');

  function type() {
    const current = texts[ti];
    // Get current text node (first child, not the caret)
    let textNode = titleEl.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
      textNode = document.createTextNode('');
      titleEl.insertBefore(textNode, caret);
    }

    if (!deleting) {
      textNode.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      textNode.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 55 : 80);
  }

  // Clear existing text and start
  titleEl.innerHTML = '';
  titleEl.appendChild(document.createTextNode(''));
  const newCaret = document.createElement('span');
  newCaret.className = 'caret';
  titleEl.appendChild(newCaret);
  setTimeout(type, 1000);
}

/* ─── TILT EFFECT on glass cards ─────────────── */
function initCardTilt() {
  const cards = document.querySelectorAll('.glass-card, .certification-card, .edu-card, .contact-info-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-5px) perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── GLITCH EFFECT on scroll hover ─────────── */
function initGlitchHover() {
  const glitchEls = document.querySelectorAll('.glitch');
  glitchEls.forEach(el => {
    const text = el.textContent.trim();
    el.setAttribute('data-text', text);
  });
}

/* ─── SECTION ENTRANCE NUMBERS ──────────────── */
function initSectionNums() {
  // Already placed in HTML, no JS needed
}

/* ─── INIT ALL ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  populateSkills();
  initLoader();
  initParticleCanvas();
  initCursor();
  initSmoothScrolling();
  initMobileNavigation();
  initScrollReveal();
  initTypingEffect();
  initGlitchHover();
  forceVideoVisible();
  // Delay tilt to allow DOM to settle
  setTimeout(initCardTilt, 600);
});

window.addEventListener('load', () => {
  forceVideoVisible();
});
