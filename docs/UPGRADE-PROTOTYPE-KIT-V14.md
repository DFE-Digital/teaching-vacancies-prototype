# Upgrade to GOV.UK Prototype Kit v14

Baseline before this work: **Prototype Kit 12.0.4** (embedded kit with custom `server.js`, version mounts `1-0` / `1-1` / `1-2`).

## Git baseline

| Item | Value |
|------|--------|
| Annotated tag | `prototype-kit-12.0.4` on commit before upgrade work |
| Upgrade branch | `upgrade/prototype-kit-v14` |
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
6. **Verify** — `npm test`, smoke-test `/`, `/1-0/home`, `/1-1/home`, `/1-2/home`, signed-in journeys.

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
