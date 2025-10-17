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

    const level0 = uniqWith(brand.map(i => [null, i[0]]), isEqual)
    const level1 = uniqWith(brand.map(i => [i[0], i[1]]), isEqual)
    const level2 = uniqWith(brand.filter(i => !!i[2]).map(i => [i[1], i[2]]), isEqual)

    fs.writeFileSync(path.join(__dirname, "../data/brands.json"), JSON.stringify({ level0, level1, level2 }, null, 2))
  })
