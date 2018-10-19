
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blog_data', function(table) {
    table.increments('id')
    table.string('title', 255).notNullable().defaultTo('')
    table.text('content').notNullable().defaultTo('')
    //table.timestamps(true, true)
  })

}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('blog_data')
};
