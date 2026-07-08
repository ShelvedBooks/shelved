// ════════════════════════════════════════════════════
//  ⚙  KONFIGURATION — hier deine Supabase-Zugangsdaten
// ════════════════════════════════════════════════════
const SUPABASE_URL  = 'https://hywlfmexyqcsorkmpesf.supabase.co';
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5d2xmbWV4eXFjc29ya21wZXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NzA2NjAsImV4cCI6MjA5NjQ0NjY2MH0.gx-zszcgn4LT8cGDaUFMFhh2pg-P_9AG1b25jo69GnA';

// Google Books API Key wurde entfernt (nicht mehr benötigt)

// Tabellennamen
const TABLE_BOOKS      = 'books';
const TABLE_AUTHORS    = 'authors';
const TABLE_BOOK_AUTH  = 'book_authors';
const TABLE_REVIEWS    = 'reviews';
const TABLE_USER_BOOKS = 'user_books';
const TABLE_PROFILES   = 'profiles';
// ════════════════════════════════════════════════════

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── I18N ─────────────────────────────────────────────
let currentLang = 'de';

// ── THEME (LIGHT/DARK) ────────────────────────────────
let currentTheme = 'light';
function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('shelved-theme'); } catch (e) { /* localStorage unavailable (e.g. sandboxed preview) */ }
  if (saved === 'light' || saved === 'dark') {
    currentTheme = saved;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = 'dark';
  }
  applyTheme();
}
function applyTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  const btn = document.getElementById('btn-theme');
  if (btn) {
    btn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    btn.title = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
}
function toggleMobileFilter() {
  const col = document.getElementById('sidebar-collapsible');
  const arrow = document.getElementById('mobile-filter-arrow');
  const btn = document.getElementById('mobile-filter-btn');
  const isOpen = col.classList.contains('expanded');
  col.classList.toggle('collapsed', isOpen);
  col.classList.toggle('expanded', !isOpen);
  arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
  btn.querySelector('span').textContent = isOpen ? '🔍 Filter anzeigen' : '🔍 Filter ausblenden';
}
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('shelved-theme', currentTheme); } catch (e) { /* ignore */ }
  applyTheme();
}
const I18N = {
  de: {
    loading: "Bücher werden geladen …",
    configTitle: "⚠ Supabase nicht konfiguriert",
    configBody: 'Öffne die Datei im Texteditor und ersetze <code>DEINE_SUPABASE_URL</code> und <code>DEIN_ANON_KEY</code> ganz oben im &lt;script&gt;-Block mit deinen echten Zugangsdaten aus dem Supabase Dashboard (Settings → API).',
    booksLive: "Bücher · Live",
    ratingsBtn: "Bewertungen",
    readlistBtn: "Leseliste",
    heroEyebrow: "Personalisierte Empfehlungen",
    heroTitle: "Dein nächstes<br><em>Lieblingsbuch</em><br>wartet.",
    heroSub: "Wähle Genres, Tropes und Autoren — über 7.000 kuratierte Bücher mit präziser Filterung nach Erzählmustern.",
    statBooks: "Bücher",
    statGenres: "Genres",
    statYears: "Jahre",
    filterTitle: "Filter",
    filterSub: "Genre → Tropes → Autor",
    genre: "Genre",
    clear: "Löschen",
    genreRomance: "Romantik",
    genreHistory: "Geschichte",
    genreBio: "Biografie",
    genreNonfiction: "Sachbuch",
    tropes: "Tropes",
    tropesTooltip: "Tropes sind wiederkehrende Erzählmuster, z.B. „Feinde werden zu Liebenden“ oder „Der Mentor stirbt“. Sie helfen, Bücher mit ähnlichem Erzählgefühl zu finden.",
    chooseGenreFirst: "Zuerst ein Genre wählen.",
    search: "Suche",
    searchPlaceholder: "Titel oder Autor …",
    author: "Autor",
    authorPlaceholder: "z.B. Jane Austen",
    period: "Zeitraum",
    yearFromPlaceholder: "Ab 1800",
    yearToPlaceholder: "Bis 2000",
    ctaDefault: "Empfehlungen anzeigen",
    ctaWithCount: "Empfehlungen anzeigen",
    resetAll: "Alle Filter zurücksetzen",
    resultsAllPrefix: "Alle",
    resultsBooks: "Bücher",
    resultsHits: "Treffer",
    sortLabel: "Sortierung",
    sortMatch: "Bester Match",
    sortAZ: "A – Z",
    sortNewest: "Neueste zuerst",
    sortOldest: "Älteste zuerst",
    prev: "Zurück",
    next: "Weiter",
    buyThalia: "Auf Open Library",
    reviews: "Rezensionen",
    yourRating: "Deine Bewertung",
    reviewPlaceholder: "Was hat dich an diesem Buch begeistert (oder nicht)?",
    namePlaceholder: "Dein Name (optional)",
    submit: "Absenden",
    authTitle: "Willkommen bei Shelved",
    authSub: "Melde dich an, um deine Leseliste und Rezensionen zu speichern.",
    login: "Anmelden",
    register: "Registrieren",
    emailPlaceholder: "E-Mail-Adresse",
    passwordPlaceholder: "Passwort",
    passwordRepeatPlaceholder: "Passwort wiederholen",
    myReadlist: "Meine Leseliste",
    importTitle: "Google-Daten importieren",
    importSubtitle: "Bewertungen & Beschreibungen für alle Bücher abrufen",
    importBody: 'Holt für jedes Buch Sternebewertung sowie Beschreibungstext auf Deutsch und Englisch von der <a href="https://books.google.com" target="_blank" style="color:var(--accent)">Google Books API</a> und speichert alles dauerhaft – einmal ausführen reicht, danach bleiben die Werte fest in der Datenbank. Da pro Buch zwei Sprachversionen abgefragt werden, dauert der Import etwas länger. Bei sehr vielen Büchern kann das Tageslimit der API erreicht werden; der Import pausiert dann automatisch und merkt sich den Fortschritt – einfach am nächsten Tag erneut "Import starten" klicken.',
    running: "Läuft…",
    startImport: "Import starten",
    cancel: "Abbrechen",
    dataLabel: "Daten",
    langBtn: "🌐 EN",
    loginTooltip: "Kostenloses Konto: Speichere deine Leseliste und Rezensionen dauerhaft.",
    importToolTip: "Google-Bewertungen & Beschreibungen importieren",
    readlistTooltip: "Meine Leseliste",
    shareTooltip: "Leseliste teilen",
    exportCsv: "Als CSV exportieren",
    exportPdf: "Als PDF exportieren",
    exportColTitle: "Titel",
    exportColAuthor: "Autor",
    exportColGenre: "Genre",
    exportColYear: "Jahr",
    exportColStatus: "Status",
    exportEmpty: "Deine Leseliste ist leer.",
    newTabTooltip: "Öffnet in einem neuen Tab",
    langSwitchTooltip: "Switch to English / Auf Deutsch umschalten",
    statusWillLesen: "Will lesen",
    statusLiest: "Lese gerade",
    statusGelesen: "Gelesen",
    allTab: "Alle",
    loggedInAs: "Angemeldet als",
    pleaseLoginReadlist: "Bitte anmelden, um deine Leseliste zu sehen.",
    loginToAddReadlist: "Anmelden, um zur Leseliste hinzuzufügen",
    reviewsEmpty: "Noch keine Rezensionen — schreib die erste!",
    reviewsEmptyLogin: "Melde dich an, um eine Rezension zu schreiben.",
    register: "Registrieren",
    quickAddTitle: "Zur Leseliste hinzufügen",
    firstPublished: "Erstausgabe",
    ratings: "Bewertungen",
    unknownAuthor: "Unbekannt",
    descFallback: (genre, author, year) => `Ein ${genre}-Werk von ${author || 'unbekanntem Autor'}${year > 0 ? ', erstmals erschienen ' + year : ''}.`,
    noBooksInCategory: "Keine Bücher in dieser Kategorie.",
    noBooksYet: "Noch keine Bücher auf deiner Liste.",
    thaliaShort: "Open Library",
    removed: "Entfernt.",
    undo: "Rückgängig",
    removedFromReadlist: "Von Leseliste entfernt.",
    addedToReadlist: "Zur Leseliste hinzugefügt",
    statusChanged: "Status geändert",
    importDone: "Import abgeschlossen.",
    allChecked: "Alle Bücher sind bereits geprüft.",
    dailyLimitReached: "⏸ Tageslimit erreicht. Morgen einfach erneut \"Import starten\" klicken.",
    dailyLimitToast: "⚠️ Google-Tageslimit erreicht. Fortschritt gespeichert – morgen weitermachen.",
    finished: "Fertig! ✅",
    cancelled: "Abgebrochen.",
    clickToRemove: "Klicken, um von der Leseliste zu entfernen",
    clickToRemoveCaption: "Status erneut anklicken, um das Buch von der Leseliste zu entfernen.",
    matchTooltip: "Basiert auf Übereinstimmung mit deiner Auswahl: Genre, Tropes, Autor und Suchbegriff.",
    matchTop: "✦ Top",
    matchMid: "Match",
    matchLow: "Ähnlich",
    removeTitle: "Entfernen",
  },
  en: {
    loading: "Loading books …",
    configTitle: "⚠ Supabase not configured",
    configBody: 'Open the file in a text editor and replace <code>DEINE_SUPABASE_URL</code> and <code>DEIN_ANON_KEY</code> at the top of the &lt;script&gt; block with your real credentials from the Supabase Dashboard (Settings → API).',
    booksLive: "Books · Live",
    ratingsBtn: "Ratings",
    readlistBtn: "Reading List",
    heroEyebrow: "Personalized Recommendations",
    heroTitle: "Your next<br><em>favorite book</em><br>is waiting.",
    heroSub: "Choose genres, tropes, and authors — over 7,000 curated books with precise filtering by narrative patterns.",
    statBooks: "Books",
    statGenres: "Genres",
    statYears: "Years",
    filterTitle: "Filters",
    filterSub: "Genre → Tropes → Author",
    genre: "Genre",
    clear: "Clear",
    genreRomance: "Romance",
    genreHistory: "History",
    genreBio: "Biography",
    genreNonfiction: "Non-fiction",
    tropes: "Tropes",
    tropesTooltip: "Tropes are recurring narrative patterns, e.g. \"enemies to lovers\" or \"the mentor dies\". They help you find books with a similar storytelling feel.",
    chooseGenreFirst: "Choose a genre first.",
    search: "Search",
    searchPlaceholder: "Title or author …",
    author: "Author",
    authorPlaceholder: "e.g. Jane Austen",
    period: "Time Period",
    yearFromPlaceholder: "From 1800",
    yearToPlaceholder: "To 2000",
    ctaDefault: "Show recommendations",
    ctaWithCount: "Show recommendations",
    resetAll: "Reset all filters",
    resultsAllPrefix: "All",
    resultsBooks: "Books",
    resultsHits: "results",
    sortLabel: "Sort by",
    sortMatch: "Best match",
    sortAZ: "A – Z",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    prev: "Back",
    next: "Next",
    buyThalia: "On Open Library",
    reviews: "Reviews",
    yourRating: "Your rating",
    reviewPlaceholder: "What did you love (or not) about this book?",
    namePlaceholder: "Your name (optional)",
    submit: "Submit",
    authTitle: "Welcome to Shelved",
    authSub: "Sign in to save your reading list and reviews.",
    login: "Sign in",
    register: "Register",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    passwordRepeatPlaceholder: "Repeat password",
    myReadlist: "My Reading List",
    importTitle: "Import Google data",
    importSubtitle: "Fetch ratings & descriptions for all books",
    importBody: 'Fetches a star rating plus a German and English description for every book from the <a href="https://books.google.com" target="_blank" style="color:var(--accent)">Google Books API</a> and saves everything permanently – run it once and the values stay in the database. Since two language versions are fetched per book, this takes a bit longer. For very large libraries the API\'s daily quota may be reached; the import then pauses automatically and remembers its progress – just click "Start import" again the next day.',
    running: "Running…",
    startImport: "Start import",
    cancel: "Cancel",
    dataLabel: "Data",
    anmelden: "Sign in",
    langBtn: "🌐 DE",
    loginTooltip: "Free account: save your reading list and reviews permanently.",
    importToolTip: "Import Google ratings & descriptions",
    readlistTooltip: "My reading list",
    shareTooltip: "Share reading list",
    exportCsv: "Export as CSV",
    exportPdf: "Export as PDF",
    exportColTitle: "Title",
    exportColAuthor: "Author",
    exportColGenre: "Genre",
    exportColYear: "Year",
    exportColStatus: "Status",
    exportEmpty: "Your reading list is empty.",
    newTabTooltip: "Opens in a new tab",
    langSwitchTooltip: "Switch to English / Auf Deutsch umschalten",
    statusWillLesen: "Want to read",
    statusLiest: "Currently reading",
    statusGelesen: "Read",
    allTab: "All",
    loggedInAs: "Signed in as",
    pleaseLoginReadlist: "Please sign in to see your reading list.",
    loginToAddReadlist: "Sign in to add to reading list",
    reviewsEmpty: "No reviews yet — write the first one!",
    reviewsEmptyLogin: "Sign in to write a review.",
    register: "Register",
    quickAddTitle: "Add to reading list",
    firstPublished: "First published",
    ratings: "ratings",
    unknownAuthor: "Unknown",
    descFallback: (genre, author, year) => `A ${genre} work by ${author || 'unknown author'}${year > 0 ? ', first published ' + year : ''}.`,
    noBooksInCategory: "No books in this category.",
    noBooksYet: "No books on your list yet.",
    thaliaShort: "Open Library",
    removed: "Removed.",
    undo: "Undo",
    removedFromReadlist: "Removed from reading list.",
    addedToReadlist: "Added to reading list",
    statusChanged: "Status changed",
    importDone: "Import finished.",
    allChecked: "All books have already been checked.",
    dailyLimitReached: "⏸ Daily limit reached. Just click \"Start import\" again tomorrow.",
    dailyLimitToast: "⚠️ Google's daily limit reached. Progress saved – continue tomorrow.",
    finished: "Done! ✅",
    cancelled: "Cancelled.",
    clickToRemove: "Click to remove from reading list",
    clickToRemoveCaption: "Click the status again to remove this book from your reading list.",
    matchTooltip: "Based on how well it matches your selection: genre, tropes, author, and search term.",
    matchTop: "✦ Top",
    matchMid: "Match",
    matchLow: "Similar",
    removeTitle: "Remove",
  }
};
function t(key) { return (I18N[currentLang] && I18N[currentLang][key]) || I18N.de[key] || key; }
function applyI18n() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });
  // Dynamic tooltips / titles that aren't plain data-i18n text nodes
  const langBtn = document.getElementById('btn-lang');
  if (langBtn) { langBtn.textContent = t('langBtn'); langBtn.title = t('langSwitchTooltip'); }
  const readlistBtn = document.getElementById('btn-readlist-header');
  if (readlistBtn) readlistBtn.title = t('readlistTooltip');
  const shareBtn = document.getElementById('btn-share-readlist');
  if (shareBtn) shareBtn.title = t('shareTooltip');
  const authBtn = document.getElementById('btn-auth');
  if (authBtn && !authBtn.classList.contains('logged-in')) {
    authBtn.title = t('loginTooltip');
    const authBtnText = document.getElementById('auth-btn-text');
    if (authBtnText) authBtnText.textContent = t('login');
  }
  document.querySelectorAll('a[title], button[title]').forEach(el => {
    if (el.title === 'Öffnet in einem neuen Tab' || el.title === 'Opens in a new tab') el.title = t('newTabTooltip');
  });
  // Auth submit button text follows active tab (login/register), not the static data-i18n value
  const activeTab = document.querySelector('.auth-tab.active');
  const submitBtn = document.getElementById('auth-submit');
  if (activeTab && submitBtn) submitBtn.textContent = activeTab.id === 'tab-login' ? t('login') : t('register');
  // Re-render dynamic content that contains translated strings
  if (typeof updTitle === 'function' && document.getElementById('results-title')) updTitle();
  if (typeof renderTropes === 'function') renderTropes();
  if (typeof renderGrid === 'function' && BOOKS.length) renderGrid();
  if (document.getElementById('readlist-overlay') && document.getElementById('readlist-overlay').classList.contains('open')) renderReadlistPanel();
}
function toggleLang() {
  currentLang = currentLang === 'de' ? 'en' : 'de';
  applyI18n();
  renderGrid();
  if (document.getElementById('readlist-overlay').classList.contains('open')) renderReadlistPanel();
  if (document.getElementById('overlay').classList.contains('open') && currentBookId) {
    const book = BOOKS.find(b => b.o === currentBookId);
    if (book) {
      const desc = getBookDescription(book);
      const descLang = getBookDescriptionLang(book);
      document.getElementById('m-desc').textContent = desc
        ? desc
        : t('descFallback')(genreLabel(book.g), book.a[0], book.y);
      document.getElementById('m-genre').textContent = genreLabel(book.g);
      const descHint = document.getElementById('m-desc-lang-hint');
      if (descHint) {
        if (desc && descLang && descLang !== currentLang) {
          descHint.textContent = currentLang === 'en' ? 'Description only available in German.' : 'Beschreibung nur auf Englisch verfügbar.';
          descHint.style.display = '';
        } else {
          descHint.style.display = 'none';
        }
      }
    }
  }
}

