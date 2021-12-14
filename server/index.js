const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router")

app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use("/api",router);
app.use(express.static("upload"))

app.listen(3000,() =>{
    console.log(3000);
})