const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});