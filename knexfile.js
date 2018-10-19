module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ajax-blog-dev'
  },
  test: {},
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
