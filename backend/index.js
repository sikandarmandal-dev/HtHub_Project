const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoute = require('./auth/login');
const userRegisterRoute = require("./controllers/userRegister");
const tutorRegister = require("./controllers/tutorRegister");
const tutorFindRoute = require("./controllers/tutorFindRoute");
const aiFindRoute = require("./controllers/aiFindRoute");


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
app.use('/api/tutor', tutorRegister);
app.use("/api/tutors", tutorFindRoute);
// app.use("/api/ai", aiFindRoute);


app.get("/", (req, res) => {
    res.send("working")
})
app.listen(port, (req, res) => {
    console.log(`server is running at port number ${port}`)
})
