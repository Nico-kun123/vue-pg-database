import pg from "pg"

const db = new pg.Pool({
  connectionString: `postgres://postgres:123@127.0.0.1/lab2`
});

db.connect((err) => {
  if (err) throw err;
  console.log("\tINFO: База данных PostgreSQL подключена!");
});

export default db;
