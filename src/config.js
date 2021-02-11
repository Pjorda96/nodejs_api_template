module.exports = {
  port: process.env.Port || 5000,
  db: {
    url: 'mongodb://localhost/nodejsapi', // TODO: change
    mongoConfig: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  secretToken: 'secretkeytoken', // TODO: change
  tokenDuration: 8 // TODO: change (in hours)
}
