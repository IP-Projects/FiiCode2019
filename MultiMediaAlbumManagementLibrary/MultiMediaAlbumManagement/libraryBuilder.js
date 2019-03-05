const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/runtime.js',
    './dist/polyfills.js',
    './dist/scripts.js',
    './dist/main.js',
  ]
  await fs.ensureDir('../DistributionPackage')
  await concat(files, '../DistributionPackage/index.js');
  await fs.copyFile('./dist/styles.css', '../DistributionPackage/styles.css')
  await fs.copy('./dist/assets/', '../DistributionPackage/assets/' )

})()