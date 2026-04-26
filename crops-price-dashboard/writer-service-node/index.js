// writer-service-node/index.js
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const dbConfig = {
  host: 'mysql_db',
  user: 'root',
  password: 'rootpassword',
  database: 'cropdata',
};

app.post('/prices', async (req, res) => {
  const { crop_name, region, price, date } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO crop_prices (crop_name, region, price, date) VALUES (?, ?, ?, ?)',
      [crop_name, region, price, date]
    );
    res.status(201).send({ id: result.insertId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Node.js Writer Service listening on port 3001');
});
