// npm instal express mongoose multer body-parser helmet morgan cors
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();//core of the express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect("mongodb+srv://ITServices:VaishnaviPadiyaITServices@cluster0.vuiq8nh.mongodb.net/ITEcommerce?retryWrites=true&w=majority")

//app to know about the routes
const UserRoutes = require("./routes/user_routes");
const CategoryRoutes = require("./routes/category_routes");
const ProductRoutes = require("./routes/product_routes");
app.use("/api/user",UserRoutes);//therefore after 
app.use("/api/category",CategoryRoutes);
app.use("/api/product",ProductRoutes);
const PORT = 5000;
app.listen(PORT,()=> console.log(`Server started at PORT: ${PORT}`))