import "./style.css";
import {
  createIcons,
  House,
  UserRound,
  Code2,
  FolderGit2,
  BriefcaseBusiness,
  Mail,
  ArrowUpRight,
  Orbit,
  Monitor,
  Database,
  Wrench,  
  IdCard,
  CalendarCheck
} from "lucide";

createIcons({
  icons: {
    House,
    UserRound,
    Code2,
    FolderGit2,
    BriefcaseBusiness,
    Mail,
    ArrowUpRight,
    Orbit,
    Monitor,
    Database,
    Wrench,
    IdCard,
    CalendarCheck
  },
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const orbit = document.querySelector("#hero-orbit");

if (orbit) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;

  orbit.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;

    orbit.setPointerCapture(event.pointerId);
    orbit.classList.add("cursor-grabbing");
    orbit.classList.remove("cursor-grab");
  });

  orbit.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;

    orbit.style.translate = `${offsetX}px ${offsetY}px`;
  });

  function stopDragging() {
    isDragging = false;
    orbit.classList.remove("cursor-grabbing");
    orbit.classList.add("cursor-grab");
  }

  orbit.addEventListener("pointerup", stopDragging);
  orbit.addEventListener("pointercancel", stopDragging);
  orbit.addEventListener("lostpointercapture", stopDragging);
}

// Mobile navigation: preserve the existing accessible toggle behavior.
if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    const nextExpanded = !isExpanded;

    menuToggle.setAttribute("aria-expanded", String(nextExpanded));
    menuToggle.setAttribute("aria-label", nextExpanded ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", nextExpanded);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    });
  });
}

function setActiveLink(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("href")?.slice(1);
    if (sectionId) setActiveLink(sectionId);
  });
});

// Scroll-based active navigation. Ignore links whose target section is not present yet.
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleSections.length > 0) setActiveLink(visibleSections[0].target.id);
  }, {
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0, 0.1, 0.25, 0.5, 0.75],
  });

  sections.forEach((section) => sectionObserver.observe(section));
}
