const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TMDT",
  password: "admin",
  port: 5432
});
const data = require('../data/brands.json');

async function InsertNganhHang(nganhHang = []) {
  const query = `
INSERT INTO "NganhHang" 
  ("Id", "NganhHangChaId", "TenNganhHang")
VALUES 
    ${nganhHang.filter(i => i[1] != null).map(i => `(${i[1].category_id}, ${i[0]?.category_id || null}, '${i[1].category_name}')`).join(',\n')}`

  const result = await pool.query(query)
  console.log(result)
}
InsertNganhHang(data.level0)
  .then(a => InsertNganhHang(data.level1))
  .then(a => InsertNganhHang(data.level2))