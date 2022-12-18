const db = require('../utils/db');

class Like {
  constructor(id, user_id, post_id) {
    this.id = id;
    this.user_id = user_id;
    this.post_id = post_id;
  }

  // Return a new Like object from the result of a database query
  static from(obj) {
    const like = new Like(obj.id, obj.user_id, obj.post_id);
    return like;
  }

  // Create a new like in the database
  static async create(user_id, post_id) {
    const query = `
      INSERT INTO likes (user_id, post_id)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await db.query(query, [user_id, post_id]);
    return Like.from(result.rows[0]);
  }

  // Find a like in the database by id
  static async findById(id) {
    const query = `
      SELECT *
      FROM likes
      WHERE id = $1
    `;
    const result = await db.query(query, [post_id]);
    return result.rows.map(Like.from);
  }

  // Find all likes by a particular user
  static async findByUser(user_id) {
    const query = `
      SELECT *
      FROM likes
      WHERE user_id = $1
    `;
    const result = await db.query(query, [user_id]);
    return result.rows.map(Like.from);
  }

  // Delete a like from the database
  static async delete(id) {
    const query = `
      DELETE FROM likes
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id]);
    return result.rowCount === 1;
  }
}

module.exports = Like;
