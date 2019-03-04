const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/runtime.js',
    './dist/polyfills.js',
    './dist/scripts.js',
    './dist/main.js',
  ]
  await fs.ensureDir('../LibraryDistributionBuild')
  await concat(files, '../LibraryDistributionBuild/index.js');
  await fs.copyFile('./dist/styles.css', '../LibraryDistributionBuild/styles.css')
  await fs.copy('./dist/assets/', '../LibraryDistributionBuild/assets/' )

})()