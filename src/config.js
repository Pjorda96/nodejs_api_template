module.exports = {
  port: process.env.Port || 5000,
  db: process.env.PROD
    ? 'mongodb:prod-database-url'
    : 'mongodb://localhost/nodejsapi', // TODO: change
  secretToken: 'secretkeytoken' // TODO: change
}
