document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function showSection(sectionId) {
    sections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.add("active");
        section.setAttribute("tabindex", "0");
        section.setAttribute("aria-hidden", "false");
        section.focus();
      } else {
        section.classList.remove("active");
        section.setAttribute("tabindex", "-1");
        section.setAttribute("aria-hidden", "true");
      }
    });
  }

  function updateNavState(activeLink) {
    navLinks.forEach((link) => {
      if (link === activeLink) link.classList.add("active-link");
      else link.classList.remove("active-link");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      showSection(targetId);
      updateNavState(link);
      history.pushState(null, "", `#${targetId}`);
    });
  });

  showSection("home");
  updateNavState(navLinks[0]);

  const inviteSpeakerCheckbox = document.getElementById("inviteSpeaker");
  const eventDetailsContainer = document.getElementById(
    "eventDetailsContainer"
  );

  inviteSpeakerCheckbox.addEventListener("change", () => {
    eventDetailsContainer.style.display = inviteSpeakerCheckbox.checked
      ? "block"
      : "none";
  });

  const scheduleForm = document.getElementById("scheduleCallForm");
  const emailInput = document.getElementById("email");

  scheduleForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!emailInput.validity.valid) {
      emailInput.reportValidity();
      return;
    }
    document.getElementById("submissionModal").classList.add("active");
    scheduleForm.reset();
    eventDetailsContainer.style.display = "none";
  });

  document.querySelectorAll(".btn-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").classList.remove("active");
    });
  });

  document
    .getElementById("meet-empower-community")
    .addEventListener("click", () => {
      document.getElementById("communityModal").classList.add("active");
    });
});
