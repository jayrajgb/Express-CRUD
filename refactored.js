const express = require('express');
const app = express();
const { connectDB } = require('./collection');
const userRouter = require('./routes/users');

// Connect
connectDB("mongodb://localhost:27017/usersdb")
.then(()=>{
    console.log("Connection successfull!");
})
.catch((err)=>{
    console.log("Error: ", err)
})

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Use userRouter when a request is on "/users"
app.use("/users", userRouter);

// Routes
app.get("/", (req, res)=>{
    res.send("Hello world");
})

const PORT = 5500;
app.listen(PORT, ()=>{
    console.log(`Running at PORT:${PORT}...`);
})