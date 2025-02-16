const User = require('../models/users');

async function handleViewUsers(req, res){
    const response = await User.find({});
    const data = await response;

    const viewHTML = 
    `<ul>
        ${data.map((user)=>{
            return(
                `<li>${user.firstName} ${user.lastName}</li>`
            )
        }).join("")}
    </ul>`

    console.log("Users: ", data);

    return res.status(200).send(viewHTML);
}

async function handleCreateUser (req, res){
    const data = req.body;
    const newUser = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        rollNo: data.rollNo
    })

    return res.status(201).json(newUser);
}

async function handleGetUser (req, res){
    const getUser = await User.findById(req.params.id)

    return res.status(200).send(getUser);
}

async function handleDeleteUser (req, res){
    const removeUser = await User.findByIdAndDelete(req.params.id);

    return res.status(200).send(removeUser);
}

async function handleUpdateUser (req, res){
    const getUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    const updatedInfo = await User.findById(req.params.id);

    return res.status(200).send(updatedInfo);
}

module.exports = {
    handleCreateUser,
    handleDeleteUser,
    handleGetUser,
    handleViewUsers,
    handleUpdateUser
}