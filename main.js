/**
 * Shivani Ravi Portfolio - Interactive Behaviors
 * Handles Night Mode Toggle with CSS Media Query Detection,
 * Mobile Navigation, Scrollspy, and dynamic year.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================
  // 1. NIGHT MODE TOGGLE WITH CSS MEDIA QUERY DETECTION
  // ========================================================
  const headerThemeToggle = document.getElementById('theme-toggle');
  const heroThemeToggle = document.getElementById('hero-theme-toggle');
  const themeIndicator = document.getElementById('theme-detected-mode');
  const htmlRoot = document.documentElement;

  // Media Query matcher for default browser/system theme
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Function to determine currently active theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      return { theme: savedTheme, source: 'MANUAL' };
    }
    // If no manual preference is saved, detect via CSS media query
    const systemTheme = systemPrefersDark.matches ? 'dark' : 'light';
    return { theme: systemTheme, source: 'MEDIA_QUERY' };
  };

  // Update DOM and indicators according to theme
  const applyTheme = (theme, source) => {
    htmlRoot.setAttribute('data-theme', theme);
    
    // Update the hero theme detector sensor label
    if (themeIndicator) {
      if (source === 'MEDIA_QUERY') {
        themeIndicator.textContent = `Media Query: ${theme === 'dark' ? 'Dark Mode' : 'Light Mode'}`;
      } else {
        themeIndicator.textContent = `Manual Override: ${theme === 'dark' ? 'Dark Mode' : 'Light Mode'}`;
      }
    }

    // Update Hero Toggle Button Text/Icon
    if (heroThemeToggle) {
      const toggleLabel = heroThemeToggle.querySelector('.theme-btn-label');
      const toggleIcon = heroThemeToggle.querySelector('.theme-btn-icon');
      if (toggleLabel) {
        toggleLabel.textContent = theme === 'dark' ? 'Switch to Day' : 'Switch to Night';
      }
      if (toggleIcon) {
        toggleIcon.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      }
    }

    // Update Header Toggle Aria Label
    if (headerThemeToggle) {
      headerThemeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Night'} Mode`);
    }
  };

  // Initial Theme Application
  const initial = getInitialTheme();
  applyTheme(initial.theme, initial.source);

  // Toggle Functionality
  const toggleTheme = () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || (systemPrefersDark.matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Save user choice in localStorage
    localStorage.setItem('portfolio-theme', newTheme);
    applyTheme(newTheme, 'MANUAL');
  };

  if (headerThemeToggle) {
    headerThemeToggle.addEventListener('click', toggleTheme);
  }

  if (heroThemeToggle) {
    heroThemeToggle.addEventListener('click', toggleTheme);
  }

  // React dynamically to system/browser theme changes if user hasn't overridden manually
  systemPrefersDark.addEventListener('change', (e) => {
    const hasManualPreference = localStorage.getItem('portfolio-theme');
    if (!hasManualPreference) {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      applyTheme(newSystemTheme, 'MEDIA_QUERY');
    }
  });

  // ========================================================
  // 2. MOBILE NAVIGATION MENU
  // ========================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ========================================================
  // 3. ACTIVE NAV LINK ON SCROLL (SCROLLSPY)
  // ========================================================
  const sections = document.querySelectorAll('section[id]');
  
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingNavLink = document.querySelector(`.main-nav a[href*="${sectionId}"]`);

      if (matchingNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // ========================================================
  // 4. FOOTER CURRENT YEAR
  // ========================================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
