// 配置代理中间件，以进行连接、表达、浏览器同步等。
const { createProxyMiddleware } = require("http-proxy-middleware");

// 配置代理服务
const apiProxy = createProxyMiddleware(
    "/api", {
        target: "http://139.196.48.129:12345",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/"
        }
    },
);


module.exports = function(app) {
	app.use(apiProxy);
    app.use('apc',createProxyMiddleware({
        target:'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        changeOrigin:true,
        pathRewrite:{
            '^/apc':'',
        }
    }))
}

