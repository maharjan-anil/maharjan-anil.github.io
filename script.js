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
