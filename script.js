// script.js
// Tugmalarga bosilganda tegishli GitHub profilini yangi oynada ochadi.

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const url = btn.getAttribute("data-url");
    if (!url) {
      alert("Iltimos, tugma uchun data-url atributiga GitHub link yozing.");
      return;
    }
    // yangi tabda ochish
    window.open(url, "_blank", "noopener,noreferrer");
  });
});
