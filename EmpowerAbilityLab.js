// document.addEventListener("DOMContentLoaded", () => {
//   const sections = document.querySelectorAll("section");
//   const navLinks = document.querySelectorAll(".nav-link");

//   function showSection(sectionId) {
//     sections.forEach((section) => {
//       if (section.id === sectionId) {
//         section.classList.add("active");
//         section.setAttribute("tabindex", "0");
//         section.setAttribute("aria-hidden", "false");
//         section.focus();
//       } else {
//         section.classList.remove("active");
//         section.setAttribute("tabindex", "-1");
//         section.setAttribute("aria-hidden", "true");
//       }
//     });
//   }

//   function updateNavState(activeLink) {
//     navLinks.forEach((link) => {
//       if (link === activeLink) link.classList.add("active-link");
//       else link.classList.remove("active-link");
//     });
//   }

//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const targetId = link.getAttribute("href").substring(1);
//       showSection(targetId);
//       updateNavState(link);
//       history.pushState(null, "", `#${targetId}`);
//     });
//   });

//   showSection("home");
//   updateNavState(navLinks[0]);

//   const inviteSpeakerCheckbox = document.getElementById("inviteSpeaker");
//   const eventDetailsContainer = document.getElementById(
//     "eventDetailsContainer"
//   );

//   inviteSpeakerCheckbox.addEventListener("change", () => {
//     eventDetailsContainer.style.display = inviteSpeakerCheckbox.checked
//       ? "block"
//       : "none";
//   });

//   const scheduleForm = document.getElementById("scheduleCallForm");
//   const emailInput = document.getElementById("email");

//   scheduleForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     if (!emailInput.validity.valid) {
//       emailInput.reportValidity();
//       return;
//     }
//     document.getElementById("submissionModal").classList.add("active");
//     scheduleForm.reset();
//     eventDetailsContainer.style.display = "none";
//   });

//   document.querySelectorAll(".btn-close").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       btn.closest(".modal").classList.remove("active");
//     });
//   });

//   document
//     .getElementById("meet-empower-community")
//     .addEventListener("click", () => {
//       document.getElementById("communityModal").classList.add("active");
//     });
// });
// Wait until the DOM is fully loaded before running script
document.addEventListener("DOMContentLoaded", () => {
  // Select all page sections
  const sections = document.querySelectorAll("section");

  // Select all navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile navigation menu container
  const navMenu = document.getElementById("mainNavigation");

  // Mobile hamburger button
  const navToggle = document.querySelector(".navbar-toggler");

  // ---------------------------
  // Show/Hide Sections Function
  // ---------------------------
  function showSection(sectionId) {
    sections.forEach((section) => {
      if (section.id === sectionId) {
        // Show selected section
        section.classList.add("active");
        section.setAttribute("tabindex", "0");
        section.setAttribute("aria-hidden", "false");
        section.focus(); // move focus for accessibility
      } else {
        // Hide all other sections
        section.classList.remove("active");
        section.setAttribute("tabindex", "-1");
        section.setAttribute("aria-hidden", "true");
      }
    });
  }

  // ---------------------------
  // Highlight Active Nav Link
  // ---------------------------
  function updateNavState(activeLink) {
    navLinks.forEach((link) => {
      if (link === activeLink) link.classList.add("active-link");
      else link.classList.remove("active-link");
    });
  }

  // ---------------------------
  // Nav Link Click Events
  // ---------------------------
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Get target section id (remove "#")
      const targetId = link.getAttribute("href").substring(1);

      // Switch visible section
      showSection(targetId);

      // Update active link styling
      updateNavState(link);

      // Handle browser Back/Forward buttons
      window.addEventListener("popstate", () => {
        
        // Get the current hash or default to "home"
        const hash = window.location.hash.substring(1) || "home";

        // Find the corresponding nav link
        const link = document.querySelector(`.nav-link[href="#${hash}"]`);

        // Show the section and update nav highlighting
        showSection(hash);
        updateNavState(link);
      });

      // Update URL hash for navigation
      history.pushState(null, "", `#${targetId}`);

      // Close the mobile nav when a link is clicked
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Default page load → show the Home section
  showSection("home");
  updateNavState(navLinks[0]);

  // ---------------------------
  // Mobile Navigation Toggle
  // ---------------------------
  navToggle.addEventListener("click", () => {
    // Toggle the "open" class on menu
    const isOpen = navMenu.classList.toggle("open");

    // Update aria-expanded for screen readers
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // ---------------------------
  // Invite Speaker Checkbox Toggle
  // ---------------------------
  const inviteSpeakerCheckbox = document.getElementById("inviteSpeaker");
  const eventDetailsContainer = document.getElementById(
    "eventDetailsContainer"
  );

  inviteSpeakerCheckbox.addEventListener("change", () => {
    // Show/hide additional form fields when user toggles invitation option
    eventDetailsContainer.style.display = inviteSpeakerCheckbox.checked
      ? "block"
      : "none";
  });

  // ---------------------------
  // Form Submission Handling
  // ---------------------------
  const scheduleForm = document.getElementById("scheduleCallForm");
  const emailInput = document.getElementById("email");

  scheduleForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate email before submitting form
    if (!emailInput.validity.valid) {
      emailInput.reportValidity();
      return;
    }

    // Show submission confirmation modal
    document.getElementById("submissionModal").classList.add("active");

    // Reset form inputs
    scheduleForm.reset();

    // Hide speaker invitation section after reset
    eventDetailsContainer.style.display = "none";
  });

  // ---------------------------
  // Close Modal Buttons
  // ---------------------------
  document.querySelectorAll(".btn-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Close the modal that the close button belongs to
      btn.closest(".modal").classList.remove("active");
    });
  });

  // ---------------------------
  // Open Community Modal
  // ---------------------------
  document
    .getElementById("meet-empower-community")
    .addEventListener("click", () => {
      document.getElementById("communityModal").classList.add("active");
    });
});
