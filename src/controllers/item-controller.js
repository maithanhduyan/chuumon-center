const pool = require("../database/pool");
const model = require("../models/items");

class ItemController {
  constructor() {}

  async getAll(req, res) {
    const client = await pool.connect();
    try {
      const items = await model.getAll(client);
      res.status(200).json({ items });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  }

  async getById(req, res) {
    const client = await pool.connect();
    try {
      const id = req.params.id;
      const item = await model.getById(client, id);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  }

  async create(req, res) {
    const client = await pool.connect();
    try {
      const item = req.body;
      const createdItem = await model.created(client, item);
      res.status(201).json(createdItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  }

  async update(req, res) {
    const client = await pool.connect();
    try {
      const id = req.params.id;
      const item = req.body;
      const updatedItem = await model.update(client, id, item);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  }

  async delete(req, res) {
    const client = await pool.connect();
    try {
      const id = req.params.id;
      const deletedItem = await model.delete(client, id);
      res.status(200).json(deletedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  }
}

module.exports = ItemController;
