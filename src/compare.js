const fs = require('fs');

module.exports = function (file1, file2) {
    const str1 = fs.readFileSync(file1, 'utf8');
    const str2 = fs.readFileSync(file2, 'utf8');
    if (str1 === str2) {
        return 'Succeed, hash-value is equal';
    }
    return 'Failed, hash-value is different';
}