// ── GLOBALS ──────────────────────────────────────────
let BOOKS = [];
let currentUser = null;
let userReadlist = new Map(); // book_id (string) -> status
let pendingReadlistAction = null; // { bookId, status } – applied after login
let pendingSharedToken = null; // share token to open after login
let readlistFilter = 'all';
const READLIST_STATUS_META = {
  will_lesen: { key: 'statusWillLesen', icon: '📌', color: '#6366f1' },
  liest:      { key: 'statusLiest',     icon: '📖', color: '#f59e0b' },
  gelesen:    { key: 'statusGelesen',   icon: '✅', color: '#10b981' }
};
function getReadlistStatuses() {
  const out = {};
  for (const k in READLIST_STATUS_META) {
    out[k] = { label: t(READLIST_STATUS_META[k].key), icon: READLIST_STATUS_META[k].icon, color: READLIST_STATUS_META[k].color };
  }
  return out;
}
const READLIST_STATUS_ORDER = ['will_lesen', 'liest', 'gelesen'];
let reviewsCache = {};

const G2T = {'Romantik':'Romance','Thriller':'Thriller','Horror':'Horror','Fantasy':'Fantasy','Science-Fiction':'Science-Fiction','Geschichte':'Historischer Roman','Biografie':'Historischer Roman','Sachbuch':'Sachbuch'};
// Mapping von rohem Genre-Wert (DB) auf den passenden i18n-Key, falls eine Übersetzung existiert.
const GENRE_I18N_KEY = {
  'Romantik': 'genreRomance',
  'Geschichte': 'genreHistory',
  'Biografie': 'genreBio',
  'Sachbuch': 'genreNonfiction'
};
// Liefert das Genre in der aktuell aktiven Sprache (fällt auf den Originalwert zurück,
// wenn keine Übersetzung hinterlegt ist, z.B. bei Fantasy/Thriller/Horror/Sci-Fi).
function genreLabel(genre) {
  const key = GENRE_I18N_KEY[genre];
  return key ? t(key) : genre;
}
// Liefert die Buchbeschreibung passend zur aktuell aktiven Sprache. Fällt auf die jeweils
// andere Sprache zurück, falls für die aktive Sprache keine Beschreibung vorhanden ist.
function getBookDescription(book) {
  if (currentLang === 'en') return book.descEn || book.descDe || null;
  return book.descDe || book.descEn || null;
}
function getBookDescriptionLang(book) {
  // Returns which language the description is actually in
  if (currentLang === 'en') return book.descEn ? 'en' : (book.descDe ? 'de' : null);
  return book.descDe ? 'de' : (book.descEn ? 'en' : null);
}
const TROPE_MAP = {"Romance":["Enemies to Lovers","Forced Proximity","Slow Burn","Love Triangle","Fake Dating","Second Chance Romance","Forbidden Love","Friends to Lovers","Grumpy x Sunshine","One Bed","Marriage of Convenience"],"Thriller":["Unreliable Narrator","Race Against Time","The Twist","Wrongfully Accused","Conspiracy","Double Identity","Isolated Setting","Psychological Manipulation"],"Crime / Krimi":["Amateur Detective","Whodunit","Locked Room Mystery","Serial Killer Cat & Mouse","The Red Herring","Corrupt Cop / Dirty System","Cold Case","Cozy Mystery"],"Fantasy":["Chosen One","Dark Lord","Found Family","Magic System","Prophecy","Reluctant Hero","Portal Fantasy","Morally Grey Villain","Training Arc"],"Science-Fiction":["Dystopia","Time Travel","Post-Apocalypse","Clones / Doubles"],"Horror":["Haunted House","The Monster Within","Isolation & Paranoia","The Cult"],"Historischer Roman":["Real Historical Figures","Forbidden Love across Classes","War as Backdrop","Secrets across Generationen","Strong Woman in patriarchal Society","The Outsider"]};;
const PAGE_SIZE = 24;
let sg = new Set(), st = new Set(), sa = [];
let filtered = [], pg = 1;
let currentBookId = null;
let currentStars = 0;

