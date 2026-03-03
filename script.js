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
  whatsapp: {
    id: "whatsapp",
    app: "whatsapp://",
    web: "https://web.whatsapp.com",
    store: "https://play.google.com/store/apps/details?id=com.whatsapp"
  }
};

/* ======================
   ABRIR APP (EDGE SAFE)
====================== */
function abrirApp(social) {
  const pref =
    localStorage.getItem("pref_" + social.id) ||
    sessionStorage.getItem("pref_" + social.id);

  let abriu = false;

  // tenta abrir app
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = social.app;
  document.body.appendChild(iframe);

  const onVisibility = () => {
    if (document.hidden) {
      abriu = true;
      limpar();
    }
  };

  document.addEventListener("visibilitychange", onVisibility);

  const timer = setTimeout(() => {
    if (abriu) return;

    if (pref === "browser") {
      window.location.href = social.web;
      limpar();
      return;
    }

    if (pref === "store") {
      window.location.href = social.store;
      limpar();
      return;
    }

    ativarModal(social);
  }, 1500);

  function limpar() {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibility);
    desativarModal();
  }
}

/* ======================
   MODAL
====================== */
function ativarModal(social) {
  const modal = document.getElementById("modalApp");
  modal.classList.remove("modal-inativo");

  document.getElementById("btnBrowser").onclick = () => {
    sessionStorage.setItem("pref_" + social.id, "browser");
    localStorage.setItem("pref_" + social.id, "browser");
    desativarModal();
    setTimeout(() => {
      window.location.href = social.web;
    }, 200);
  };

  document.getElementById("btnPlayStore").onclick = () => {
    sessionStorage.setItem("pref_" + social.id, "store");
    localStorage.setItem("pref_" + social.id, "store");
    desativarModal();
    setTimeout(() => {
      window.location.href = social.store;
    }, 200);
  };
}

function desativarModal() {
  const modal = document.getElementById("modalApp");
  modal.classList.add("modal-inativo");
}
