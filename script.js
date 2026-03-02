let currentLang = localStorage.getItem("lang") || "pt";

function applyLanguage() {
  const texts = LANG[currentLang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (texts[key]) el.innerText = texts[key];
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyLanguage();
  document.getElementById("langModal").classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();
});