// ── INIT ─────────────────────────────────────────────
async function init() {
  initTheme();
  applyI18n();
  // Delegated click handler for book cards (avoids inline onclick Safari issues)
  document.getElementById('book-grid').addEventListener('click', e => {
    const card = e.target.closest('.book-card');
    if (!card) return;
    if (e.target.closest('a')) return;
    const idx = parseInt(card.dataset.idx, 10);
    if (!isNaN(idx)) openModal(idx);
  });
  if (SUPABASE_URL === 'DEINE_SUPABASE_URL') {
    document.getElementById('config-banner').classList.add('show');
    document.getElementById('loading-screen').classList.add('hidden');
    return;
  }

  const { data: { session } } = await sb.auth.getSession();
  if (session) await handleUserChange(session.user);

  sb.auth.onAuthStateChange(async (event, session) => {
    await handleUserChange(session?.user ?? null);
  });

  await loadBooks();
  document.getElementById('loading-screen').classList.add('hidden');
  await checkSharedReadlist();
}

async function loadBooks() {
  let all = [];
  let from = 0;
  const BATCH = 1000;

  // Load books with nested authors via join
  while (true) {
    const { data, error } = await sb
      .from(TABLE_BOOKS)
      .select(`
        id,
        ol_key,
        title,
        cover_id,
        cover_url,
        first_publish_year,
        genre,
        tropes,
        google_rating,
        google_ratings_count,
        google_rating_updated_at,
        description_de,
        description_en,
        description_de_updated_at,
        description_en_updated_at,
        book_authors ( authors ( name ) )
      `)
      .range(from, from + BATCH - 1);
    if (error) {
      const msg = (error && (error.message || error.hint || error.details)) || 'Unbekannter Fehler';
      const code = error && error.code ? ` (Code: ${error.code})` : '';
      console.error('Books load error:', msg + code);
      document.getElementById('loading-screen').classList.add('hidden');
      showToast('⚠️ Bücher konnten nicht geladen werden: ' + msg + code);
      break;
    }
    if (!data || data.length === 0) break;
    all = all.concat(data);
    if (data.length < BATCH) break;
    from += BATCH;
  }

  // Normalize to internal format the rest of the app expects:
  // t=title, a=authors[], g=genre, y=year, o=ol_key, c=cover_id, p=tropes[]
  BOOKS = all.map(b => ({
    id: b.id,
    t:  b.title || '',
    a:  (b.book_authors || []).map(ba => ba.authors?.name).filter(Boolean),
    g:  b.genre || '',
    y:  b.first_publish_year || 0,
    o:  b.ol_key || String(b.id),
    c:  b.cover_id || null,
    cover_url: b.cover_url || null,
    p:  Array.isArray(b.tropes) ? b.tropes : (b.tropes ? [b.tropes] : []),
    gr: b.google_rating || null,
    grc: b.google_ratings_count || null,
    gru: b.google_rating_updated_at || null,
    descDe: b.description_de || null,
    descEn: b.description_en || null,
    descDeU: b.description_de_updated_at || null,
    descEnU: b.description_en_updated_at || null,
    s:  []
  }));

  filtered = [...BOOKS];
  document.getElementById('stat-total').textContent = roundedBookCount(BOOKS.length, 'de');
  document.getElementById('book-count-badge').textContent = roundedBookCount(BOOKS.length, 'de');
  liveFilter();
}

// ── AUTH ─────────────────────────────────────────────
let authMode = 'login';

