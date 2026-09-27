# Gotham Rugby — website widgets

Small, dependency-free JS widgets embedded on [gotham.rugby](https://gotham.rugby) (Squarespace).
Served through jsDelivr straight from this repo.

## gk-fixtures.js — "Next up" schedule block

List + calendar view of upcoming practices and matches, styled with the
[Gotham Knights design system](https://github.com/ptcrash/gotham-rugby-design-system).
Renders inside a shadow root so Squarespace CSS can't touch it.

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
- `loc`: field name, or `""` for TBA. Only list a location once the permit is confirmed.

**Roadmap:** replace `EVENTS` with a fetch from the club's public Google Calendars (or a small service in front of them).
