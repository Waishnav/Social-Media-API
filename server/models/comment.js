const db = require('../utils/db');

class Comment {
  constructor(id, user_id, post_id, body, created_at) {
    this.id = id;
    this.user_id = user_id;
    this.post_id = post_id;
    this.body = body;
    this.created_at = created_at;
  }

  // Return a new Comment object from the result of a database query
  static from(obj) {
    const comment = new Comment(obj.id, obj.user_id, obj.post_id, obj.body, obj.created_at);
    return comment;
  }

  // Create a new comment in the database
  static async create(user_id, post_id, body) {
    const query = `
      INSERT INTO comments (user_id, post_id, body)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await db.query(query, [user_id, post_id, body]);
    return Comment.from(result.rows[0]);
  }

  // Find a comment in the database by id
  static async findById(id) {
    const query = `
      SELECT *
      FROM comments
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      return null;
    }
    return Comment.from(result.rows[0]);
  }

  // Find all comments for a particular post
  static async findByPost(post_id) {
    const query = `
      SELECT *
      FROM comments
      WHERE post_id = $1
      ORDER BY created_at ASC
    `;
    const result = await db.query(query, [post_id]);
    return result.rows.map(Comment.from);
  }

  // Find all comments by a particular user
  static async findByUser(user_id) {
    const query = `
      SELECT *
      FROM comments
      WHERE user_id = $1
      ORDER BY created_at ASC
    `;
    const result = await db.query(query, [user_id]);
    return result.rows.map(Comment.from);
  }

  // Delete a comment from the database
  static async delete(id) {
    const query = `
      DELETE FROM comments
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id]);
    return result.rowCount === 1;
  }
}

module.exports = Comment;
