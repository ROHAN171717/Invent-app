require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const path = require("path");

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

//ROUTES MIDDLEWARE
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contact", contactRoute);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ERROR MIDDLEWARE
app.use(errorHandler);

//MONGODB CONNECTION
mongoose.set("strictQuery", true);
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION SUCCESSFULL...:)");
  })
  .catch((err) => {
    console.log(err, "<-- error from DB CONNECTION");
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
