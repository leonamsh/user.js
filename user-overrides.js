/*
############################################################
#  user-overrides.js (para arkenfox)
#  Arquivo de overrides focado em: desempenho + compatibilidade com IA
#  Cole em: ~/.mozilla/firefox/<perfil>/user-overrides.js
############################################################
*/

/*
  PERFIL: Leo — Chat/IA + Dev + privacidade equilibrada
  Filosofia: manter o baseline de segurança do arkenfox, mas
  relaxar pontos que costumam quebrar UI/perf (RFP/letterboxing) e
  ativar aceleração/perf para páginas com DOM pesado (ChatGPT, etc.).
*/

// ===== Compatibilidade geral (evitar quebras visuais e de UI) =====
// Resist Fingerprinting (RFP) é poderoso, mas quebra layout/medidas e inputs em apps web.
user_pref("privacy.resistFingerprinting", false);
user_pref("privacy.resistFingerprinting.letterboxing", false);
// Permite eventos de área de transferência (copiar/colar mais suave em apps web)
user_pref("dom.event.clipboardevents.enabled", true);

// ===== Desempenho em páginas pesadas =====
// Aceleração de hardware
user_pref("gfx.webrender.all", true);
user_pref("layers.acceleration.force-enabled", true);
// Decodificação de vídeo via GPU
user_pref("media.hardware-video-decoding.enabled", true);
// Mais processos de conteúdo (paralelismo em abas)
user_pref("dom.ipc.processCount", 8);
// Descarrega abas ao faltar memória
user_pref("browser.tabs.unloadOnLowMemory", true);
// Reduz I/O do salvamento de sessão (menos travadinhas em SSDs): 30 minutos
user_pref("browser.sessionstore.interval", 1800000);
// (Opcional) Cache em disco desligado se seu SSD já for rápido
// user_pref("browser.cache.disk.enable", false);

// ===== Qualidade de vida =====
// Desativa letterboxing (já feito acima), mantém zoom e janelas normais
// Permite WebGL (alguns front-ends 3D/UIs modernas precisam)
user_pref("webgl.disabled", false);
// Mantém preenchimento automático sem logar em tudo pela conta
user_pref("signon.rememberSignons", true);
// Mantém site isolation moderno sem exagero
user_pref("fission.autostart", true);

// ===== Busca e DNS (equilíbrio) =====
// Você pode manter Google como fallback e usar DuckDuckGo/Brave Search como padrão no UI
// DoH opcional via políticas.json (abaixo). Aqui, não forçamos para evitar conflitos com rede corporativa.

// ===== Telemetria/estudos (complementado por policies.json) =====
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("app.shield.optoutstudies.enabled", false);

// ===== Dev/Trabalho =====
// DevTools e copiar/colar amplo sem fricção
user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.remote-enabled", false);

// ===== IA/Chats longos =====
// Mantém recursos de texto longo mais estáveis (GC e dom perf são internos; aqui preferimos reduzir trocas de abas)
// Dica operacional: evite dezenas de abas abertas do mesmo chat; use OneTab/Auto Tab Discard.

/***************************************************************************************** */
/* 2810: enable Firefox to clear items on shutdown
 * [NOTE] In FF129+ clearing "siteSettings" on shutdown (2811+), or manually via site data (2820+) and
 * via history (2830), will no longer remove sanitize on shutdown "cookie and site data" site exceptions (2815)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes | Settings ***/
user_pref("privacy.sanitize.sanitizeOnShutdown", false);
/***************************************************************************************** */
/** SANITIZE ON SHUTDOWN: RESPECTS "ALLOW" SITE EXCEPTIONS ***/
/* 2815: set "Cookies" and "Site Data" to clear on shutdown (if 2810 is true) [SETUP-CHROME] [FF128+]
 * [NOTE] Exceptions: For cross-domain logins, add exceptions for both sites
 * e.g. https://www.youtube.com (site) + https://accounts.google.com (single sign on)
 * [WARNING] Be selective with what sites you "Allow", as they also disable partitioning (1767271)
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Cookies>Allow (when on the website in question)
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Settings ***/
user_pref("privacy.clearOnShutdown_v2.cookiesAndStorage", false);
/***************************************************************************************** */
/* 1003: disable storing extra session data [SETUP-CHROME]
 * define on which sites to save extra session data such as form content, cookies and POST data
 * 0=everywhere, 1=unencrypted sites, 2=nowhere ***/
// user_pref("browser.sessionstore.privacy_level", 0);
/***************************************************************************************** */
/* 0102: set startup page [SETUP-CHROME]
 * 0=blank, 1=home, 2=last visited page, 3=resume previous session
 * [NOTE] Session Restore is cleared with history (2811+), and not used in Private Browsing mode
 * [SETTING] General>Startup>Restore previous session ***/
user_pref("browser.startup.page", 1);
/* 0103: set HOME+NEWWINDOW page
 * about:home=Firefox Home (default, see 0105), custom URL, about:blank
 * [SETTING] Home>New Windows and Tabs>Homepage and new windows ***/
user_pref("browser.startup.homepage", "https://web.tabliss.io/");
