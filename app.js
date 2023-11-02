const express = require("express");
const app = express();

const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "moviesData.db");
let db = null;

const initializeDBAndServer = () => {
  try {
    db = open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running successfully");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const getBooksQuery = `
    SELECT
      *
    FROM
      movie`;
  const getBookResponse = await db.all(getBooksQuery);

  response.send(movieId);
});
