const db = require("../utils/db");

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    // this.created_at = created_at;
  }

  // Return a new User object from the result of a database query
  static from(obj) {
    const user = new User(
      obj.id,
      obj.username,
      obj.email,
      obj.password,
    );
    return user;
  }

  // Create a new user in the database
  static async create({username, email, password}) {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await db.query(query, [username, email, password]);
    return User.from(result.rows[0]);
  }

  // Find a user in the database by id
  static async findById(id) {
    const query = `
      SELECT *
      FROM users
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      return null;
    }
    return User.from(result.rows[0]);
  }

  // Find a user in the database by email
  static async findByEmail(email) {
    const query = `
      SELECT *
      FROM users
      WHERE email = $1
    `;
    const result = await db.query(query, [email]);
    if (result.rowCount === 0) {
      return null;
    }
    return User.from(result.rows[0]);
  }

  // find all the users from database
  static async findAll() {
    const query = `
      SELECT *  
      FROM users
    `;
    const result = await db.query(query);
    return result.rows.map(User.from);
  }

  // Update a user's email in the database
  static async updateEmail(id, email) {
    const query = `
      UPDATE users
      SET email = $2
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id, email]);
    return User.from(result.rows[0]);
  }

  // Update a user's password in the database
  static async updatePassword(id, password) {
    const query = `
      UPDATE users
      SET password = $2
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id, password]);
    return User.from(result.rows[0]);
  }
  static async updateUsername(id, username) {
    const query = `
      UPDATE users
      SET username = $2
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id, username]);
    return User.from(result.rows[0]);
  }
  // login user in /api/authenticate
  static async login(email, password) {
    const query = `
      SELECT *
      FROM users
      WHERE email = $1 AND password = $2
    `;
    const result = await db.query(query, [email, password]);
    return User.from(result.rows[0]);
  }
  // checkPassword returns true if the password matches the user's password
  static async checkPassword(email, password) {
    const query = `
      SELECT *
      FROM users
      WHERE email = $1 AND password = $2
    `;
    const result = await db.query(query, [email, password]);
    if (result.rowCount === 0) {
      return false;
    }
    return true;
  }
}

module.exports = User;
