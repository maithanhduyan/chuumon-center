class Table {
  constructor(id, name, seats, description) {
    this.id = id;
    this.name = name;
    this.seats = seats;
    this.description = description;
  }

  static async getAll(client) {
    const sql = "SELECT * FROM tables";
    const result = await client.query(sql);
    return result.rows.map(
      (row) => new Table(row.id, row.name, row.seats, row.description)
    );
  }

  static async getById(client, id) {
    const sql = "SELECT * FROM tables WHERE id = $1";
    const result = await client.query(sql, [id]);
    if (!result.rows.length) {
      throw new Error(`Table with id ${id} not found`);
    }
    return new Table(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].seats,
      result.rows[0].description
    );
  }

  static async create(client, data) {
    const sql =
      "INSERT INTO tables (name, seats, description) VALUES ($1, $2, $3) RETURNING *";
    const result = await client.query(sql, [
      table.name,
      table.seats,
      table.description,
    ]);
    return new Table(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].description,
      result.rows[0].seats
    );
  }

  static async update(client, id, data) {
    const sql =
      "UPDATE tables SET name = $1, description = $2, seats = $3 WHERE id = $4 RETURNING *";
    const result = await client.query(sql, [
      table.name,
      table.seats,
      table.description,
      id,
    ]);
    if (!result.rows.length) {
      throw new Error(`Table with id ${id} not found`);
    }
    return new Table(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].seats,
      result.rows[0].description
    );
  }

  static async delete(client, id) {
    const sql = "DELETE FROM tables WHERE id = $1 RETURNING *";
    const result = await client.query(sql, [id]);
    if (!result.rows.length) {
      throw new Error(`Table with id ${id} not found`);
    }
    return new Table(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].seats,
      result.rows[0].description
    );
  }
}

module.exports = Table;
