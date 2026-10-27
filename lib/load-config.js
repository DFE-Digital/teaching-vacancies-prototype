/**
 * Project config via Kit v14 loader (app/config.json + env).
 * Exports legacy string booleans for existing server.js and middleware.
 */
const { getConfig } = require('govuk-prototype-kit/lib/config.js')

function asLegacyString (value) {
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (value === undefined || value === null) return undefined
  return String(value)
}

function getLegacyConfig () {
  const kit = getConfig()

  return {
    serviceName: kit.serviceName,
    port: String(kit.port),
    useAuth: asLegacyString(kit.useAuth),
    useAutoStoreData: asLegacyString(kit.useAutoStoreData),
    useCookieSessionStore: asLegacyString(kit.useCookieSessionStore ?? false),
    useDocumentation: asLegacyString(kit.useDocumentation ?? true),
    useHttps: asLegacyString(kit.useHttps),
    useBrowserSync: asLegacyString(kit.useBrowserSync),
    baseExtensions: kit.basePlugins || kit.baseExtensions
  }
}

module.exports = getLegacyConfig()
module.exports.getKitConfig = getConfig
module.exports.getLegacyConfig = getLegacyConfig
