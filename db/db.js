const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbName = path.join(__dirname, 'greetings.sqlite')
const db = new sqlite3.Database(dbName)

db.serialize(() => {
  const sql = `
  CREATE TABLE IF NOT EXISTS greetings
    (id integer primary key, pname, image, age, message TEXT)
  `
  db.run(sql)
})

class Greetings {
  static all (callback) {
    db.all('SELECT * FROM greetings', callback)
  }

  static find (id, callback) {
    db.get('SELECT * FROM greetings WHERE id = ?', id, callback)
  }

  static create (greeting, callback) {
    const sql = 'INSERT INTO greetings(pname, age, image, message) VALUES (?, ?, ?, ?)'
    db.run(sql, greeting.pname, greeting.age, greeting.image, greeting.message, callback)
  }

  static delete (id, callback) {
    if (!id) {
      return callback(new Error('Please provide an id'))
    }
    db.run('DELETE FROM greetings WHERE id = ?', id, callback)
  }
}

module.exports = db
module.exports.Greetings = Greetings
