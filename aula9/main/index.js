const express = require("express");
const { contactRoute } = require("./routes");

const app = express();

app.use(express.json());
app.use("/contact", contactRoute);

app.listen(3000);
