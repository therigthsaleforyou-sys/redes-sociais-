/* ======================
   DATA E HORA
====================== */
function atualizarDataHora() {
  const agora = new Date();
  document.getElementById("dataHora").innerText =
    agora.toLocaleDateString("pt-PT") + " " +
    agora.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}
setInterval(atualizarDataHora, 1000);
atualizarDataHora();

/* ======================
   LOCALIZAÇÃO (SÓ CIDADE)
====================== */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();

    const cidade =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "";

    document.getElementById("cidade").innerText = cidade;
  });
}

/* ======================
   CONFIG APPS
====================== */
const apps = {
  instagram: {
    scheme: "instagram://",
    web: "https://www.instagram.com",
    store: "https://play.google.com/store/apps/details?id=com.instagram.android"
  },
  tiktok: {
    scheme: "tiktok://",
    web: "https://www.tiktok.com",
    store: "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically"
  },
  threads: {
    scheme: "threads://",
    web: "https://www.threads.net",
    store: "https://play.google.com/store/apps/details?id=com.instagram.barcelona"
  }
};

let appAtual = null;

/* ======================
   ABRIR APP
====================== */
function abrirApp(nome) {
  appAtual = apps[nome];
  let abriu = false;

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = appAtual.scheme;
  document.body.appendChild(iframe);

  const timeout = setTimeout(() => {
    if (!abriu) {
      mostrarModal();
    }
  }, 1200);

  window.addEventListener("blur", () => {
    abriu = true;
    clearTimeout(timeout);
  }, { once: true });
}

/* ======================
   MODAL
====================== */
function mostrarModal() {
  document.getElementById("modal").classList.remove("hidden");

  document.getElementById("btnPlayStore").onclick = () => {
    window.location.href = appAtual.store;
  };

  document.getElementById("btnBrowser").onclick = () => {
    window.location.href = appAtual.web;
  };
}

/* ======================
   CATEGORIAS (placeholder)
====================== */
function abrirCategoria(cat) {
  alert("Categoria: " + cat);
}
