const crypto = require('crypto');
const fs = require('fs');


/* 
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

var r = hash.digest('hex');
console.log(`md5 hash: ${r}`); // 7e1977739c748beac0c0fd14fd26a544
 */

/**
 * 
 * @param {string} path1 
 * @param {string} path2 
 */
module.exports = function (path1, path2) {
    const hash = crypto.createHash('md5');
    let data = fs.readFileSync(path1, 'utf8');
    hash.update(data);
    let hashv = hash.digest('hex');
    fs.writeFileSync(path2, hashv, 'utf8');
}