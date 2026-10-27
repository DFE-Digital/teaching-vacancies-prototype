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

1. **Dependencies** — Add `govuk-prototype-kit@14.0.2`; align Node in `package.json` engines with kit (≥ 22).
2. **Config** — Introduce `app/config.json` (v13+ format); retire `app/config.js` when the app is served by the kit package.
3. **Express 5** — Audit custom routes (`server.js`, `app/versions/*/routes`) for [Express 5 changes](https://expressjs.com/en/guide/migrating-5.html).
4. **Frontend** — Plan GOV.UK Frontend **6.x** (kit v14 default) vs current Frontend 4 in Sass/CSS.
5. **Dev workflow** — Move from root `start.js` + Gulp to `npm run dev` via the kit CLI, preserving multi-version mounts and documentation routes.
6. **Verify** — `npm test`, smoke-test `/`, `/1-0/home`, `/1-1/home`, `/1-2/home`, signed-in journeys.

## References

- [Migrate to v13](https://prototype-kit.service.gov.uk/docs/migrate-an-existing-prototype)
- [Update to latest version](https://prototype-kit.service.gov.uk/docs/update-to-latest-version)
- [Kit v14 changelog](https://github.com/alphagov/govuk-prototype-kit/blob/main/CHANGELOG.md)
