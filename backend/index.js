const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
let app = express();

let port = 8080;

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/HtHub');
}
app.use(cors());

app.get("/", (req, res) => {
    res.send("working")
})
app.listen(port, (req, res) => {
    console.log(`server is running at port number ${port}`)
})
