const express = require('express')
const jwt = require('jsonwebtoken')
const jwtPassword = '123456'
const app = express();

app.use(express.json())

const allUsers = [
    {
        username: "ankit@gmail.com",
        password: "123",
        name:"Ankit Kumar Mishra"
    },
    {
        username:"muzan@gmail.com",
        password:"111",
        name:"kutta hai"
    },
    {
        username:"malay@gmail.com",
        password:"222",
        name:"bada wala kutta"
    }
]

function userExists(username,password){
    return allUsers.find(user => username === user.username && password === user.password)
}

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username,password)){
        res.status(403).json({
            success: false,
            message: "Invalid username or password"
        })
        return;
    }

    let token = jwt.sign({username:username} , jwtPassword)
    return res.json({
        success: true,
        message: "Authentication successful",
        token: token
    })

})

app.get('/users',(req,res)=>{
    const token = req.headers["authorization"];

    try {
        const decoded = jwt.verify(token, jwtPassword)
        const username = decoded.username; 
        res.json({
            users: allUsers.filter(user => user.username !== username)
        }) 
    } catch (error) {
        res.status(403).json({
            success: false,
            message: "Invalid token"
        })
    }

})

app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})