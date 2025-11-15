// server.js
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

// абсолютный путь до папки build
const distPath = path.join(__dirname, "build");

// раздаём статику из build
app.use(express.static(distPath));

// для SPA: все остальные запросы отдаем index.html
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
