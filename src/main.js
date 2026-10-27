import './style.css';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

// Mobile navigation
if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isExpanded =
      menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute(
      'aria-label',
      isExpanded ? 'Open navigation' : 'Close navigation'
    );

    navigation.classList.toggle('is-open', !isExpanded);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    });
  });
}

// Update the highlighted navigation link
function setActiveLink(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${sectionId}`;

    link.classList.toggle('active', isActive);
  });
}

// Highlight the clicked section immediately
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const sectionId = link.getAttribute('href').slice(1);
    setActiveLink(sectionId);
  });
});

// Update the highlight while scrolling
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (a, b) =>
          b.intersectionRatio - a.intersectionRatio
      );

    if (visibleSections.length > 0) {
      setActiveLink(visibleSections[0].target.id);
    }
  },
  {
    rootMargin: '-20% 0px -60% 0px',
    threshold: [0, 0.1, 0.25, 0.5, 0.75],
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
