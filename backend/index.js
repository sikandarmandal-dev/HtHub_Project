const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoute = require('./auth/login');
const userRegisterRoute = require("./controllers/userRegister");

let app = express();
let port = 8080;

app.use(cors());
app.use(express.json());

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/HtHub');
}

app.use('/api/auth', loginRoute);
app.use('/api/auth', userRegisterRoute);


app.get("/", (req, res) => {
    res.send("working")
})
app.listen(port, (req, res) => {
    console.log(`server is running at port number ${port}`)
})
