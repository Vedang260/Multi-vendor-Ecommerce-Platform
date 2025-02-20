require("dotenv").config();

module.exports = {
    services: {
        auth: process.env.AUTH_SERVICE,
        product: process.env.PRODUCT_SERVICE,
        order: process.env.ORDER_SERVICE
    }
};