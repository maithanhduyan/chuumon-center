const pool = require("../database/pool");
const model = require("../models/tables");

class TableController {
  constructor() {}

  async getAll(req, res) {
    const client = await pool.connect();
    try {
      const tables = await model.getAll(client);
      res.status(200).json({tables});
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Failed to retrieve tables",
        error: err.message,
      });
    }
  }

  async getById(req, res) {
    const client = await pool.connect();
    try {
      const id = req.params.id;
      const table = await model.getById(client, id);
      if (!table) {
        return res.status(404).send({
          success: false,
          message: "Table not found",
        });
      }
      res.status(200).send({
        success: true,
        data: table,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Failed to retrieve table",
        error: err.message,
      });
    }
  }

  async create(req, res) {
    const client = await pool.connect();
    try {
      const table = await model.create(client, req.body);
      res.status(201).send({
        success: true,
        data: table,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Failed to create table",
        error: err.message,
      });
    }
  }

  async update(req, res) {
    const client = await pool.connect();
    try {
      const table = await model.update(client, req.params.id, req.body);
      if (!table) {
        return res.status(404).send({
          success: false,
          message: "Table not found",
        });
      }
      res.status(200).send({
        success: true,
        data: table,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Failed to update table",
        error: err.message,
      });
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

module.exports = TableController;
