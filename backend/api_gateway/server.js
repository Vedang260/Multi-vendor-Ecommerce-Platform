const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoute");
const orderRoutes = require("./routes/orderRoute");
const productRoutes = require("./routes/productRoute");

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`API Gateway running on PORT:`, PORT);
});