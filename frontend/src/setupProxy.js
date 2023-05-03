const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            //target: 'http://localhost:8080', //접속하려는 서버의 루트 URL
            target: 'http://15.164.7.163:8080',
            changeOrigin: true,
        })
    );
};

