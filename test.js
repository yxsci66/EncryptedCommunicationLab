const rsa = require('./rsa')
const fs = require('fs');
const aes = require('./src/aes');
/* let pk = fs.readFileSync('./Alice/pa.pem');
let sk = fs.readFileSync('./Alice/sa.pem');
let txt = fs.readFileSync('./Bob/aes.txt','utf8');
let tok = fs.readFileSync('./Alice/ta.txt');
let en = rsa.publicEncrypt(txt, pk);
let de = rsa.privateDecrypt(sk, tok, en);
console.log(txt);
console.log(en);
console.log(de); */
// rsa.createKeyPairFile('./Alice/','hello');
/* let me = fs.readFileSync('./Alice/message.txt','utf8');
let en = aes.cipher(me, '0132456789abcdef');
let de = aes.decipher(en, '0132456789abcdef');
console.log(me);
console.log(en);
console.log(de); */
/* let pk = fs.readFileSync('./Alice/pa.pem', 'utf8');
let sk = fs.readFileSync('./Alice/sa.pem', 'utf8');
let sign = rsa.privateSign(sk, 'hello', 'asd')
console.log(en);
console.log(de);  */
/* let sk = fs.readFileSync('./CA/sca.pem', 'utf8');
let phrase = fs.readFileSync('./CA/tca.txt', 'utf8');
let me = fs.readFileSync('./CA/pa.pem', 'utf8');
let data = rsa.privateSign(sk, phrase, me);
fs.writeFileSync('./CA/card.txt', data);
let sign = fs.readFileSync('./CA/card.txt');
let pk = fs.readFileSync('./CA/pca.pem', 'utf8');
let vr = rsa.publicVerify(pk, me, sign);
console.log(sign)
console.log(vr) */



