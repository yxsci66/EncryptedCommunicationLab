const http = require('http')
const fs = require('fs')
const getFilename = require('./src/getFilename')
const compare = require('./src/compare');
const sendFile = require('./src/sendFile');
const rsa = require('./src/rsa');
const hash = require('./src/hash');
const aes = require('./src/aes');


const server = http.createServer(function (request, response) {
    const parsedUrl = new URL(request.url, "http://localhost:3000");

    if (parsedUrl.pathname == '/readdir') {
        response.writeHead(200);
        const paths = ['./CA', './Alice', './transfer', './Bob'];
        const strs = paths.map(function (e) {
            return getFilename(e);
        });
        response.end(JSON.stringify(strs));
        return;
    }

    if (parsedUrl.pathname == '/read') {
        const query = parsedUrl.searchParams;
        const path = query.get('path');
        response.writeHead(200);
        response.end(fs.readFileSync(path));
        return;
    }

    if (parsedUrl.pathname == '/write') {
        const query = parsedUrl.searchParams;
        const [path, cont] = [query.get('path'), query.get('cont')];
        fs.writeFileSync(path, cont);
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/compare') {
        const query = parsedUrl.searchParams;
        const [path1, path2] = [query.get('path1'), query.get('path2')];
        response.writeHead(200);
        response.end(compare(path1, path2));
        return;
    }

    if (parsedUrl.pathname == '/send') {
        const query = parsedUrl.searchParams;
        const [path1, file1, path2, file2] = [query.get('path1'), query.get('file1'), query.get('path2'), query.get('file2')];
        sendFile(path1, file1, path2, file2);
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/generate') {
        const query = parsedUrl.searchParams;
        const [sk, pk, tokenp] = [query.get('path1'), query.get('path2'), query.get('tokenp')];
        let token = fs.readFileSync(tokenp);
        rsa.createKeyPairFile(sk, pk, token);
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/rsa-encrypt') {
        const query = parsedUrl.searchParams;
        const [floder1, file1, floder2, file2] = [query.get('floder1'), query.get('file1'), query.get('floder2'), query.get('file2')];
        let data = fs.readFileSync(floder1 + file1, 'utf8');
        let pk = fs.readFileSync(floder2 + file2);
        let res = rsa.publicEncrypt(data, pk);
        fs.writeFileSync(floder1 + 'enaes.txt', res);
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/rsa-decrypt') {
        const query = parsedUrl.searchParams;
        const [floder1, file1, floder2, file2] = [query.get('floder1'), query.get('file1'), query.get('floder2'), query.get('file2')];
        let txt = fs.readFileSync(floder1 + file1);
        let sk = fs.readFileSync(floder2 + file2);
        let phrase = fs.readFileSync(floder1 + 'ta.txt');
        let res = rsa.privateDecrypt(sk, phrase, txt);
        fs.writeFileSync(floder1 + 'aes.txt', res);
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/aes-e') {
        const query = parsedUrl.searchParams;
        const [floder1, file1, floder2, file2] = [query.get('floder1'), query.get('file1'), query.get('floder2'), query.get('file2')];
        let message = fs.readFileSync(floder1 + file1, 'utf8');
        // let enmessage = fs.readFileSync(floder2 + file2);
        let key = fs.readFileSync(floder1 + 'aes.txt', 'utf8');
        let res = aes.cipher(message, key);
        fs.writeFileSync(floder2 + file2, res, 'utf8');
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/aes-d') {
        const query = parsedUrl.searchParams;
        const [floder1, file1, floder2, file2] = [query.get('floder1'), query.get('file1'), query.get('floder2'), query.get('file2')];
        let enmessage = fs.readFileSync(floder1 + file1, 'utf8');
        // let message = fs.readFileSync(floder2 + file2);
        let key = fs.readFileSync(floder1 + 'aes.txt', 'utf8');
        let res = aes.decipher(enmessage, key);
        fs.writeFileSync(floder2 + file2, res, 'utf8');
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/sign') {
        const query = parsedUrl.searchParams;
        const [floder, file1, file2, tokenp] = [query.get('floder'), query.get('file1'), query.get('file2'), query.get('tokenp')];
        let sk = fs.readFileSync(floder + file1);
        let token = fs.readFileSync(tokenp);
        let key = fs.readFileSync(floder + file2);
        let res = rsa.privateSign(sk, token, key);
        if (floder == './CA/') {
            fs.writeFileSync(floder + 'card.txt', res);
        }
        if (floder == './Alice/') {
            fs.writeFileSync(floder + 'sign.txt', res);
        }
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/verify') {
        const query = parsedUrl.searchParams;
        const [floder, file1, file2, tokenp] = [query.get('floder'), query.get('file1'), query.get('file2'), query.get('tokenp')];
        let pk = fs.readFileSync(floder + file1);
        let sign = fs.readFileSync(tokenp);
        let key = fs.readFileSync(floder + file2);
        let bool = rsa.publicVerify(pk, key, sign);
        response.writeHead(200);
        if (bool) {
            response.end('Successfully verified!');
        } else {
            response.end('Failed to verify!');
        }
        return;
    }

    if (parsedUrl.pathname == '/hash') {
        const query = parsedUrl.searchParams;
        const [path1, path2] = [query.get('path1'), query.get('path2')];
        hash(path1, path2);
        response.writeHead(200);
        response.end();
        return;
    }

    if (parsedUrl.pathname == '/favicon.ico') {
        response.writeHead(200);
        response.end();
        return;
    }


    if (parsedUrl.pathname == '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(response);
    }
})
server.listen(3000)