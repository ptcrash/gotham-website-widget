/* ============================================================
   Gotham Knights — Fixtures widget (v0.1, static data)
   Usage on Squarespace (Code Block):
     a div with id="gk-fixtures-root", then a script tag pointing at this file
   Data: EVENTS below, hand-entered from the Fall/Winter 2026 sheet.
   Rules: location shown only when a permit is confirmed; otherwise TBA.
   ============================================================ */
(function () {
  var host = document.getElementById("gk-fixtures-root");
  if (!host) return;

  // ---- DATA ---------------------------------------------------------
  // t: "match" | "practice"   time: "" = TBA   loc: "" = TBA
  // Match titles: "v X" = home, "@ X" = away
  var EVENTS = [
    { d: "2026-09-29", t: "practice", n: "Practice", time: "7:00 PM", loc: "" },
    { d: "2026-10-01", t: "practice", n: "Practice", time: "7:00 PM", loc: "Randall's Island Field 74" },
    { d: "2026-10-03", t: "match", n: "v Lansdowne", time: "12:00 PM", loc: "Inwood Hill Park", comp: "EGU" },
    { d: "2026-10-06", t: "practice", n: "Practice", time: "7:30 PM", loc: "" },
    { d: "2026-10-08", t: "practice", n: "Practice", time: "7:00 PM", loc: "Randall's Island Field 74" },
    { d: "2026-10-10", t: "match", n: "v Montclair", time: "3:00 PM", loc: "Randall's Island Field 75", comp: "EGU" },
    { d: "2026-10-13", t: "practice", n: "Practice", time: "7:00 PM", loc: "" },
    { d: "2026-10-15", t: "practice", n: "Practice", time: "7:00 PM", loc: "" },
    { d: "2026-10-17", t: "match", n: "v NYRC", time: "12:00 PM", loc: "Inwood Hill Park", comp: "EGU" },
    { d: "2026-10-20", t: "practice", n: "Practice", time: "7:00 PM", loc: "Randall's Island Field 74" },
    { d: "2026-10-22", t: "practice", n: "Practice", time: "7:00 PM", loc: "Randall's Island Field 74" },
    { d: "2026-10-24", t: "match", n: "@ Brooklyn", time: "", loc: "", comp: "EGU" },
    { d: "2026-10-27", t: "practice", n: "Practice", time: "7:30 PM", loc: "" },
    { d: "2026-10-29", t: "practice", n: "Practice", time: "7:00 PM", loc: "Randall's Island Field 74" },
    { d: "2026-10-31", t: "match", n: "Playoffs", time: "", loc: "", comp: "EGU" },
    { d: "2026-11-03", t: "practice", n: "Practice", time: "7:00 PM", loc: "Randall's Island Field 75" },
    { d: "2026-11-05", t: "practice", n: "Practice", time: "7:00 PM", loc: "Randall's Island Field 74" },
    { d: "2026-11-07", t: "match", n: "Playoffs", time: "", loc: "", comp: "EGU" },
    { d: "2026-11-10", t: "practice", n: "Practice", time: "", loc: "" },
    { d: "2026-11-12", t: "practice", n: "Practice", time: "7:00 PM", loc: "Randall's Island Field 74" },
    { d: "2026-11-17", t: "practice", n: "Practice", time: "", loc: "" },
    { d: "2026-11-24", t: "practice", n: "Practice", time: "", loc: "" },
    { d: "2026-12-01", t: "practice", n: "Practice", time: "", loc: "" },
    { d: "2026-12-08", t: "practice", n: "Practice", time: "", loc: "" },
    { d: "2026-12-15", t: "practice", n: "Practice", time: "", loc: "" },
    { d: "2026-12-22", t: "practice", n: "Practice", time: "", loc: "" },
    { d: "2026-12-29", t: "practice", n: "Practice", time: "", loc: "" }
  ];
  var CONFIG = { initial: 6, fullCalendarUrl: "/schedule", season: "Fall / Winter 2026" };

  // ---- SETUP --------------------------------------------------------
  if (!document.querySelector('link[data-gk-fonts]')) {
    var l = document.createElement("link"); l.rel = "stylesheet"; l.setAttribute("data-gk-fonts", "");
    l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Spline+Sans+Mono:wght@500;600&display=swap";
    document.head.appendChild(l);
  }
  // Theme: set data-theme="light|dark" on the root div to force it; otherwise
  // follow the Squarespace section theme (dark/black/bright → dark, else light).
  if (!host.getAttribute("data-theme")) {
    var sec = host.closest("[data-section-theme]");
    var st = sec ? sec.getAttribute("data-section-theme") : "dark";
    host.setAttribute("data-theme", /^(dark|black|bright)(-bold)?$/.test(st) ? "dark" : "light");
  }
  var shadow = host.attachShadow({ mode: "open" });
  var MN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var MNL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var WD = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  function pD(s){ var p = s.split("-").map(Number); return new Date(p[0], p[1]-1, p[2]); }
  function today(){ var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
  function esc(s){ return String(s||"").replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
  function homeAway(e){ if (e.t !== "match") return null; if (/^v\s/i.test(e.n)) return "home"; if (/^@\s/i.test(e.n)) return "away"; return null; }
  function title(e){ return e.t === "match" ? e.n.replace(/^v\s/i, "vs ").replace(/^@\s/i, "at ") : e.n; }

  var events = EVENTS.slice().sort(function(a,b){ return a.d.localeCompare(b.d); });
  var state = { view: "list", filter: "all", expanded: false, cal: null };
  var first = events.filter(function(e){ return pD(e.d) >= today(); })[0];
  var calStart = first ? pD(first.d) : today();
  state.cal = { y: calStart.getFullYear(), m: calStart.getMonth() };

  // ---- STYLES -------------------------------------------------------
  var css = '\
:host{all:initial;display:block;--navy-900:#07112a;--navy-800:#0a1736;--navy-700:#0d1d41;--navy-600:#142a5c;--navy-500:#1d3a78;--navy-300:#6680b8;--navy-200:#aab9d6;--navy-100:#d9e0ef;\
--gold-600:#d99e12;--gold-500:#fec526;--gold-400:#ffd45c;--white:#fff;--blue:#5b8def;\
--font:"Hanken Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;--mono:"Spline Sans Mono",ui-monospace,"SF Mono",Menlo,monospace;\
--border:rgba(255,255,255,.14);--border-strong:rgba(255,255,255,.28);--c-match:var(--gold-500);--c-practice:var(--blue);\
font-family:var(--font);color:var(--navy-100);font-size:16px;line-height:1.4;-webkit-font-smoothing:antialiased}\
*{box-sizing:border-box;margin:0;padding:0}\
.wrap{max-width:760px;margin:0 auto}\
.head{text-align:center;margin-bottom:22px}\
.eyebrow{font-size:.6875rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-500)}\
h2{font-weight:800;font-size:2rem;line-height:1.1;color:var(--white);margin-top:6px;letter-spacing:-.01em;text-wrap:balance}\
.bar{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:18px 0 10px}\
.chip{display:inline-flex;align-items:center;gap:7px;font:600 .8125rem/1 var(--font);padding:9px 13px;border-radius:999px;border:1px solid var(--border-strong);background:transparent;color:var(--navy-100);cursor:pointer;transition:all .12s cubic-bezier(.2,0,0,1)}\
.chip .dot{width:8px;height:8px;border-radius:50%;background:var(--dot)}\
.chip[aria-pressed="true"]{background:var(--white);color:var(--navy-700);border-color:var(--white)}\
.chip:focus-visible,.btn:focus-visible,.tab:focus-visible,.day:focus-visible,.nav:focus-visible{outline:3px solid var(--gold-400);outline-offset:2px}\
.tabs{display:flex;justify-content:center;gap:6px;margin:0 0 22px}\
.tab{font:700 .75rem/1 var(--font);letter-spacing:.12em;text-transform:uppercase;padding:10px 16px;border-radius:6px;border:0;background:var(--navy-800);color:var(--navy-200);cursor:pointer;transition:all .12s}\
.tab[aria-selected="true"]{background:var(--gold-500);color:var(--navy-700)}\
.list{display:grid;gap:10px;list-style:none}\
.row{display:flex;align-items:center;gap:16px;padding:14px 18px 14px 14px;background:var(--navy-600);border:1px solid var(--border);border-left:3px solid var(--tc);border-radius:6px;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}\
.row.past{opacity:.55}\
.date{width:56px;flex:none;text-align:center}\
.date .m{font-size:.6875rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold-500)}\
.date .d{font:600 1.5rem/1 var(--mono);color:var(--white);margin:2px 0;font-variant-numeric:tabular-nums}\
.date .w{font-size:.6875rem;letter-spacing:.08em;text-transform:uppercase;color:var(--navy-200)}\
.main{flex:1;min-width:0}\
.name{font-weight:700;font-size:1.125rem;color:var(--white);line-height:1.2}\
.meta{font-size:.875rem;color:var(--navy-200);margin-top:3px}\
.meta .t{font-family:var(--mono);font-weight:500;color:var(--navy-100)}\
.meta .tba{color:var(--navy-200);font-style:italic}\
.type{font-size:.6875rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--tc);margin-top:7px}\
.ha{flex:none;font-size:.6875rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 9px;border-radius:3px;background:var(--gold-500);color:var(--navy-700)}\
.ha.away{background:transparent;color:var(--navy-100);border:1px solid var(--border-strong)}\
.foot{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:20px}\
.btn{font:700 .9375rem/1 var(--font);padding:13px 20px;border-radius:6px;border:2px solid var(--gold-500);background:var(--gold-500);color:var(--navy-700);cursor:pointer;text-decoration:none;transition:all .12s}\
.btn:hover{background:var(--gold-400);border-color:var(--gold-400)}\
.btn.ghost{background:transparent;color:var(--white);border-color:var(--border-strong)}\
.btn.ghost:hover{background:rgba(255,255,255,.08)}\
.empty{text-align:center;padding:32px 16px;border:1px dashed var(--border-strong);border-radius:6px;color:var(--navy-200)}\
.cal{background:var(--navy-600);border:1px solid var(--border);border-radius:6px;padding:14px}\
.calhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}\
.calhead h3{font-weight:800;font-size:1.125rem;color:var(--white)}\
.nav{border:1px solid var(--border-strong);background:transparent;color:var(--white);width:34px;height:34px;border-radius:6px;cursor:pointer;font-size:1rem}\
.nav:hover{background:rgba(255,255,255,.08)}\
.grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}\
.dow{text-align:center;font-size:.6875rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--navy-200);padding:4px 0 8px}\
.day{position:relative;min-height:60px;border-radius:6px;border:1px solid transparent;background:var(--navy-700);color:var(--navy-200);font:500 .875rem var(--mono);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:6px;cursor:default}\
.day.blank{background:transparent}\
.day.has{color:var(--white);cursor:pointer;border-color:var(--border)}\
.day.has:hover{background:var(--navy-500)}\
.day.today{border-color:var(--gold-500)}\
.day.sel{background:var(--white);color:var(--navy-700)}\
.dots{display:flex;gap:3px;margin-top:4px}\
.dots i{width:6px;height:6px;border-radius:50%;background:var(--dc);display:block}\
.daylist{margin-top:12px;display:grid;gap:8px}\
.legend{display:flex;gap:14px;justify-content:center;margin-top:12px;font-size:.75rem;color:var(--navy-200)}\
.legend span{display:inline-flex;align-items:center;gap:6px}.legend i{width:8px;height:8px;border-radius:50%;display:inline-block}\
\
:host([data-theme="light"]){--ink-900:#11151f;--ink-700:#353b49;--ink-500:#5d6473;--ink-300:#b6bcc8;--ink-200:#dde0e7;--ink-100:#eef0f4;--paper-2:#f3ecdc;--gold-700:#b8810a;\
color:var(--ink-700);--border:var(--ink-200);--border-strong:var(--ink-300);--c-practice:var(--navy-500)}\
:host([data-theme="light"]) .eyebrow{color:var(--gold-700)}\
:host([data-theme="light"]) h2{color:var(--navy-700)}\
:host([data-theme="light"]) .chip{color:var(--ink-700);border-color:var(--ink-300)}\
:host([data-theme="light"]) .chip[aria-pressed="true"]{background:var(--navy-700);color:var(--white);border-color:var(--navy-700)}\
:host([data-theme="light"]) .chip[data-k="practice"] .dot{background:var(--navy-500)}\
:host([data-theme="light"]) .tab{background:var(--ink-100);color:var(--ink-700)}\
:host([data-theme="light"]) .tab[aria-selected="true"]{background:var(--navy-700);color:var(--white)}\
:host([data-theme="light"]) .row{background:var(--white);border-color:var(--ink-200);border-left-color:var(--tc);box-shadow:0 2px 6px rgba(7,17,42,.08)}\
:host([data-theme="light"]) .date .m{color:var(--gold-700)}\
:host([data-theme="light"]) .date .d{color:var(--navy-700)}\
:host([data-theme="light"]) .date .w{color:var(--ink-500)}\
:host([data-theme="light"]) .name{color:var(--navy-700)}\
:host([data-theme="light"]) .meta{color:var(--ink-500)}\
:host([data-theme="light"]) .meta .t{color:var(--ink-900)}\
:host([data-theme="light"]) .meta .tba{color:var(--ink-500)}\
:host([data-theme="light"]) .type{color:var(--tc)}\
:host([data-theme="light"]) .row[style*="c-match"] .type{color:var(--gold-700)}\
:host([data-theme="light"]) .ha.away{color:var(--navy-700);border-color:var(--ink-300)}\
:host([data-theme="light"]) .btn.ghost{color:var(--navy-700);border-color:var(--ink-300)}\
:host([data-theme="light"]) .btn.ghost:hover{background:var(--ink-100)}\
:host([data-theme="light"]) .empty{border-color:var(--ink-300);color:var(--ink-500)}\
:host([data-theme="light"]) .cal{background:var(--white);border-color:var(--ink-200)}\
:host([data-theme="light"]) .calhead h3{color:var(--navy-700)}\
:host([data-theme="light"]) .nav{color:var(--navy-700);border-color:var(--ink-300)}\
:host([data-theme="light"]) .nav:hover{background:var(--ink-100)}\
:host([data-theme="light"]) .dow{color:var(--ink-500)}\
:host([data-theme="light"]) .day{background:var(--ink-100);color:var(--ink-500)}\
:host([data-theme="light"]) .day.has{background:var(--white);color:var(--navy-700);border-color:var(--ink-200)}\
:host([data-theme="light"]) .day.has:hover{background:var(--paper-2)}\
:host([data-theme="light"]) .day.sel{background:var(--navy-700);color:var(--white)}\
:host([data-theme="light"]) .legend{color:var(--ink-500)}\
@media (max-width:520px){.row{gap:12px;padding:12px}.name{font-size:1rem}.ha{display:none}h2{font-size:1.625rem}.day{min-height:34px;font-size:.75rem}}\
@media (prefers-reduced-motion:reduce){*{transition:none!important}}';

  // ---- RENDER -------------------------------------------------------
  shadow.innerHTML = '<style>' + css + '</style><div class="wrap">'
    + '<div class="head"><div class="eyebrow">' + esc(CONFIG.season) + '</div><h2>Next up</h2></div>'
    + '<div class="bar" role="group" aria-label="Filter"></div>'
    + '<div class="tabs" role="tablist"></div>'
    + '<div class="body"></div><div class="foot"></div></div>';
  var barEl = shadow.querySelector(".bar"), tabsEl = shadow.querySelector(".tabs"), bodyEl = shadow.querySelector(".body"), footEl = shadow.querySelector(".foot");

  function color(e){ return e.t === "match" ? "var(--c-match)" : "var(--c-practice)"; }
  function label(e){ return e.t === "match" ? (e.comp || "Match") : "Practice"; }
  function filtered(){ return events.filter(function(e){ return state.filter === "all" || e.t === state.filter; }); }

  function rowHTML(e, isPast){
    var d = pD(e.d), ha = homeAway(e);
    var time = e.time ? '<span class="t">' + esc(e.time) + '</span>' : '<span class="tba">Time TBA</span>';
    var loc = e.loc ? esc(e.loc) : '<span class="tba">Location TBA</span>';
    return '<li class="row' + (isPast ? ' past' : '') + '" style="--tc:' + color(e) + '">'
      + '<div class="date"><div class="m">' + MN[d.getMonth()] + '</div><div class="d">' + d.getDate() + '</div><div class="w">' + WD[d.getDay()] + '</div></div>'
      + '<div class="main"><div class="name">' + esc(title(e)) + '</div><div class="meta">' + time + ' &middot; ' + loc + '</div><div class="type">' + esc(label(e)) + '</div></div>'
      + (ha === "home" ? '<span class="ha">Home</span>' : ha === "away" ? '<span class="ha away">Away</span>' : '')
      + '</li>';
  }

  function renderBar(){
    var chips = [{ k:"all", l:"All" }, { k:"match", l:"Matches", c:"var(--c-match)" }, { k:"practice", l:"Practice", c:"var(--c-practice)" }];
    barEl.innerHTML = chips.map(function(c){
      return '<button class="chip" type="button" data-k="' + c.k + '" aria-pressed="' + (state.filter===c.k) + '"' + (c.c ? ' style="--dot:' + c.c + '"' : '') + '>' + (c.c ? '<span class="dot"></span>' : '') + c.l + '</button>';
    }).join("");
    barEl.querySelectorAll(".chip").forEach(function(b){ b.onclick = function(){ state.filter = b.dataset.k; state.expanded = false; render(); }; });
    tabsEl.innerHTML = ['list','calendar'].map(function(v){
      return '<button class="tab" role="tab" data-v="' + v + '" aria-selected="' + (state.view===v) + '">' + (v==='list' ? 'Upcoming' : 'Calendar') + '</button>';
    }).join("");
    tabsEl.querySelectorAll(".tab").forEach(function(b){ b.onclick = function(){ state.view = b.dataset.v; render(); }; });
  }

  function renderList(){
    var up = filtered().filter(function(e){ return pD(e.d) >= today(); });
    var shown = state.expanded ? up : up.slice(0, CONFIG.initial);
    bodyEl.innerHTML = shown.length ? '<ol class="list">' + shown.map(function(e){ return rowHTML(e, false); }).join("") + '</ol>'
      : '<div class="empty">Nothing scheduled yet. Check back soon.</div>';
    footEl.innerHTML = (up.length > CONFIG.initial ? '<button class="btn" type="button" data-more>' + (state.expanded ? 'Show fewer' : 'Show all ' + up.length) + '</button>' : '')
      + '<a class="btn ghost" href="' + esc(CONFIG.fullCalendarUrl) + '">Full calendar</a>';
    var m = footEl.querySelector("[data-more]"); if (m) m.onclick = function(){ state.expanded = !state.expanded; render(); };
  }

  function renderCal(){
    var y = state.cal.y, m = state.cal.m, firstDow = new Date(y, m, 1).getDay(), days = new Date(y, m+1, 0).getDate(), td = today();
    var byDay = {}; filtered().forEach(function(e){ (byDay[e.d] = byDay[e.d] || []).push(e); });
    var cells = '';
    for (var i = 0; i < firstDow; i++) cells += '<div class="day blank"></div>';
    for (var d = 1; d <= days; d++) {
      var key = y + '-' + String(m+1).padStart(2,'0') + '-' + String(d).padStart(2,'0'), evs = byDay[key] || [];
      var isT = td.getFullYear()===y && td.getMonth()===m && td.getDate()===d;
      cells += '<div class="day' + (evs.length ? ' has' : '') + (isT ? ' today' : '') + (state.sel===key ? ' sel' : '') + '"' + (evs.length ? ' tabindex="0" role="button" data-d="' + key + '"' : '') + '>' + d
        + (evs.length ? '<div class="dots">' + evs.map(function(e){ return '<i style="--dc:' + color(e) + '"></i>'; }).join('') + '</div>' : '') + '</div>';
    }
    var selEvs = state.sel ? (byDay[state.sel] || []) : [];
    bodyEl.innerHTML = '<div class="cal"><div class="calhead"><button class="nav" data-nav="-1" aria-label="Previous month">&lsaquo;</button><h3>' + MNL[m] + ' ' + y + '</h3><button class="nav" data-nav="1" aria-label="Next month">&rsaquo;</button></div>'
      + '<div class="grid">' + WD.map(function(w){ return '<div class="dow">' + w + '</div>'; }).join('') + cells + '</div>'
      + '<div class="legend"><span><i style="background:var(--c-match)"></i>Match</span><span><i style="background:var(--c-practice)"></i>Practice</span></div></div>'
      + (selEvs.length ? '<ol class="list daylist">' + selEvs.map(function(e){ return rowHTML(e, pD(e.d) < td); }).join('') + '</ol>' : '');
    bodyEl.querySelectorAll("[data-nav]").forEach(function(b){ b.onclick = function(){ var nm = m + Number(b.dataset.nav); state.cal = { y: y + Math.floor(nm/12), m: ((nm%12)+12)%12 }; state.sel = null; render(); }; });
    bodyEl.querySelectorAll("[data-d]").forEach(function(c){ var f = function(){ state.sel = state.sel === c.dataset.d ? null : c.dataset.d; render(); }; c.onclick = f; c.onkeydown = function(ev){ if (ev.key==='Enter'||ev.key===' ') { ev.preventDefault(); f(); } }; });
    footEl.innerHTML = '<a class="btn ghost" href="' + esc(CONFIG.fullCalendarUrl) + '">Full calendar</a>';
  }

  function render(){ renderBar(); if (state.view === "list") renderList(); else renderCal(); }
  render();
})();
