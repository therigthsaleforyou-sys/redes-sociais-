/* ======================
   DATA E HORA
====================== */
function atualizarDataHora() {
  const agora = new Date();
  const el = document.getElementById("dataHora");
  if (el) {
    el.innerText =
      agora.toLocaleDateString("pt-PT") + " " +
      agora.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
  }
}
setInterval(atualizarDataHora, 1000);
atualizarDataHora();

/* ======================
   LOCALIZAÇÃO (SÓ CIDADE)
====================== */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async pos => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
      );
      const data = await res.json();
      const cidade =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        "";
      const el = document.getElementById("cidade");
      if (el) el.innerText = cidade;
    } catch {}
  });
}

/* ======================
   APPS
====================== */
const apps = {
  instagram: {
    id: "instagram",
    app: "instagram://",
    web: "https://www.instagram.com",
    store: "https://play.google.com/store/apps/details?id=com.instagram.android"
  },
  tiktok: {
    id: "tiktok",
    app: "tiktok://",
    web: "https://www.tiktok.com",
    store: "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically"
  },
  threads: {
    id: "threads",
    app: "threads://",
    web: "https://www.threads.net",
    store: "https://play.google.com/store/apps/details?id=com.instagram.barcelona"
  },
  whatsapp: {
    id: "whatsapp",
    app: "whatsapp://",
    web: "https://web.whatsapp.com",
    store: "https://play.google.com/store/apps/details?id=com.whatsapp"
  }
};

/* ======================
   ABRIR APP
====================== */
function abrirApp(social) {
  const pref = localStorage.getItem("pref_" + social.id);
  let abriu = false;

  // tenta abrir a app
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = social.app;
  document.body.appendChild(iframe);

  const timer = setTimeout(() => {
    if (abriu) return;

    // preferência já existe → NÃO mostra modal
    if (pref === "browser") {
      window.location.href = social.web;
      return;
    }
    if (pref === "store") {
      window.location.href = social.store;
      return;
    }

    // sem preferência → mostra modal
    ativarModal(social);
  }, 1200);

  window.addEventListener(
    "blur",
    () => {
      abriu = true;
      clearTimeout(timer);
      desativarModal();
    },
    { once: true }
  );
}

/* ======================
   MODAL
====================== */
function ativarModal(social) {
  const modal = document.getElementById("modalApp");
  modal.classList.remove("modal-inativo");

  document.getElementById("btnBrowser").onclick = () => {
    localStorage.setItem("pref_" + social.id, "browser");
    desativarModal();
    setTimeout(() => {
      window.location.href = social.web;
    }, 150);
  };

  document.getElementById("btnPlayStore").onclick = () => {
    localStorage.setItem("pref_" + social.id, "store");
    desativarModal();
    setTimeout(() => {
      window.location.href = social.store;
    }, 150);
  };
}

function desativarModal() {
  const modal = document.getElementById("modalApp");
  modal.classList.add("modal-inativo");
}
