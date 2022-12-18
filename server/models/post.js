const db = require('../utils/db');

class Post {
  constructor(id, user_id, content) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    // this.created_at = created_at;
  }

  // Return a new Post object from the result of a database query
  static from(obj) {
    const post = new Post(obj.id, obj.user_id, obj.content,); //obj.created_at);
    return post;
  }

  // Create a new post in the database
  static async create(user_id, content) {
    const query = `
      INSERT INTO posts (user_id, content)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await db.query(query, [user_id, content]);
    return Post.from(result.rows[0]);
  }

  // Find a post in the database by id
  static async findById(id) {
    const query = `
      SELECT *
      FROM posts
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      return null;
    }
    return Post.from(result.rows[0]);
  }

  // Find all posts in the database
  static async findAll() {
    const query = `
      SELECT *
      FROM posts
      ORDER BY created_at DESC
    `;
    const result = await db.query(query);
    return result.rows.map(Post.from);
  }

  // Find all posts by a particular user
  static async findByUser(user_id) {
    const query = `
      SELECT *
      FROM posts
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const result = await db.query(query, [user_id]);
    return result.rows.map(Post.from);
  }

  // Delete a post from the database
  static async delete(id) {
    const query = `
      DELETE FROM posts
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id]);
    return result.rowCount === 1;
  }
}

module.exports = Post;
