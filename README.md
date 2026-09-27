# Gotham Rugby — website widgets

Small, dependency-free JS widgets embedded on [gotham.rugby](https://gotham.rugby) (Squarespace).
Served through jsDelivr straight from this repo.

## gk-fixtures.js — "Next up" schedule block

List + calendar view of upcoming practices and matches, styled with the
[Gotham Knights design system](https://github.com/ptcrash/gotham-rugby-design-system).
Renders inside a shadow root so Squarespace CSS can't touch it. Follows the Squarespace
section theme automatically (dark sections → navy register, light sections → paper register);
force one with `data-theme="light"` or `"dark"` on the root div.

**Embed (Squarespace Code Block):**

```html
<div id="gk-fixtures-root"></div>
<script src="https://cdn.jsdelivr.net/gh/ptcrash/gotham-website-widget@<commit-sha>/gk-fixtures.js"></script>
```

Pin to a commit SHA, not `@main` — jsDelivr caches branch URLs for up to 12 hours.
After every data change: commit, push, update the SHA in the Code Block.

**Data:** the `EVENTS` array at the top of the file.
- `t`: `"match"` or `"practice"`
- `n`: match title `"v Opponent"` (home) or `"@ Opponent"` (away); `"Playoffs"` etc. for placeholders
- `time`: `"7:00 PM"` or `""` for TBA
- `loc`: venue, or `""` for TBA (matches). Practices are always "Randall's Island · Field NN"; use "Randall's Island · Field TBA" until the permit is confirmed.

**Roadmap:** replace `EVENTS` with a fetch from the club's public Google Calendars (or a small service in front of them).

## Credit

Inspired by [SimonCzaplinski/nyifc-widget](https://github.com/SimonCzaplinski/nyifc-widget),
the hand-rolled schedule widget behind [NY International FC](https://www.nyintfc.com). Same idea —
one small JS file, GitHub as the CMS, jsDelivr as the CDN, list-first with a calendar view — rebuilt
on the Gotham Knights design system. Thanks, Simon.
