/* ============================================================
   Gotham Knights — Stat row (homepage "We Are Knights" band)
   Usage: a div with id="gk-stats-root", then a script tag pointing here.
   Numbers live in STATS below. Mono figures, uppercase labels, gold rule.
   ============================================================ */
(function () {
  var host = document.getElementById("gk-stats-root");
  if (!host) return;

  var STATS = [
    { n: "2001", l: "Founded" },
    { n: "2", l: "Competitive sides" },
    { n: "2026", l: "Bingham Shield champions" }
  ];

  if (!document.querySelector('link[data-gk-fonts]')) {
    var l = document.createElement("link"); l.rel = "stylesheet"; l.setAttribute("data-gk-fonts", "");
    l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Spline+Sans+Mono:wght@500;600&display=swap";
    document.head.appendChild(l);
  }
  var shadow = host.attachShadow({ mode: "open" });
  shadow.innerHTML = '<style>\
:host{all:initial;display:block;--navy-100:#d9e0ef;--navy-200:#aab9d6;--gold-500:#fec526;--white:#fff;\
--font:"Hanken Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;--mono:"Spline Sans Mono",ui-monospace,"SF Mono",Menlo,monospace;font-family:var(--font)}\
*{box-sizing:border-box;margin:0;padding:0}\
.row{display:flex;justify-content:center;gap:0;max-width:760px;margin:0 auto}\
.stat{flex:1;text-align:center;padding:12px 16px;border-left:1px solid rgba(255,255,255,.18)}\
.stat:first-child{border-left:0}\
.n{font:600 2.5rem/1 var(--mono);color:var(--gold-500);font-variant-numeric:tabular-nums;letter-spacing:-.02em}\
.l{margin-top:8px;font-size:.6875rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy-200);text-wrap:balance}\
@media (max-width:560px){.row{flex-direction:column;gap:0}.stat{display:flex;align-items:baseline;justify-content:center;gap:12px;border-left:0;border-top:1px solid rgba(255,255,255,.18);padding:12px 0}.stat:first-child{border-top:0}.n{font-size:1.75rem}.l{margin:0}}\
</style><div class="row">' + STATS.map(function (s) {
    return '<div class="stat"><div class="n">' + s.n + '</div><div class="l">' + s.l + '</div></div>';
  }).join("") + '</div>';
})();
