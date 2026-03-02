/* ======================
   DATA E HORA
====================== */
function atualizarDataHora() {
  const agora = new Date();
  const elData = document.getElementById("dataHora");
  if(elData) elData.innerText =
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
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      const cidade = data.address.city || data.address.town || data.address.village || data.address.county || "Desconhecido";
      const cidadeEl = document.getElementById("cidade");
      if(cidadeEl) cidadeEl.innerText = cidade;
    } catch(e) {
      console.error("Erro ao obter cidade:", e);
    }
  });
}

/* ======================
   APPS CONFIG
====================== */
const apps = {
  instagram: { nome:"Instagram", app:"instagram://", web:"https://www.instagram.com", store:"https://play.google.com/store/apps/details?id=com.instagram.android" },
  tiktok:    { nome:"TikTok",    app:"tiktok://",    web:"https://www.tiktok.com", store:"https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically" },
  threads:   { nome:"Threads",   app:"threads://",   web:"https://www.threads.net", store:"https://play.google.com/store/apps/details?id=com.instagram.barcelona" },
  whatsapp:  { nome:"WhatsApp",  app:"whatsapp://",  web:"https://web.whatsapp.com", store:"https://play.google.com/store/apps/details?id=com.whatsapp" },
  telegram:  { nome:"Telegram",  app:"tg://",        web:"https://web.telegram.org", store:"https://play.google.com/store/apps/details?id=org.telegram.messenger" },
  youtube:   { nome:"YouTube",   app:"youtube://",   web:"https://www.youtube.com", store:"https://play.google.com/store/apps/details?id=com.google.android.youtube" }
};

/* ======================
   ABRIR APP COM MODAL DINÂMICO
====================== */
function abrirApp(social) {
  let abriu = false;
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = social.app;
  document.body.appendChild(iframe);

  const timeout = setTimeout(() => {
    if (!abriu) mostrarModal(social);
  }, 1200);

  window.addEventListener("blur", () => {
    abriu = true;
    clearTimeout(timeout);
  }, { once: true });
}

function mostrarModal(social) {
  // criar modal dinamicamente
  const modal = document.createElement("div");
  modal.id = "modalApp";
  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.background = "rgba(0,0,0,0.6)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "999";

  const box = document.createElement("div");
  box.style.background = "#020617";
  box.style.padding = "20px";
  box.style.borderRadius = "16px";
  box.style.width = "90%";
  box.style.maxWidth = "320px";
  box.style.textAlign = "center";

  const h3 = document.createElement("h3");
  h3.innerText = "App não instalada";

  const p = document.createElement("p");
  p.innerText = "Como queres continuar?";

  const btnGrid = document.createElement("div");
  btnGrid.style.display = "grid";
  btnGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
  btnGrid.style.gap = "10px";
  btnGrid.style.marginTop = "10px";

  const btnPlayStore = document.createElement("button");
  btnPlayStore.innerText = "Play Store";
  btnPlayStore.onclick = () => {
    document.body.removeChild(modal); // remove modal antes de redirecionar
    window.location.href = social.store;
  };

  const btnBrowser = document.createElement("button");
  btnBrowser.innerText = "Browser";
  btnBrowser.onclick = () => {
    document.body.removeChild(modal); // remove modal antes de redirecionar
    window.location.href = social.web;
  };

  btnGrid.appendChild(btnPlayStore);
  btnGrid.appendChild(btnBrowser);
  box.appendChild(h3);
  box.appendChild(p);
  box.appendChild(btnGrid);
  modal.appendChild(box);
  document.body.appendChild(modal);
}

/* ======================
   CATEGORIAS (placeholder)
====================== */
function abrirCategoria(cat) {
  alert("Categoria: " + cat);
}
