const http = require('http');
const request = require('request');

module.exports = async function createProxy(port, ip, target) {
    const server = http.createServer((req, res) => {
        const {
            url: path,
        } = req;

        const url = `${target}${path}`;

        res.setHeader('Access-Control-Allow-Origin', '*');
        req.pipe(request(url)).pipe(res);
    });

    await server.listen(port, ip, () => {
        console.log(`proxying ${target} at http://${ip}:${port}`);
    })

    return server;
}