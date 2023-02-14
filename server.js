const express = require("express");
const app = express();

// Middleware for parsing incoming request bodies
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const ItemRouter = require('./src/routes/item-route');
const TableRouter = require('./src/routes/table-route');

// Define the routes
app.use(express.json());
app.use('/items', ItemRouter);
app.use('/tables', TableRouter);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
