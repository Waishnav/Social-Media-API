
const db = require('../utils/db');

class Follower {
  constructor(id, user_id, follower_id) {
    this.id = id;
    this.user_id = user_id;
    this.follower_id = follower_id;
  }

  // Return a new Follower object from the result of a database query
  static from(obj) {
    const follower = new Follower(obj.id, obj.user_id, obj.follower_id);
    return follower;
  }

  // Create a new follower relationship in the database
  static async create(user_id, follower_id) {
    const query = `
      INSERT INTO followers (user_id, follower_id)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await db.query(query, [user_id, follower_id]);
    return Follower.from(result.rows[0]);
  }

  // Find a follower relationship in the database by id
  static async findById(id) {
    const query = `
      SELECT *
      FROM followers
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      return null;
    }
    return Follower.from(result.rows[0]);
  }

  // Find all followers for a particular user
  static async findByUser(user_id) {
    const query = `
      SELECT *
      FROM followers
      WHERE user_id = $1
    `;
    const result = await db.query(query, [user_id]);
    return result.rows.map(Follower.from);
  }

  // Find all users followed by a particular user
  static async findFollowedByUser(follower_id) {
    const query = `
      SELECT *
      FROM followers
      WHERE follower_id = $1
    `;
    const result = await db.query(query, [follower_id]);
    return result.rows.map(Follower.from);
  }

  // Delete a follower relationship from the database
  static async delete(id) {
    const query = `
      DELETE FROM followers
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id]);
    return result.rowCount === 1;
  }
}

module.exports = Follower;
