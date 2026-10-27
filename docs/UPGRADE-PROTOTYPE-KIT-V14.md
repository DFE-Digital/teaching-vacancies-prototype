# Upgrade to GOV.UK Prototype Kit v14

**Status: complete on `main`.** Hybrid setup: Kit **14.0.2** dependencies, Frontend **6**, Express **5**, custom `server.js` and `/1-0` / `/1-1` / `/1-2` mounts retained. Dev: `npm run dev`.

Baseline before this work: **Prototype Kit 12.0.4** (embedded kit with custom `server.js`, version mounts `1-0` / `1-1` / `1-2`).

## Git baseline

| Item | Value |
|------|--------|
| Pre-upgrade tag | `prototype-kit-12.0.4` |
| Post-upgrade tag | `prototype-kit-14.0.2` on `main` |
| Upgrade branch | `upgrade/prototype-kit-v14` (merged; safe to delete locally/remotely) |
| Target kit | [v14.0.2](https://prototype-kit.service.gov.uk/docs/update-to-latest-version) (Node **≥ 22**) |

Restore the pre-upgrade tree anytime:

```bash
git checkout prototype-kit-12.0.4
```

## Automated migration (`npx govuk-prototype-kit migrate`)

**Not run successfully** on this repository. Preflight checks expect a standard pre-v13 zip kit, including:

- `app/views/layout.html`
- `app/views/index.html`

This prototype uses **Nunjucks** (`layout.njk`) and a **custom `server.js`**. The stock migrator would also remove `server.js`, `start.js`, and `gulpfile.js`, which would break version routing and existing build steps until those are reimplemented on top of the npm kit.

See `migrate.log` in the repo root for CLI output.

## Planned phases (manual)

1. **Dependencies** — Add `govuk-prototype-kit@14.0.2`; align Node in `package.json` engines with kit (≥ 22). Root `package.json` / `VERSION.txt` set to **14.0.2**; footers use `{{ releaseVersion }}`.
2. **Config** — Introduce `app/config.json` (v13+ format); retire `app/config.js` when the app is served by the kit package.
3. **Express 5** — Done for current custom routes (see below). Root `express` bumped to **^5.2.1** to match kit v14.
4. **Frontend** — **GOV.UK Frontend 6.x** installed; Sass uses `dist/` + `$govuk-prototype-kit-major-version: 14`; ES module scripts via `extensionConfig.scripts`. Visual smoke on all versions still required.
5. **Dev workflow** — Done (hybrid): `npm run dev` → `lib/dev-server.js` (Kit-style nodemon + notices); `npm start` / `npm run serve` → `lib/prototype-serve.js`. Config from **`app/config.json`** via `lib/load-config.js`. Custom **`server.js`** + **`app/versions/mount.js`** unchanged. Legacy `start.js` delegates to dev-server. Full **`govuk-prototype-kit dev`** (stock server/plugins) not used — would drop version mounts.
6. **Verify** — See [Phase 6 results](#phase-6-results) below.

### Express 5 audit (phase 3)

| Check | Result |
|-------|--------|
| `req.param(` | None |
| `app.del` | None |
| `router.all('*', …)` in version routers | Replaced with `router.use(…)` (same behaviour, Express 4/5 safe) |
| `/compare/live/*` in v1.1 / v1.2 `jobs.js` | Renamed to `/compare/live/*splat` |
| Preflight script | `node scripts/check-express5-routes.js` |

After `npm install`, run `node scripts/check-express5-routes.js` and `npm test` before merging the upgrade branch.

### Frontend 6 (phase 4)

| Area | Change |
|------|--------|
| `govuk-frontend` | **^6.5.1** (via npm; aligns with kit v14) |
| Main Sass | `$govuk-prototype-kit-major-version: 14` before `lib/extensions/extensions` |
| Patterns | Removed `$legacy` on `govuk-colour()`; dropped `govuk-if-ie8` in sub-navigation |
| Scripts | `extensionConfig.scripts` is `{ src, type? }`; `type="module"` for kit JS |
| Assets | `/dist/govuk/assets` served under `/extension-assets/govuk-frontend/...` |

### Phase 6 results

| Step | Result (Oct 2026) |
|------|-------------------|
| `gulp generate-assets` | Pass |
| `jest` | **74** tests pass |
| `npm run lint` (`standard`) | **Fail** — long-standing style issues across legacy routes, `app/assets/javascripts`, version copies, etc. (not introduced by Kit 14) |
| Upgrade-related JS (`lib/dev-server.js`, `lib/load-config.js`, …) | Lint clean |
| Manual smoke | `npm run dev` — port 3000; confirm `/`, `/1-0/home`, `/1-1/home`, `/1-2/home` in browser |

**Practical gate after upgrade:** `gulp generate-assets && npm run rapidtest`. Treat full `npm test` as a separate lint cleanup epic unless CI requires it.

### Dev workflow (phase 5)

| Command | Entry |
|---------|--------|
| `npm run dev` | `lib/dev-server.js` — Gulp `generate-assets`, `watch-prototype`, nodemon → `listen-on-port.js` |
| `npm start` / `npm run serve` | `lib/prototype-serve.js` — build assets, then `listen-on-port.js` (production default) |
| Config | `app/config.json` + env; `app/config.js` re-exports `lib/load-config.js` |
| Heroku | `Procfile` → `node lib/prototype-serve.js` |

## References

- [Migrate to v13](https://prototype-kit.service.gov.uk/docs/migrate-an-existing-prototype)
- [Update to latest version](https://prototype-kit.service.gov.uk/docs/update-to-latest-version)
- [Kit v14 changelog](https://github.com/alphagov/govuk-prototype-kit/blob/main/CHANGELOG.md)
