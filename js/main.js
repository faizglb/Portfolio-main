/* =========================================================
   MOHD FAIZ — PORTFOLIO JS
   ========================================================= */

// Tech stack — logo paths fixed to match actual case-sensitive
// filenames in /TS Logo (several were broken/mismatched before).
const techStack = {
  'programming-languages': [
    { name: 'Python', image: 'TS Logo/PYTHON.png' },
    { name: 'C#', image: 'TS Logo/Csharp.png' },
    { name: 'Java', image: 'TS Logo/JAVA.png' },
    { name: 'JavaScript', image: 'TS Logo/JAVASCRIPT.png' },
    { name: 'TypeScript', image: 'TS Logo/TYPESCRIPT.png' },
    { name: 'Bash', image: 'TS Logo/Bash.png' }
  ],
  'web-technologies': [
    { name: 'HTML5', image: 'TS Logo/HTML5.png' },
    { name: 'CSS3', image: 'TS Logo/CSS3.png' },
    { name: 'React.js', image: 'TS Logo/REACT.png' },
    { name: 'Node.js', image: 'TS Logo/NODEJS.png' },
    { name: 'Express.js', image: 'TS Logo/EXPRESSJS.png' }
  ],
  'databases': [
    { name: 'MySQL', image: 'TS Logo/MYSQL.png' },
    { name: 'MongoDB', image: 'TS Logo/MONGODB.png' },
    { name: 'Supabase', image: 'TS Logo/supabase.png' },
    { name: 'Firebase', image: 'TS Logo/fiebase.png' }
  ],
  'dev-tools': [
    { name: 'GitHub', image: 'TS Logo/GITHUB.png' },
    { name: 'Docker', image: 'TS Logo/DOCKER.png' },
    { name: 'Flutter', image: 'TS Logo/flutter.png' },
    { name: 'VS Code', image: 'TS Logo/VScode.png' },
    { name: 'Spring Boot', image: 'TS Logo/Springboot.png' },
    { name: 'Kali Linux', image: 'TS Logo/kali linux.png' }
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

/* ---------- loading screen ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 350);
});

/* ---------- mobile nav ---------- */
function toggleMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  const hamburger = document.querySelector('.hamburger');
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

/* ---------- email ---------- */
function openEmail(event) {
  event.preventDefault();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = 'mailto:mdfaiz0871@gmail.com';
  } else {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mdfaiz0871@gmail.com', '_blank');
  }
}

/* ---------- certificates ---------- */
function viewCertificate(certificateId) {
  const certificateUrls = {
    'red-hat-linux-fundamentals': 'Certificates/red hat linux fundamentals.pdf',
    'red-hat-system-administration-1': 'Certificates/red hat administration 1.pdf',
    'red-hat-system-administration-2': 'Certificates/red hat administartion 2.pdf',
    'ccna-introduction-to-networks': 'Certificates/CCNA-_Introduction_to_Networks_certificate.pdf',
    'aws-cloud-foundations': 'Certificates/AWS_Academy_Graduate___Cloud_Foundations.pdf',
    'cybersecurity-foundation': 'Certificates/Cybersecurity_Foundation.pdf',
    'cisco-final-certificate': 'Certificates/cisco final certificate.pdf',
    'cisco-netacad-rider-certificate': 'Certificates/Cisco netacad rider certificate.pdf',
    'network-security-fundamentals': 'Certificates/Network_Security_Fundamentals.pdf',
    'cloud-security-fundamentals': 'Certificates/Cloud_Security_Fundamentals.pdf',
    'cloud-security-automation': 'Certificates/_Cloud_Security_Automation.pdf',
    'security-operations-fundamentals': 'Certificates/Security_Operations_Fundamentals.pdf',
    'security-operations-configurations': 'Certificates/Security_Operations_Configuration.pdf'
  };
  const url = certificateUrls[String(certificateId || '').trim()];
  if (url) {
    window.open(url + '#zoom=80&toolbar=0&navpanes=0', '_blank');
  } else {
    alert('This certificate file is being added to the Certificates folder.');
  }
}

/* ---------- smooth scroll + active nav ---------- */
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link, .hero-contact-btn');
  const nav = document.getElementById('nav');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;
      const navHeight = nav ? nav.offsetHeight : 70;
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 10;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  const sections = document.querySelectorAll('.section, .hero-section');
  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 160;
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

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavigation, 10);
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
        }, 300);
      }
    });
  });
}

/* ---------- scroll reveal ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(t => observer.observe(t));
}

/* ---------- video keep-alive ---------- */
function forceVideoVisible() {
  const video = document.querySelector('.blob-background video');
  if (!video) return;
  video.style.setProperty('display', 'block', 'important');
  video.style.setProperty('visibility', 'visible', 'important');
  video.style.setProperty('opacity', '1', 'important');
  video.play().catch(() => {});
}

document.addEventListener('DOMContentLoaded', function () {
  populateSkills();
  initSmoothScrolling();
  initMobileNavigation();
  initScrollReveal();
  forceVideoVisible();
});
window.addEventListener('load', forceVideoVisible);

document.querySelector('.resume-btn')?.addEventListener('click', () => {
  // Wire this up to your resume link once uploaded.
});