function toggleAuth() {
  if (currentUser) {
    sb.auth.signOut();
    showToast('Abgemeldet.');
  } else {
    openAuth();
  }
}
function openAuth() {
  document.getElementById('auth-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAuth() {
  document.getElementById('auth-overlay').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('auth-error').classList.remove('show');
  pendingReadlistAction = null;
}
function authOverlayClick(e) {
  if (e.target === document.getElementById('auth-overlay')) closeAuth();
}
function switchTab(mode) {
  authMode = mode;
  document.getElementById('tab-login').classList.toggle('active', mode === 'login');
  document.getElementById('tab-register').classList.toggle('active', mode === 'register');
  document.getElementById('auth-password2').style.display = mode === 'register' ? '' : 'none';
  document.getElementById('auth-submit').textContent = mode === 'login' ? t('login') : t('register');
  document.getElementById('auth-error').classList.remove('show');
}
async function doAuth() {
  const email = document.getElementById('auth-email').value.trim();
  const pw    = document.getElementById('auth-password').value;
  const pw2   = document.getElementById('auth-password2').value;
  const errEl = document.getElementById('auth-error');
  errEl.classList.remove('show');
  if (!email || !pw) { errEl.textContent = 'Bitte E-Mail und Passwort eingeben.'; errEl.classList.add('show'); return; }
  if (authMode === 'register') {
    if (pw !== pw2) { errEl.textContent = 'Passwörter stimmen nicht überein.'; errEl.classList.add('show'); return; }
    const { error } = await sb.auth.signUp({ email, password: pw });
    if (error) { errEl.textContent = error.message; errEl.classList.add('show'); return; }
    showToast('Bestätigungs-E-Mail gesendet!');
    closeAuth();
  } else {
    const { error } = await sb.auth.signInWithPassword({ email, password: pw });
    if (error) { errEl.textContent = 'Falsche E-Mail oder falsches Passwort.'; errEl.classList.add('show'); return; }
    closeAuth();
  }
}
async function handleUserChange(user) {
  currentUser = user;
  const btnText = document.getElementById('auth-btn-text');
  const btn = document.getElementById('btn-auth');
  if (user) {
    btnText.textContent = user.email.split('@')[0];
    btn.classList.add('logged-in');
    btn.removeAttribute('title');
    await loadReadlist();
    updateReadlistBadge();
    renderGrid();
    if (pendingReadlistAction) {
      const { bookId, status } = pendingReadlistAction;
      pendingReadlistAction = null;
      await setReadlistStatus(bookId, status);
    }
    if (pendingSharedToken) {
      const token = pendingSharedToken;
      pendingSharedToken = null;
      await openSharedReadlist(token);
    }
  } else {
    btnText.textContent = t('login');
    btn.classList.remove('logged-in');
    btn.title = t('loginTooltip');
    userReadlist.clear();
    updateReadlistBadge();
    renderGrid();
  }
}

// ── READLIST ─────────────────────────────────────────
async function loadReadlist() {
  if (!currentUser) return;
  const { data } = await sb
    .from(TABLE_USER_BOOKS)
    .select('book_id, status')
    .eq('user_id', currentUser.id);
  // Map of book_id (string) -> status
  userReadlist = new Map((data || []).map(r => [String(r.book_id), r.status || 'will_lesen']));
}
function updateReadlistBadge() {
  const badge = document.getElementById('readlist-count-badge');
  const count = userReadlist.size;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}
// Set (or toggle off) the reading status of a book. Clicking the already-active
// status removes the book from the list; any other status adds/updates it.
async function setReadlistStatus(bookId, status) {
  if (!currentUser) {
    pendingReadlistAction = { bookId, status };
    openAuth();
    return;
  }
  const key = String(bookId);
  const current = userReadlist.get(key);
  if (current === status) {
    await removeFromReadlist(bookId);
    return;
  } else {
    const pending = pendingRemovals.get(key);
    if (pending) { clearTimeout(pending); pendingRemovals.delete(key); }
    const { error } = await sb.from(TABLE_USER_BOOKS).upsert({
      user_id: currentUser.id,
      book_id: bookId,
      status: status
    }, { onConflict: 'user_id,book_id' });
    if (error) {
      console.error('Leseliste-Fehler:', error.message, error.code, error.details);
      showToast('⚠️ Fehler: ' + (error.message || 'Unbekannter Fehler'));
      return;
    }
    userReadlist.set(key, status);
    const s = getReadlistStatuses()[status];
    showToast(current ? `Status geändert: ${s.label} ${s.icon}` : `Zur Leseliste hinzugefügt: ${s.label} ${s.icon}`);
  }
  updateReadlistBadge();
  renderGrid();
  const book = BOOKS.find(b => b.id === bookId);
  if (book) renderModalReadlistBtn(book.o);
  if (document.getElementById('readlist-overlay').classList.contains('open')) renderReadlistPanel();
}
// Quick-add from card: fügt mit Standard-Status "will_lesen" hinzu,
// oder öffnet ein kleines Status-Popup wenn das Buch bereits auf der Liste ist.
async function quickAddToReadlist(bookId) {
  const key = String(bookId);
  const current = userReadlist.get(key);
  if (current) {
    const order = READLIST_STATUS_ORDER;
    const currentIdx = order.indexOf(current);
    if (currentIdx === order.length - 1) {
      // letzter Status → von Liste entfernen
      await removeFromReadlist(bookId);
    } else {
      // nächsten Status setzen
      await setReadlistStatus(bookId, order[currentIdx + 1]);
    }
  } else {
    await setReadlistStatus(bookId, 'will_lesen');
  }
}
function openReadlist() {
  document.getElementById('readlist-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderReadlistPanel();
}
function closeReadlist() {
  document.getElementById('readlist-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function readlistOverlayClick(e) {
  if (e.target === document.getElementById('readlist-overlay')) closeReadlist();
}

// ── EXPORT (CSV / PDF) ────────────────────────────────
async function fetchReadlistItemsForExport() {
  if (!currentUser) return [];
  const { data, error } = await sb
    .from(TABLE_USER_BOOKS)
    .select(`
      book_id,
      status,
      books (
        title, genre, first_publish_year,
        book_authors ( authors ( name ) )
      )
    `)
    .eq('user_id', currentUser.id)
    .order('id', { ascending: false });
  if (error) { console.error('Export-Daten konnten nicht geladen werden:', error.message); showToast('⚠️ Export fehlgeschlagen: ' + (error.message || 'Unbekannter Fehler')); return null; }
  return (data || []).map(row => {
    const b = row.books || {};
    return {
      title: b.title || '–',
      author: ((b.book_authors || [])[0]?.authors?.name) || '',
      genre: genreLabel(b.genre || ''),
      year: b.first_publish_year || '',
      status: (getReadlistStatuses()[row.status] || getReadlistStatuses().will_lesen).label
    };
  });
}
function toggleExportMenu() {
  document.getElementById('export-menu').classList.toggle('open');
}
function closeExportMenu() {
  document.getElementById('export-menu').classList.remove('open');
}
function csvEscape(val) {
  const s = String(val ?? '');
  if (/[",;\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
async function exportReadlistCSV() {
  closeExportMenu();
  if (!currentUser) { openAuth(); return; }
  const items = await fetchReadlistItemsForExport();
  if (items === null) { showToast('⚠️ Export fehlgeschlagen.'); return; }
  if (!items.length) { showToast(t('exportEmpty') || 'Leseliste ist leer.'); return; }
  const headers = [t('exportColTitle') || 'Titel', t('exportColAuthor') || 'Autor', t('exportColGenre') || 'Genre', t('exportColYear') || 'Jahr', t('exportColStatus') || 'Status'];
  const rows = items.map(it => [it.title, it.author, it.genre, it.year, it.status]);
  const csv = [headers, ...rows].map(r => r.map(csvEscape).join(';')).join('\r\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leseliste.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📄 CSV exportiert.');
}
async function exportReadlistPDF() {
  closeExportMenu();
  if (!currentUser) { openAuth(); return; }
  if (typeof window.jspdf === 'undefined') { showToast('⚠️ PDF-Export momentan nicht verfügbar.'); return; }

  const { data, error } = await sb
    .from(TABLE_USER_BOOKS)
    .select(`book_id, status, books (title, genre, first_publish_year, book_authors ( authors ( name ) ))`)
    .eq('user_id', currentUser.id)
    .order('id', { ascending: false });
  if (error || !data) { showToast('⚠️ Export fehlgeschlagen.'); return; }
  if (!data.length) { showToast(t('exportEmpty') || 'Leseliste ist leer.'); return; }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const mX = 44;
  const contentW = W - mX * 2;
  let y = mX;
  let page = 1;

  // Design-Tokens
  const C = {
    indigo:  [99,  102, 241],
    amber:   [180, 115,  10],
    emerald: [10,  140, 100],
    ink:     [24,   24,  37],
    ink2:    [72,   72,  90],
    muted:   [140, 140, 158],
    border:  [215, 215, 225],
    bg:      [246, 245, 243],
    white:   [255, 255, 255],
    indigoBg:[232, 232, 254],
    amberBg: [254, 240, 195],
    emerBg:  [205, 248, 228],
  };

  const STATUS_META = {
    will_lesen: { label: t('statusWillLesen') || 'Will lesen',  marker: '[ ]', color: C.indigo,  bg: C.indigoBg },
    liest:      { label: t('statusLiest')     || 'Lese ich',    marker: '[>]', color: C.amber,   bg: C.amberBg  },
    gelesen:    { label: t('statusGelesen')   || 'Gelesen',     marker: '[v]', color: C.emerald, bg: C.emerBg   },
  };

  // Gruppiere nach Status
  const groups = {};
  READLIST_STATUS_ORDER.forEach(s => { groups[s] = []; });
  data.forEach(row => {
    const b = row.books || {};
    const entry = {
      title:  b.title || '–',
      author: ((b.book_authors || [])[0]?.authors?.name) || '',
      genre:  genreLabel(b.genre || ''),
      year:   b.first_publish_year ? String(b.first_publish_year) : '',
    };
    if (groups[row.status]) groups[row.status].push(entry);
    else groups['will_lesen'].push(entry);
  });

  function drawFooter() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text(`Shelved  ·  Seite ${page}`, W / 2, H - 22, { align: 'center' });
  }

  function ensureSpace(needed) {
    if (y + needed > H - 50) {
      drawFooter();
      doc.addPage();
      page++;
      y = mX;
      // Dünne Linie oben auf Folgeseiten
      doc.setFillColor(...C.indigo);
      doc.rect(mX, mX - 10, contentW, 2, 'F');
      y += 8;
    }
  }

  // ── HEADER ──
  // Indigo-Balken oben
  doc.setFillColor(...C.indigo);
  doc.rect(0, 0, W, 6, 'F');
  y = 40;

  // Logo-Kreis
  doc.setFillColor(...C.indigo);
  doc.circle(mX + 5, y + 8, 5, 'F');

  // Titel
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...C.ink);
  doc.text('Shelved', mX + 16, y + 14);

  // Untertitel
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...C.ink2);
  doc.text(t('myReadlist') || 'Meine Leseliste', mX + 16, y + 29);
  y += 52;

  // Meta-Zeile
  const dateStr = new Date().toLocaleDateString(currentLang === 'en' ? 'en-GB' : 'de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  doc.text(`${data.length} Bücher  ·  ${dateStr}`, mX, y);
  y += 10;

  // Trennlinie
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.5);
  doc.line(mX, y, W - mX, y);
  y += 24;

  // ── KATEGORIEN ──
  const col = { title: mX, author: mX + 198, genre: mX + 346, year: mX + 462 };

  READLIST_STATUS_ORDER.forEach(statusKey => {
    const items = groups[statusKey];
    if (!items.length) return;
    const meta = STATUS_META[statusKey];

    ensureSpace(60);

    // Kategorie-Badge (Hintergrundrechteck)
    const badgeH = 22;
    const badgeW = doc.getStringUnitWidth(meta.label) * 10 + 28;
    doc.setFillColor(...meta.bg);
    doc.rect(mX, y, badgeW, badgeH, 'F');

    // Farbiger linker Rand
    doc.setFillColor(...meta.color);
    doc.rect(mX, y, 3, badgeH, 'F');

    // Badge-Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...meta.color);
    doc.text(meta.label, mX + 10, y + 14.5);

    // Buchanzahl
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.muted);
    doc.text(`${items.length} ${items.length === 1 ? 'Buch' : 'Bücher'}`, mX + badgeW + 8, y + 14.5);
    y += badgeH + 14;

    // Spaltenköpfe
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...C.muted);
    doc.text('TITEL',  col.title,  y);
    doc.text('AUTOR',  col.author, y);
    doc.text('GENRE',  col.genre,  y);
    doc.text('JAHR',   col.year,   y);
    y += 6;

    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.4);
    doc.line(mX, y, W - mX, y);
    y += 11;

    // Zeilen
    items.forEach((item, idx) => {
      ensureSpace(20);

      // Zebra
      if (idx % 2 === 0) {
        doc.setFillColor(...C.bg);
        doc.rect(mX - 4, y - 9, contentW + 8, 19, 'F');
      }

      // Titel (fett)
      const titleTrunc = doc.splitTextToSize(item.title, 186)[0];
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...C.ink);
      doc.text(titleTrunc, col.title, y);

      // Autor
      const authorTrunc = doc.splitTextToSize(item.author, 136)[0];
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...C.ink2);
      doc.text(authorTrunc, col.author, y);

      // Genre-Chip
      if (item.genre) {
        const gW = doc.getStringUnitWidth(item.genre) * 9 + 10;
        doc.setFillColor(...C.indigoBg);
        doc.rect(col.genre, y - 8, gW, 13, 'F');
        doc.setFontSize(8);
        doc.setTextColor(...C.indigo);
        doc.text(item.genre, col.genre + 5, y);
      }

      // Jahr
      if (item.year) {
        doc.setFontSize(9);
        doc.setTextColor(...C.muted);
        doc.text(item.year, col.year, y);
      }

      y += 19;
    });

    y += 20;
  });

  drawFooter();
  doc.save('shelved-leseliste.pdf');
  showToast('📑 PDF exportiert.');
}
document.addEventListener('click', (e) => {
  const exportMenu = document.getElementById('export-menu');
  const exportBtn = document.getElementById('btn-export-readlist');
  if (exportMenu && exportMenu.classList.contains('open') && !exportMenu.contains(e.target) && e.target !== exportBtn) {
    exportMenu.classList.remove('open');
  }
  const shareMenu = document.getElementById('share-menu');
  const shareBtn = document.getElementById('btn-share-readlist');
  if (shareMenu && shareMenu.classList.contains('open') && !shareMenu.contains(e.target) && e.target !== shareBtn) {
    shareMenu.classList.remove('open');
  }
});

