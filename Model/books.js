const pool = require("../config/db_pg");

async function getAllBooks(){
    const result = await pool.query("SELECT * FROM books");
    return result.rows;
}

async function addBook(title, author, available){
    const result = await pool.query(
        "INSERT INTO books (title, author, available) VALUES ($1, $2, $3) RETURNING *",
        [title, author, available]
    );
    return result.rows[0];
}

module.exports = {
    getAllBooks,
    addBook
};