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
   ABRIR APP COM MODAL FIXO
====================== */
function abrirApp(social) {
  let abriu = false;
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = social.app;
  document.body.appendChild(iframe);

  const timeout = setTimeout(() => {
    if (!abriu) ativarModal(social);
  }, 1200);

  window.addEventListener("blur", () => {
    abriu = true;
    desativarModal();
    clearTimeout(timeout);
  }, { once: true });
}

/* ======================
   ATIVAR / DESATIVAR MODAL
====================== */
function ativarModal(social) {
  const modal = document.getElementById("modalApp");
  modal.classList.remove("modal-inativo");

  // configurar botões
  document.getElementById("btnPlayStore").onclick = () => { desativarModal(); window.location.href = social.store; };
  document.getElementById("btnBrowser").onclick = () => { desativarModal(); window.location.href = social.web; };
}

function desativarModal() {
  const modal = document.getElementById("modalApp");
  modal.classList.add("modal-inativo");
}

/* ======================
   CATEGORIAS (placeholder)
====================== */
function abrirCategoria(cat) {
  alert("Categoria: " + cat);
}
