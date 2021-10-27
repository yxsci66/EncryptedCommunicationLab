// 注意这里的密钥必须是8/16/32位，如果加密算法是128，则对应的密钥是16位，如果加密算法是256，则对应的密钥是32位。
// 0123456789abcdef
const crypto = require('crypto');
const iv = 'fedcba9876543210'
function cipher(str, key, iv = 'fedcba9876543210') {
    try {
        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
    } catch (err) {
        console.log('加密失败');
        return err.message || err;
    }
}

function decipher(str, key, iv = 'fedcba9876543210') {
    try {
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        return decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
    } catch (err) {
        console.log('解密失败');
        return err.message || err;
    }
}

/* const cipherStr = cipher('毛茸茸的金毛春卷贼能吃,每天要吃1斤狗粮', key, iv);
console.log(cipherStr); // b963135b1b28ca318817230c1e3037f10e5febc584839e3792d72626d9566d01c893667a2de00b617d81afade4ea0cba93b25cd111ca216ebca00b35b42748d7
const decipherStr = decipher(cipherStr, key, iv);
console.log(decipherStr); // 毛茸茸的金毛春卷贼能吃,每天要吃1斤狗粮 */
module.exports = {
    cipher,
    decipher
}
