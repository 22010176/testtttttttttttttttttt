const axios = require('axios')
const { isEqual, uniqWith } = require('lodash')
const fs = require('fs')
const path = require('path')

Promise.all([
  axios.get('https://banhang.shopee.vn/help/api/v3/global_category/list/?page=1&size=1000&SPC_CDS=2637e93c-8def-4fc6-80a5-d54aceb4dd6a&SPC_CDS_VER=2')
    .then(data => data.data.data.global_cats),
  axios.get('https://banhang.shopee.vn/help/api/v3/global_category/list/?page=2&size=1000&SPC_CDS=2637e93c-8def-4fc6-80a5-d54aceb4dd6a&SPC_CDS_VER=2')
    .then(data => data.data.data.global_cats)])
  .then(result => {
    brand = result.flat().map(i => i.path)

    const level0 = uniqWith(
      brand.flatMap(i => i.map((item, index, array) => ({
        Id: item.category_id,
        NganhHangChaId: array[index - 1]?.category_id || null,
        TenNganhHang: item.category_name
      }))),
      (a, b) => a.Id === b.Id
    )

    fs.writeFileSync(path.join(__dirname, "../../data/brands.json"), JSON.stringify(level0, null, 2))
    fs.writeFileSync(path.join(__dirname, "../../../server/SeedData/brands.json"), JSON.stringify(level0, null, 2))
  })
