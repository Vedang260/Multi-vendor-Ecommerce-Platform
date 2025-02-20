const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { services } = require("../config/service");
const router = express.Router();

router.use(
    "/",
    createProxyMiddleware({
        target: services.order,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
            console.log(`Proxying request to backend at port 8002`);
        },
    })
);

module.exports = router;