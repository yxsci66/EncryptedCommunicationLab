const fs = require('fs');

module.exports = function (path) {
    return fs.readdirSync(path.trim());
}