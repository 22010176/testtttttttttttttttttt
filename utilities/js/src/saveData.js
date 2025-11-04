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
  console.log(await pool.query(`DELETE FROM "NganhHang";`))
  const query = `
  INSERT INTO "NganhHang" 
    ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh")
  VALUES 
      ${nganhHang
      // .filter(i => i[1] !== null)
      .map(i => `(${i.Id}, ${i.NganhHangChaId || null}, '${i.TenNganhHang}', ${i.LaNhanh})`).join(',\n')}`

  const result = await pool.query(query)
  console.log(result)

}
InsertNganhHang(data)
  .then(() => {
    pool.end()
  })