function backToOwnReadlist() {
  document.getElementById('readlist-user-bar').innerHTML = '';
  const title = document.getElementById('readlist-panel-title');
  if (title) title.textContent = 'Meine Leseliste';
  renderReadlistPanel();
}

// ── SHARE READLIST ────────────────────────────────────
async function getOrCreateShareToken() {
  if (!currentUser) return null;
  let { data } = await sb.from(TABLE_PROFILES).select('share_token').eq('user_id', currentUser.id).maybeSingle();
  if (data && data.share_token) return data.share_token;
  // Noch kein Profil vorhanden -> anlegen (share_token wird automatisch generiert)
  const { data: inserted, error } = await sb.from(TABLE_PROFILES)
    .insert({ user_id: currentUser.id })
    .select('share_token')
    .single();
  if (error) { console.error('Share-Token konnte nicht erstellt werden:', error.message); return null; }
  return inserted.share_token;
}
function toggleShareMenu() {
  const menu = document.getElementById('share-menu');
  const exportMenu = document.getElementById('export-menu');
  if (exportMenu) exportMenu.classList.remove('open');
  menu.classList.toggle('open');
}
function closeShareMenu() {
  const menu = document.getElementById('share-menu');
  if (menu) menu.classList.remove('open');
}
async function getShareUrl() {
  if (!currentUser) { openAuth(); return null; }
  if (location.protocol === 'file:') {
    showToast('⚠️ Teilen funktioniert nur, wenn das Tool gehostet ist.');
    return null;
  }
  const token = await getOrCreateShareToken();
  if (!token) { showToast('⚠️ Link konnte nicht erstellt werden.'); return null; }
  return `${location.origin}${location.pathname}?share=${token}`;
}
async function shareViaWhatsApp() {
  closeShareMenu();
  const url = await getShareUrl();
  if (!url) return;
  const text = encodeURIComponent(`Schau dir meine Leseliste auf Shelved an 📚\n${url}`);
  window.open(`https://wa.me/?text=${text}`, '_blank');
}
async function copyReadlistLink() {
  closeShareMenu();
  const url = await getShareUrl();
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
    showToast('🔗 Link kopiert! Teile ihn mit Freunden.');
  } catch (e) {
    prompt('Link kopieren:', url);
  }
}

