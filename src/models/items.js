class Item {
  constructor(id, name, price, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }

  static async getAll(client) {
    const sql = "SELECT * FROM items";
    const result = await client.query(sql);
    return result.rows.map(
      (row) => new Item(row.id, row.name, row.price, row.description)
    );
  }

  static async getById(client, id) {
    const sql = "SELECT * FROM items WHERE id = $1";
    const result = await client.query(sql, [id]);
    if (!result.rows.length) {
      throw new Error(`Item with id ${id} not found`);
    }
    return new Item(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].description
    );
  }

  static async create(client, item) {
    const sql =
      "INSERT INTO items (name, description, price) VALUES ($1, $2, $3) RETURNING *";
    const result = await client.query(sql, [
      item.name,
      item.price,
      item.description,
    ]);
    return new Item(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].description
    );
  }

  static async update(client, id, item) {
    const sql =
      "UPDATE items SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *";
    const result = await client.query(sql, [
      item.name,
      item.price,
      item.description,
      id,
    ]);
    if (!result.rows.length) {
      throw new Error(`Item with id ${id} not found`);
    }
    return new Item(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].description
    );
  }

  static async delete(client, id) {
    const sql = "DELETE FROM items WHERE id = $1 RETURNING *";
    const result = await client.query(sql, [id]);
    if (!result.rows.length) {
      throw new Error(`Item with id ${id} not found`);
    }
    return new Item(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].price,
      result.rows[0].description
    );
  }
}

module.exports = Item;
