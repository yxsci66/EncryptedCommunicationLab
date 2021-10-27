const fs = require('fs');
const path = require('path');

module.exports = function (floder1, file1, floder2, file2) {
    floder1 = floder1.trim();
    floder2 = floder2.trim();
    if (floder2 === './Bob/') {
        fs.copyFileSync(path.join(floder1, file1), path.join('./transfer/', file2));
    }
    if (floder1 === './Bob/') {
        fs.copyFileSync(path.join(floder1, file1), path.join('./transfer/', file1));
    }

    fs.copyFileSync(path.join(floder1, file1), path.join(floder2, file2));
}

