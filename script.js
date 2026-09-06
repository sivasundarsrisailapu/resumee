document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggle');
  const body = document.body;
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  // ==========================================
  // SAVE MODE / THEME PERSISTENCE (localStorage)
  // ==========================================
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
  }

  // Toggle Theme & Save Choice
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
      }
    });
  }

  // ==========================================
  // MOBILE HAMBURGER MENU TOGGLE
  // ==========================================
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close Mobile Menu when clicking a nav item
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-only-cta');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburgerBtn && navMenu) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // ==========================================
  // ACTIVE LINK HIGHLIGHT ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 180;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ==========================================
  // SERVICES ACCORDION INTERACTIVITY
  // ==========================================
  const serviceCards = document.querySelectorAll('.service-card');
  const prevBtn = document.querySelector('.prev-service');
  const nextBtn = document.querySelector('.next-service');
  let activeIndex = 1;

  function setActiveCard(index) {
    serviceCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
    activeIndex = index;
  }

  serviceCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      setActiveCard(index);
    });
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = activeIndex - 1;
      if (newIndex < 0) newIndex = serviceCards.length - 1;
      setActiveCard(newIndex);
    });

    nextBtn.addEventListener('click', () => {
      let newIndex = activeIndex + 1;
      if (newIndex >= serviceCards.length) newIndex = 0;
      setActiveCard(newIndex);
    });
  }

  // ==========================================
  // PROJECTS FOLDER HORIZONTAL SLIDER CONTROLS
  // ==========================================
  const projPrevBtn = document.getElementById('projPrevBtn');
  const projNextBtn = document.getElementById('projNextBtn');
  const projectsFolderGrid = document.getElementById('projectsFolderGrid');

  if (projPrevBtn && projNextBtn && projectsFolderGrid) {
    projPrevBtn.addEventListener('click', () => {
      projectsFolderGrid.scrollBy({ left: -220, behavior: 'smooth' });
    });

    projNextBtn.addEventListener('click', () => {
      projectsFolderGrid.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }

});
