module.exports = {
  port: process.env.Port || 3000,
  db: process.env.MONGODB || 'mongodb://localhost/shop',
  secretToken: 'secretkeytokens'
}
