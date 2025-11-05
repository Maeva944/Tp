const express = require("express");
const usersRouter = require("./Controller/usersController");
const booksRouter = require("./Controller/booksController");
const app = express();
const PORT = 3000;
app.use(express.json()); // pour lire le JSON
app.get("/", (req, res) => {
res.send("Bienvenue sur mon premier serveur Express ");
});
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);

app.listen(PORT, () => {
console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
