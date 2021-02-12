module.exports = {
  port: process.env.Port || 5000,
  db: {
    // mongo config
    url: 'mongodb://localhost/nodejsapi', // TODO: change
    mongoConfig: { useNewUrlParser: true, useUnifiedTopology: true },

    // sql local config
    host: 'localhost',
    user: 'root',
    password: '', // change for mac
    port: 3306,
    database: 'nodejstemplate' // TODO: change
  },
  secretToken: 'secretkeytoken', // TODO: change
  tokenDuration: 8 // TODO: change (in hours)
}