// Prüft beim Laden, ob ein ?share=TOKEN Parameter in der URL steht, und zeigt ggf.
// die geteilte (schreibgeschützte) Leseliste eines anderen Nutzers an.
async function checkSharedReadlist() {
  const params = new URLSearchParams(location.search);
  const token = params.get('share');
  if (!token) return;
  if (!currentUser) {
    // Erst nach Login auflösbar -> merken und Auth-Modal öffnen
    pendingSharedToken = token;
    showToast('🔐 ' + t('pleaseLoginReadlist'));
    openAuth();
    return;
  }
  await openSharedReadlist(token);
}
async function openSharedReadlist(token) {
  const { data, error } = await sb.rpc('get_shared_readlist', { p_share_token: token });
  if (error) {
    console.error('Geteilte Leseliste konnte nicht geladen werden:', error.message);
    showToast('⚠️ Dieser Link ist ungültig oder abgelaufen.');
    return;
  }
  if (!data || !data.length) {
    showToast('Diese geteilte Leseliste ist leer oder der Link ist ungültig.');
  }
  renderSharedReadlistPanel(data || []);
  // URL säubern, damit ein Reload nicht erneut die geteilte Liste statt der eigenen öffnet
  const url = new URL(location.href);
  url.searchParams.delete('share');
  history.replaceState({}, '', url.toString());
}
function renderSharedReadlistPanel(items) {
  document.getElementById('readlist-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  switchReadlistView('mine');
  document.getElementById('readlist-user-bar').innerHTML = `
    <button onclick="backToOwnReadlist()" style="display:flex;align-items:center;gap:6px;background:none;border:none;font-family:'Cabinet Grotesk',sans-serif;font-size:12px;font-weight:700;color:var(--muted);cursor:pointer;padding:0;transition:color .15s" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--muted)'">
      ← Zurück zu meiner Liste
    </button>
    <span style="font-size:12px;color:var(--muted)">👀 Geteilte Leseliste (schreibgeschützt)</span>`;
  const title = document.getElementById('readlist-panel-title');
  if (title) title.textContent = 'Geteilte Leseliste';
  document.getElementById('readlist-subtitle').textContent = `${items.length} ${t('resultsBooks')}`;
  const body = document.getElementById('readlist-body');
  if (!items.length) {
    body.innerHTML = `<div class="readlist-empty"><span class="readlist-empty-icon">📖</span><p>Diese Leseliste ist leer.</p></div>`;
    return;
  }
  body.innerHTML = items.map(item => {
    const s = getReadlistStatuses()[item.status] || getReadlistStatuses().will_lesen;
    const coverSrc = item.cover_url ? item.cover_url : (item.cover_id ? coverUrl(item.cover_id, 'M') : '');
    const coverHtml = coverSrc ? `<img src="${coverSrc}" alt="" onerror="this.style.display='none'">` : '';
    return `<div class="readlist-item">
      <div class="readlist-cover">${coverHtml}</div>
      <div class="readlist-info">
        <div class="readlist-title">${escH(item.title || '–')}</div>
        <div class="readlist-author">${escH(item.author_name || '')}</div>
        <div class="readlist-genre">${escH(genreLabel(item.genre || ''))}</div>
        <div class="readlist-status-row"><span class="readlist-status-chip active" style="--st-color:${s.color};cursor:default">${s.icon}</span></div>
      </div>
    </div>`;
  }).join('');
}

// ── FRIENDS VIEW ─────────────────────────────────────
const FRIENDS_KEY = 'shelved_friends';

function getFriends() {
  try { return JSON.parse(localStorage.getItem(FRIENDS_KEY) || '[]'); } catch { return []; }
}
function saveFriends(list) {
  try { localStorage.setItem(FRIENDS_KEY, JSON.stringify(list)); } catch {}
}

function switchReadlistView(view) {
  const mineView = document.getElementById('readlist-mine-view');
  const friendsView = document.getElementById('readlist-friends-view');
  const mineBtn = document.getElementById('nav-btn-mine');
  const friendsBtn = document.getElementById('nav-btn-friends');
  const title = document.getElementById('readlist-panel-title');
  const exportBtn = document.getElementById('btn-export-readlist');
  const shareBtn = document.getElementById('btn-share-readlist');

  if (view === 'mine') {
    mineView.style.display = '';
    friendsView.style.display = 'none';
    mineBtn.classList.add('active');
    friendsBtn.classList.remove('active');
    if (title) title.textContent = 'Meine Leseliste';
    if (exportBtn) exportBtn.style.display = '';
    if (shareBtn) shareBtn.style.display = '';
  } else {
    mineView.style.display = 'none';
    friendsView.style.display = '';
    mineBtn.classList.remove('active');
    friendsBtn.classList.add('active');
    if (title) title.textContent = 'Freunde';
    if (exportBtn) exportBtn.style.display = 'none';
    if (shareBtn) shareBtn.style.display = 'none';
    renderFriends();
  }
}

async function addFriend() {
  const input = document.getElementById('friends-link-input');
  const raw = (input.value || '').trim();
  if (!raw) return;

  // Token aus URL extrahieren
  let token = null;
  try {
    const url = new URL(raw);
    token = url.searchParams.get('share');
  } catch {
    // Falls nur der Token eingegeben wurde
    token = raw;
  }
  if (!token) { showToast('⚠️ Kein gültiger Shelved-Link.'); return; }

  // Prüfen ob schon gespeichert
  const existing = getFriends();
  if (existing.find(f => f.token === token)) {
    showToast('Dieser Freund ist bereits gespeichert.');
    input.value = '';
    return;
  }

  // Token auflösen um Name zu bekommen
  input.disabled = true;
  const { data, error } = await sb.rpc('get_shared_readlist', { p_share_token: token });
  input.disabled = false;

  if (error || !data) { showToast('⚠️ Link ungültig oder abgelaufen.'); return; }

  // Freund speichern — Name aus erster Buchzeile oder Fallback
  const bookCount = (data || []).length;
  const friend = {
    token,
    name: `Freund ${existing.length + 1}`,
    bookCount,
    addedAt: new Date().toISOString()
  };
  saveFriends([...existing, friend]);
  input.value = '';
  renderFriends();
  showToast(`✅ Freund hinzugefügt — ${bookCount} Bücher auf der Liste.`);
}

function renderFriends() {
  const list = document.getElementById('friends-list');
  if (!list) return;
  const friends = getFriends();
  if (!friends.length) {
    list.innerHTML = `<div class="friends-empty">
      <span class="friends-empty-icon">👥</span>
      <p>Noch keine Freunde hinzugefügt.<br>Füge den Link einer Leseliste ein!</p>
    </div>`;
    return;
  }
  list.innerHTML = friends.map((f, idx) => {
    const initials = f.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const colors = ['#6366f1','#f59e0b','#10b981','#ec4899','#3b82f6','#8b5cf6'];
    const color = colors[idx % colors.length];
    const date = new Date(f.addedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' });
    return `<div class="friend-card" onclick="viewFriendList('${f.token}')">
      <div class="friend-avatar" style="background:${color}">${initials}</div>
      <div class="friend-info">
        <div class="friend-name" id="fname-${idx}">${escH(f.name)}</div>
        <div class="friend-meta">${f.bookCount} Bücher · Hinzugefügt ${date}</div>
      </div>
      <div class="friend-actions" onclick="event.stopPropagation()">
        <button class="friend-open-btn" onclick="renameFriend(${idx})">✏️</button>
        <button class="friend-delete-btn" onclick="deleteFriend(${idx})">✕</button>
      </div>
    </div>`;
  }).join('');
}

async function viewFriendList(token) {
  showToast('⏳ Leseliste wird geladen…');
  await openSharedReadlist(token);
  // Nach dem Öffnen zurück zur Hauptansicht wechseln
  switchReadlistView('mine');
}

function deleteFriend(idx) {
  const friends = getFriends();
  friends.splice(idx, 1);
  saveFriends(friends);
  renderFriends();
}

function renameFriend(idx) {
  const friends = getFriends();
  const current = friends[idx].name;
  const newName = prompt('Name für diesen Freund:', current);
  if (!newName || !newName.trim()) return;
  friends[idx].name = newName.trim();
  saveFriends(friends);
  renderFriends();
}

// ── FEEDBACK ─────────────────────────────────────────
const FEEDBACK_STAR_LABELS = ['', 'Nicht so toll', 'Geht so', 'Ganz okay', 'Gut!', 'Ausgezeichnet! ⭐'];
let feedbackStars = 0;

function openFeedback() {
  feedbackStars = 0;
  document.getElementById('feedback-text').value = '';
  document.getElementById('feedback-submit').disabled = true;
  document.getElementById('feedback-star-label').textContent = '';
  document.getElementById('feedback-thanks').style.display = 'none';
  document.querySelectorAll('.feedback-star').forEach(s => s.classList.remove('active'));
  document.querySelector('.feedback-submit').style.display = '';
  document.querySelector('.feedback-textarea').style.display = '';
  document.getElementById('feedback-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeFeedback() {
  document.getElementById('feedback-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function feedbackOverlayClick(e) {
  if (e.target === document.getElementById('feedback-overlay')) closeFeedback();
}
function setFeedbackStar(val) {
  feedbackStars = val;
  document.querySelectorAll('.feedback-star').forEach(s => {
    s.classList.toggle('active', Number(s.dataset.val) <= val);
  });
  document.getElementById('feedback-star-label').textContent = FEEDBACK_STAR_LABELS[val] || '';
  document.getElementById('feedback-submit').disabled = false;
}
async function submitFeedback() {
  const btn = document.getElementById('feedback-submit');
  const comment = document.getElementById('feedback-text').value.trim();
  btn.disabled = true;
  btn.textContent = '…';
  try {
    await sb.from('feedback').insert({
      rating: feedbackStars,
      comment: comment || null,
      user_id: currentUser?.id || null,
      created_at: new Date().toISOString()
    });
  } catch (e) {
    // Auch ohne Tabelle schön anzeigen
  }
  // Danke-Meldung
  document.querySelector('.feedback-textarea').style.display = 'none';
  btn.style.display = 'none';
  document.getElementById('feedback-thanks').style.display = 'flex';
  setTimeout(closeFeedback, 2800);
}

// ── GOOGLE BOOKS RATING IMPORT ───────────────────────
function setReadlistFilter(f) {
  readlistFilter = f;
  renderReadlistPanel();
}
async function renderReadlistPanel() {
  const body = document.getElementById('readlist-body');
  const sub  = document.getElementById('readlist-subtitle');
  const userBar = document.getElementById('readlist-user-bar');
  const tabsEl = document.getElementById('readlist-tabs');
  if (!currentUser) {
    userBar.innerHTML = '';
    tabsEl.innerHTML = '';
    sub.textContent = `0 ${t('resultsBooks')}`;
    body.innerHTML = `<div class="readlist-empty"><span class="readlist-empty-icon">🔐</span><p>${t('pleaseLoginReadlist')}</p></div>`;
    return;
  }
  userBar.innerHTML = `<span>${t('loggedInAs')}</span> <span class="readlist-user-name">${currentUser.email}</span>`;
  const { data } = await sb
    .from(TABLE_USER_BOOKS)
    .select(`
      id,
      book_id,
      status,
      books (
        id, title, cover_id, cover_url, genre, first_publish_year,
        book_authors ( authors ( name ) )
      )
    `)
    .eq('user_id', currentUser.id)
    .order('id', { ascending: false });
  const items = (data || []).map(row => {
    const b = row.books || {};
    return {
      rowId:    row.id,
      book_id:  row.book_id,
      status:   row.status || 'will_lesen',
      title:    b.title || '–',
      author:   ((b.book_authors || [])[0]?.authors?.name) || '',
      genre:    b.genre || '',
      cover_id: b.cover_id || null,
      cover_url: b.cover_url || null
    };
  });

  // Counts per status for the tab bar
  const counts = { will_lesen: 0, liest: 0, gelesen: 0 };
  items.forEach(it => { if (counts[it.status] !== undefined) counts[it.status]++; });

  tabsEl.innerHTML = `
    <button class="readlist-tab ${readlistFilter === 'all' ? 'active' : ''}" onclick="setReadlistFilter('all')">${t('allTab')} <span class="readlist-tab-count">${items.length}</span></button>
    ${READLIST_STATUS_ORDER.map(key => {
      const s = getReadlistStatuses()[key];
      return `<button class="readlist-tab ${readlistFilter === key ? 'active' : ''}" onclick="setReadlistFilter('${key}')">${s.icon} ${s.label} <span class="readlist-tab-count">${counts[key]}</span></button>`;
    }).join('')}
  `;

  const shown = readlistFilter === 'all' ? items : items.filter(it => it.status === readlistFilter);
  sub.textContent = `${items.length} ${t('resultsBooks')}`;
  if (!shown.length) {
    body.innerHTML = `<div class="readlist-empty"><span class="readlist-empty-icon">📖</span><p>${items.length ? t('noBooksInCategory') : t('noBooksYet')}</p></div>`;
    return;
  }
  body.innerHTML = shown.map(item => {
    const coverSrc = item.cover_url
      ? item.cover_url
      : item.cover_id ? coverUrl(item.cover_id, 'M') : '';
    const coverHtml = coverSrc
      ? `<img src="${coverSrc}" alt="" onerror="this.style.display='none'">`
      : '';
    const statusChips = READLIST_STATUS_ORDER.map(key => {
      const s = getReadlistStatuses()[key];
      const active = item.status === key;
      return `<button class="readlist-status-chip ${active ? 'active' : ''}" style="--st-color:${s.color}" onclick="setReadlistStatus('${item.book_id}','${key}')" title="${active ? s.label + ' – Klicken, um von der Leseliste zu entfernen' : s.label}">${s.icon}</button>`;
    }).join('');
    return `<div class="readlist-item">
      <div class="readlist-cover">${coverHtml}</div>
      <div class="readlist-info">
        <div class="readlist-title">${escH(item.title)}</div>
        <div class="readlist-author">${escH(item.author)}</div>
        <div class="readlist-genre">${escH(genreLabel(item.genre))}</div>
        <div class="readlist-status-row">${statusChips}</div>
      </div>
      <div class="readlist-actions">
        <button class="btn-readlist-remove" onclick="removeFromReadlist('${item.book_id}')" title="${t('removeTitle')}">✕</button>
        <a class="btn-thalia-sm" href="${item.ol_key && item.ol_key.startsWith('OL') ? `https://openlibrary.org/works/${item.ol_key}` : `https://openlibrary.org/search?q=${encodeURIComponent(item.title)}`}" target="_blank" title="${t('newTabTooltip')}">${t('thaliaShort')} ↗</a>
      </div>
    </div>`;
  }).join('');
}
// Pending removals: bookId -> timeout handle (delete is delayed to allow undo)
const pendingRemovals = new Map();
async function removeFromReadlist(bookId) {
  const key = String(bookId);
  const previousStatus = userReadlist.get(key);
  if (!previousStatus) return;

  // Optimistically remove from local state/UI immediately
  userReadlist.delete(key);
  updateReadlistBadge();
  renderReadlistPanel();
  renderGrid();
  const book = BOOKS.find(b => b.id === bookId);
  if (book) renderModalReadlistBtn(book.o);

  // Delay the actual deletion so the user can undo
  const timeout = setTimeout(async () => {
    pendingRemovals.delete(key);
    await sb.from(TABLE_USER_BOOKS).delete()
      .eq('user_id', currentUser.id)
      .eq('book_id', bookId);
  }, 5000);
  pendingRemovals.set(key, timeout);

  showToast('Von Leseliste entfernt.', 'Rückgängig', () => {
    const t = pendingRemovals.get(key);
    if (t) { clearTimeout(t); pendingRemovals.delete(key); }
    userReadlist.set(key, previousStatus);
    updateReadlistBadge();
    renderReadlistPanel();
    renderGrid();
    if (book) renderModalReadlistBtn(book.o);
  });
}
function renderModalReadlistBtn(olId) {
  const wrap = document.getElementById('m-readlist-wrap');
  if (!wrap) return;
  const book = BOOKS.find(b => b.o === olId);
  const current = book ? userReadlist.get(String(book.id)) : undefined;
  if (!currentUser) {
    wrap.innerHTML = `<div class="login-prompt" onclick="openAuth()">🔐 ${t('loginToAddReadlist')}</div>`;
    return;
  }
  wrap.innerHTML = `<div class="modal-status-row">
    ${READLIST_STATUS_ORDER.map(key => {
      const s = getReadlistStatuses()[key];
      const active = current === key;
      return `<button class="modal-status-btn ${active ? 'active' : ''}" style="--st-color:${s.color}" onclick="setReadlistStatus('${book ? book.id : 0}','${key}')" title="${active ? 'Klicken, um von der Leseliste zu entfernen' : ''}">${s.icon} ${s.label}</button>`;
    }).join('')}
  </div>${current ? `<div class="trope-hint" style="display:block;padding-top:2px">Status erneut anklicken, um das Buch von der Leseliste zu entfernen.</div>` : ''}`;
}

// ── REVIEWS ──────────────────────────────────────────
async function loadReviews(olId) {
  // Find the numeric book.id from the ol_key
  const book = BOOKS.find(b => b.o === olId);
  if (!book) { reviewsCache[olId] = []; return []; }
  const { data } = await sb
    .from(TABLE_REVIEWS)
    .select('id, book_id, author_name, stars, body, created_at')
    .eq('book_id', book.id)
    .order('created_at', { ascending: false });
  reviewsCache[olId] = data || [];
  return reviewsCache[olId];
}
function getReviews(olId) { return reviewsCache[olId] || []; }
function setStar(n) {
  currentStars = n;
  document.querySelectorAll('#star-picker button').forEach((btn, i) => {
    btn.classList.toggle('active', i < n);
  });
}
async function renderReviews(olId) {
  const list  = document.getElementById('reviews-list');
  const badge = document.getElementById('m-review-count');
  list.innerHTML = '<div class="reviews-empty" style="opacity:.5">Lädt …</div>';
  const revs = await loadReviews(olId);
  badge.textContent = revs.length;
  if (!revs.length) {
    list.innerHTML = `<div class="reviews-empty">${t('reviewsEmpty')}</div>`;
    return;
  }
  list.innerHTML = revs.map(r => {
    const stars  = Math.max(1, Math.min(5, r.stars || 0));
    const filled = '★'.repeat(stars);
    const empty  = '☆'.repeat(5 - stars);
    const date   = new Date(r.created_at).toLocaleDateString('de-DE', {day:'2-digit',month:'2-digit',year:'numeric'});
    return `<div class="review-item">
      <div class="review-item-header">
        <div class="review-item-meta">
          <span class="review-item-name">${escH(r.author_name || 'Anonym')}</span>
          <span class="review-item-stars">${filled}<span style="color:#d1d5db">${empty}</span></span>
          <span class="review-item-date">${date}</span>
        </div>
      </div>
      ${r.body ? `<div class="review-item-text">${escH(r.body)}</div>` : ''}
    </div>`;
  }).join('');
}
async function submitReview() {
  if (!currentUser) { openAuth(); return; }
  if (!currentStars) {
    const sp = document.getElementById('star-picker');
    sp.style.transition = 'transform .1s';
    sp.style.transform = 'translateX(6px)';
    setTimeout(() => { sp.style.transform = 'translateX(-6px)'; }, 100);
    setTimeout(() => { sp.style.transform = 'translateX(0)'; }, 200);
    return;
  }
  const text = document.getElementById('review-text').value.trim();
  const name = document.getElementById('review-name').value.trim();
  const book = BOOKS.find(b => b.o === currentBookId);
  if (!book) { showToast('Buch nicht gefunden.'); return; }
  const { error } = await sb.from(TABLE_REVIEWS).insert({
    book_id:     book.id,
    stars:       currentStars,
    body:        text,
    author_name: name || (currentUser ? currentUser.email.split('@')[0] : 'Anonym')
  });
  if (error) { showToast('Fehler: ' + error.message); return; }
  document.getElementById('review-text').value = '';
  document.getElementById('review-name').value = '';
  currentStars = 0;
  document.querySelectorAll('#star-picker button').forEach(b => b.classList.remove('active'));
  showToast('Rezension gespeichert! ⭐');
  renderReviews(currentBookId);
}
async function deleteReview(reviewId, olId) {
  await sb.from(TABLE_REVIEWS).delete().eq('id', reviewId);
  renderReviews(olId);
}

// ── BOOK CARD CLICK (delegated, avoids inline onclick issues) ────
// Registered in init() to guarantee DOM readiness.

// ── GENRES ───────────────────────────────────────────
document.querySelectorAll('.genre-btn').forEach(b => {
  b.addEventListener('click', () => {
    b.classList.toggle('active');
    const g = b.dataset.genre;
    sg.has(g) ? sg.delete(g) : sg.add(g);
    renderTropes(); liveFilter();
  });
});
function clearGenres() { sg.clear(); st.clear(); document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active')); renderTropes(); liveFilter(); }

// ── TROPES ───────────────────────────────────────────
function renderTropes() {
  const panel = document.getElementById('trope-panel'), hint = document.getElementById('trope-hint');
  const grps = new Set(); sg.forEach(g => { const gr = G2T[g]; if (gr) grps.add(gr); });
  if (!grps.size) { panel.classList.remove('visible'); hint.style.display = 'block'; hint.textContent = t('chooseGenreFirst'); return; }
  hint.style.display = 'none'; panel.classList.add('visible');
  const sachbuchHint = currentLang === 'en'
    ? 'There are no tropes for non-fiction – your selection works through the genre alone.'
    : 'Für Sachbücher gibt es keine Tropes – die Auswahl wirkt nur über das Genre.';
  panel.innerHTML = [...grps].map(grp => {
    if (grp === 'Sachbuch') {
      return `<div class="trope-group"><div class="trope-group-label">${t('genreNonfiction')}</div><div class="trope-hint" style="display:block;padding:0">${sachbuchHint}</div></div>`;
    }
    const tropes = TROPE_MAP[grp] || [];
    const btns = tropes.map(tr => `<button class="trope-btn ${st.has(tr) ? 'active' : ''}" onclick="togTrope(this,'${tr.replace(/'/g, "\\'")}')">${tr}</button>`).join('');
    return `<div class="trope-group"><div class="trope-group-label">${grp}</div><div class="trope-grid">${btns}</div></div>`;
  }).join('');
}
function togTrope(b, t) { st.has(t) ? st.delete(t) : st.add(t); b.classList.toggle('active', st.has(t)); liveFilter(); }
function clearTropes() { st.clear(); document.querySelectorAll('.trope-btn').forEach(b => b.classList.remove('active')); liveFilter(); }

// ── AUTHORS ──────────────────────────────────────────
document.getElementById('author-input').addEventListener('keydown', e => { if (e.key === 'Enter') addAuthor(); });
function addAuthor() { const inp = document.getElementById('author-input'), v = inp.value.trim(); if (!v || sa.includes(v)) { inp.value = ''; return; } sa.push(v); inp.value = ''; renderChips(); liveFilter(); }
function rmAuthor(a) { sa = sa.filter(x => x !== a); renderChips(); liveFilter(); }
function renderChips() { document.getElementById('chips').innerHTML = sa.map(a => `<span class="chip">${a}<button class="chip-rm" onclick="rmAuthor('${a.replace(/'/g, "\\'")}')">×</button></span>`).join(''); }

// ── FILTER & SCORE ───────────────────────────────────
function hasF() { return sg.size > 0 || st.size > 0 || sa.length > 0 || document.getElementById('kw-input').value.trim() !== ''; }
function calcScore(b) {
  let s = 0;
  if (sg.has(b.g)) s += 50;
  st.forEach(t => { if ((b.p || []).includes(t)) s += 40; });
  sa.forEach(a => { if (b.a.some(au => au.toLowerCase().includes(a.toLowerCase()))) s += 70; });
  const kw = document.getElementById('kw-input').value.trim().toLowerCase();
  if (kw && (b.t.toLowerCase().includes(kw) || b.a.some(a => a.toLowerCase().includes(kw)))) s += 40;
  return s;
}
function liveFilter() {
  const kw = document.getElementById('kw-input').value.trim().toLowerCase();
  const yF = parseInt(document.getElementById('year-from').value) || 0;
  const yT = parseInt(document.getElementById('year-to').value) || 9999;
  filtered = BOOKS.filter(b => {
    const yr = b.y || 0;
    return (sg.size === 0 || sg.has(b.g))
      && (st.size === 0 || [...st].some(t => (b.p || []).includes(t)))
      && (sa.length === 0 || sa.some(a => b.a.some(au => au.toLowerCase().includes(a.toLowerCase()))))
      && (!kw || b.t.toLowerCase().includes(kw) || b.a.some(a => a.toLowerCase().includes(kw)))
      && (yr === 0 || (yr >= yF && yr <= yT));
  });
  pg = 1; updTitle(); renderFilterBar(); renderGrid(); renderPag();
}
function applyFilters() { liveFilter(); document.getElementById('book-grid').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
function resetAll() {
  sg.clear(); st.clear(); sa = [];
  document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
  ['kw-input','author-input','year-from','year-to'].forEach(id => document.getElementById(id).value = '');
  renderChips(); renderTropes(); liveFilter();
}
function renderFilterBar() {
  const bar = document.getElementById('filter-bar'), pills = [];
  sg.forEach(g => pills.push(`<span class="f-pill genre">${g}<button onclick="rmG('${g}')">×</button></span>`));
  st.forEach(t => pills.push(`<span class="f-pill trope">🏷 ${t}<button onclick="rmT('${t.replace(/'/g, "\\'")}')">×</button></span>`));
  bar.style.display = pills.length ? 'flex' : 'none';
  bar.innerHTML = pills.join('');
}
function rmG(g) { sg.delete(g); document.querySelectorAll('.genre-btn').forEach(b => { if (b.dataset.genre === g) b.classList.remove('active'); }); renderTropes(); liveFilter(); }
function rmT(t) { st.delete(t); renderTropes(); liveFilter(); }
function updTitle() {
  const n = filtered.length, a = hasF();
  const locale = currentLang === 'en' ? 'en' : 'de';
  document.getElementById('results-title').innerHTML = a
    ? `<span>${n.toLocaleString(locale)} ${t('resultsHits')}</span>`
    : `${t('resultsAllPrefix')} <span>${roundedBookCount(BOOKS.length, locale)} ${t('resultsBooks')}</span>`;
  const cta = document.getElementById('cta-btn');
  if (cta) {
    cta.textContent = a ? `✦ ${n.toLocaleString(locale)} ${t('ctaWithCount')}` : `✦ ${t('ctaDefault')}`;
  }
}

// ── GRID ─────────────────────────────────────────────
function getSorted() {
  const sort = document.getElementById('sort-sel').value;
  const books = filtered.map(b => ({ ...b, _s: calcScore(b) }));
  if (sort === 'match') books.sort((a, b) => b._s - a._s || a.t.localeCompare(b.t));
  else if (sort === 'title') books.sort((a, b) => a.t.localeCompare(b.t));
  else if (sort === 'year_desc') books.sort((a, b) => (b.y || 0) - (a.y || 0));
  else books.sort((a, b) => (a.y || 9999) - (b.y || 9999));
  return books;
}
function renderGrid() {
  const sorted = getSorted(), start = (pg - 1) * PAGE_SIZE, slice = sorted.slice(start, start + PAGE_SIZE);
  if (!slice.length) {
    const hasFilters = hasF();
    document.getElementById('book-grid').innerHTML = `
      <div class="empty">
        <span class="empty-icon">${hasFilters ? '🔍' : '📚'}</span>
        <h3>${hasFilters ? 'Keine Treffer' : 'Noch keine Bücher'}</h3>
        <p>${hasFilters
          ? 'Mit diesen Filtern wurden keine Bücher gefunden. Versuche weniger oder andere Filter.'
          : 'Bücher werden geladen…'}</p>
        ${hasFilters ? `<button onclick="resetAll()" style="margin-top:16px;padding:9px 20px;background:var(--accent);color:#fff;border:none;border-radius:999px;font-family:'Cabinet Grotesk',sans-serif;font-size:13px;font-weight:700;cursor:pointer">↺ Filter zurücksetzen</button>` : ''}
      </div>`;
    return;
  }
  const active = hasF(), maxS = active ? Math.max(...sorted.slice(0, 200).map(b => b._s), 1) : 0;
  document.getElementById('book-grid').innerHTML = slice.map((book, i) => {
    const idx = sorted.indexOf(book);
    let badge = '';
    if (active && book._s > 0) {
      const pct = Math.round((book._s / maxS) * 100);
      const cls = pct >= 75 ? 'high' : pct >= 40 ? 'mid' : 'low';
      const lbl = pct >= 75 ? '✦ Top' : pct >= 40 ? 'Match' : 'Ähnlich';
      const tip = 'Basiert auf Übereinstimmung mit deiner Auswahl: Genre, Tropes, Autor und Suchbegriff.';
      badge = `<div class="match-badge ${cls}" title="${tip}">${lbl}</div>`;
    }
    const bt = book.p || [], mt = bt.filter(t => st.has(t));
    const showT = [...mt, ...bt.filter(t => !st.has(t))].slice(0, 2);
    const tT = showT.map(t => `<span class="trope-tag${mt.includes(t) ? ' hit' : ''}">${t}</span>`).join('');
    const revs = getReviews(book.o);
    let reviewHtml = '';
    if (revs.length) {
      const avg = (revs.reduce((s, r) => s + r.stars, 0) / revs.length).toFixed(1);
      const stars = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
      reviewHtml = `<div class="card-reviews"><span class="card-stars">${stars}</span><span class="card-rev-count">${avg} (${revs.length})</span></div>`;
    } else if (book.gr) {
      const stars = '★'.repeat(Math.round(book.gr)) + '☆'.repeat(5 - Math.round(book.gr));
      reviewHtml = `<div class="card-reviews"><span class="card-stars">${stars}</span><span class="card-rev-count">${book.gr.toFixed(1)}${book.grc ? ` (${book.grc})` : ''}</span></div>`;
    }
    const readStatus = userReadlist.get(String(book.id));
    const coverSrc = book.cover_url || (book.c ? coverUrl(book.c, 'M') : '');
    const imgHtml = coverSrc
      ? `<img src="${coverSrc}" alt="${esc(book.t)}" loading="lazy" class="loading"
           onload="this.classList.remove('loading');this.classList.add('loaded')"
           onerror="this.style.display='none'">`
      : '';
    const quickAddIcon = readStatus ? getReadlistStatuses()[readStatus].icon : '＋';
    const quickAddTitle = readStatus ? `${t('statusLabel') || 'Status'}: ${getReadlistStatuses()[readStatus].label} — klicken um zu ändern` : t('quickAddTitle');
    return `<div class="book-card" data-idx="${idx}" style="animation-delay:${Math.min(i,11)*0.03}s">
      <div class="book-cover" style="background:#e2f4f4">
        ${imgHtml}
        <div class="genre-pill">${genreLabel(book.g)}</div>${badge}
        <button class="card-quick-add ${readStatus ? 'on-list' : ''}" onclick="event.stopPropagation();quickAddToReadlist('${book.id}')" title="${quickAddTitle}">${quickAddIcon}</button>
      </div>
      <div class="card-body">
        <div class="card-title">${esc(book.t)}</div>
        <div class="card-author">${esc(book.a[0] || '')}</div>
        <div class="card-tropes">${tT}</div>
        ${reviewHtml}
        <a class="card-link" href="${book.o && book.o.startsWith('OL') ? `https://openlibrary.org/works/${book.o}` : `https://openlibrary.org/search?q=${encodeURIComponent(book.t)}`}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${t('newTabTooltip')}">${t('buyThalia')} ↗</a>
      </div>
    </div>`;
  }).join('');
}
function renderPag() {
  const tot = Math.ceil(filtered.length / PAGE_SIZE), p = document.getElementById('pagination');
  if (tot <= 1) { p.style.display = 'none'; return; }
  p.style.display = 'flex';
  document.getElementById('pg-info').textContent = `Seite ${pg} von ${tot}`;
  document.getElementById('prev-btn').disabled = pg <= 1;
  document.getElementById('next-btn').disabled = pg >= tot;
}
function prevPage() { if (pg > 1) { pg--; renderGrid(); renderPag(); window.scrollTo({ top: 200, behavior: 'smooth' }); } }
function nextPage() { pg++; renderGrid(); renderPag(); window.scrollTo({ top: 200, behavior: 'smooth' }); }

// ── MODAL ────────────────────────────────────────────
function openModal(idx) {
  const book = getSorted()[idx]; if (!book) return;
  const mc = document.getElementById('m-cover');
  mc.style.background = '#e2f4f4'; mc.innerHTML = '';
  const modalCoverSrc = book.cover_url || (book.c ? coverUrl(book.c, 'L') : '');
  if (modalCoverSrc) {
    const img = document.createElement('img');
    img.src = modalCoverSrc; img.alt = book.t;
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
    mc.appendChild(img);
  }
  document.getElementById('m-genre').textContent = genreLabel(book.g);
  document.getElementById('m-title').textContent = book.t;
  document.getElementById('m-author').textContent = book.a.join(', ') || t('unknownAuthor');
  const meta = []; if (book.y && book.y > 0) meta.push(`<div class="m-meta-item"><strong>${book.y}</strong>${t('firstPublished')}</div>`);
  if (book.gr) {
    const stars = '★'.repeat(Math.round(book.gr)) + '☆'.repeat(5 - Math.round(book.gr));
    meta.push(`<div class="m-meta-item"><strong style="color:#f59e0b">${stars} ${book.gr.toFixed(1)}</strong>${book.grc ? `${book.grc} ${t('ratings')}` : ''}</div>`);
  }
  document.getElementById('m-meta').innerHTML = meta.join('');
  const bt = book.p || [], tw = document.getElementById('m-tropes-wrap');
  if (bt.length) {
    tw.style.display = 'block';
    document.getElementById('m-tropes').innerHTML = bt.map(t => `<span class="m-trope${st.has(t) ? ' hit' : ''}">${t}</span>`).join('');
  } else tw.style.display = 'none';
  document.getElementById('m-subjects').innerHTML = (book.s || []).map(s => `<span class="m-subject">${escH(s)}</span>`).join('');
  const desc = getBookDescription(book);
  const descLang = getBookDescriptionLang(book);
  document.getElementById('m-desc').textContent = desc
    ? desc
    : t('descFallback')(genreLabel(book.g), book.a[0], book.y);
  // Hinweis wenn Beschreibung nur in der anderen Sprache verfügbar
  let descHint = document.getElementById('m-desc-lang-hint');
  if (!descHint) {
    descHint = document.createElement('div');
    descHint.id = 'm-desc-lang-hint';
    descHint.style.cssText = 'font-size:11px;color:var(--muted);margin-top:4px;font-style:italic';
    document.getElementById('m-desc').after(descHint);
  }
  if (desc && descLang && descLang !== currentLang) {
    descHint.textContent = currentLang === 'en' ? 'Description only available in German.' : 'Beschreibung nur auf Englisch verfügbar.';
    descHint.style.display = '';
  } else {
    descHint.style.display = 'none';
  }
  document.getElementById('m-ol').href = book.o && book.o.startsWith('OL')
    ? `https://openlibrary.org/works/${book.o}`
    : `https://openlibrary.org/search?q=${encodeURIComponent(book.t)}`;
  currentBookId = book.o; currentStars = 0;
  document.querySelectorAll('#star-picker button').forEach(b => b.classList.remove('active'));
  document.getElementById('review-text').value = '';
  document.getElementById('review-name').value = '';
  renderModalReadlistBtn(book.o);
  renderReviews(book.o);
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() { document.getElementById('overlay').classList.remove('open'); document.body.style.overflow = ''; }
function overlayClick(e) { if (e.target === document.getElementById('overlay')) closeModal(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── UTILS ────────────────────────────────────────────
function coverUrl(cid, size) { return `https://covers.openlibrary.org/b/id/${cid}-${size}.jpg`; }
// Rundet die Buchanzahl für die Anzeige auf das nächste Tausend ab (z.B. 7342 -> "7.000+"),
// damit nicht die exakte, sich ändernde Zahl im UI steht.
function roundedBookCount(n, locale) {
  const rounded = Math.floor(n / 1000) * 1000;
  return rounded.toLocaleString(locale) + '+';
}
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escH(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
let toastTimer;
function showToast(msg, actionLabel, actionFn) {
  const t = document.getElementById('toast');
  clearTimeout(toastTimer);
  if (actionLabel && actionFn) {
    t.innerHTML = '';
    const span = document.createElement('span');
    span.textContent = msg;
    const btn = document.createElement('button');
    btn.textContent = actionLabel;
    btn.className = 'toast-action';
    btn.onclick = () => { actionFn(); t.classList.remove('show'); clearTimeout(toastTimer); };
    t.appendChild(span);
    t.appendChild(btn);
  } else {
    t.textContent = msg;
  }
  t.classList.add('show');
  toastTimer = setTimeout(() => t.classList.remove('show'), 5000);
}

init();

