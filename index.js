const express = require('express');
const app = express();

const mongoose = require('mongoose');

// Flow
// Connect
// Define Schema --> Model --> CRUD using Model

// Connection
mongoose.connect("mongodb://localhost:27017/usersdb")
.then(()=>{
    console.log("Connection successfull!");
})
.catch((err)=>{
    console.log("Error: ", err)
})

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    rollNo: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

// Model
const User = mongoose.model('user', userSchema); // user is our collection name

// Middlewares
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res)=>{
    res.send("Hello world");
})

app.get("/users", async(req, res)=>{
    const response = await User.find({});
    const data = await response;

    const viewHTML = `
    <ul>
        ${data.map((user)=>{
            return(
                `<li>${user.firstName} ${user.lastName}</li>`
            )
        }).join("")}
    </ul>
    `
    
    console.log("Users: ", data);

    return res.status(200).send(viewHTML);
})

app.get("/users/create", async(req, res)=>{
    const data = req.body;
    const newUser = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        rollNo: data.rollNo
    })

    return res.status(201).json(newUser);
})

app.route("/users/:id")
.get(async(req, res)=>{
    const getUser = await User.findById(req.params.id)

    return res.status(200).send(getUser);
})
.delete(async(req, res)=>{
    const removeUser = await User.findByIdAndDelete(req.params.id);

    return res.status(200).send(removeUser);
})
.patch(async(req, res)=>{
    const getUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    const updatedInfo = await User.findById(req.params.id);

    return res.status(200).send(updatedInfo);
})

const PORT = 5500;
app.listen(PORT, ()=>{
    console.log(`Running at PORT:${PORT}...`);
})