// Keep the footer year current.
    document.getElementById("year").textContent = new Date().getFullYear();

    // Reveal sections gently as they enter the viewport.
    const revealItems = document.querySelectorAll(".fade-up");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach(item => observer.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add("visible"));
    }

    // Close the mobile navigation after a menu link is selected.
    document.querySelectorAll("#mainNav .nav-link, #mainNav .btn").forEach(link => {
      link.addEventListener("click", () => {
        const nav = document.getElementById("mainNav");
        if (nav.classList.contains("show") && window.bootstrap) {
          bootstrap.Collapse.getOrCreateInstance(nav).hide();
        }
      });
    });


// Light/dark theme toggle. Save the visitor's choice between visits.
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  if (themeColorMeta) themeColorMeta.setAttribute("content", isDark ? "#151813" : "#f7f7f2");
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("anil-journey-theme"); } catch (error) { /* Storage may be unavailable in some browsers. */ }
applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try { localStorage.setItem("anil-journey-theme", nextTheme); } catch (error) { /* Theme still works for this visit. */ }
});
