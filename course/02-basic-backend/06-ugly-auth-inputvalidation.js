const express = require('express')
const app = express()
const port = 3000;

app.get('/health-checkup',(req,res)=>{
    const username = req.headers.username
    const password = req.headers.password
    const kidneyId = req.query.kidneyid

    if(username!=="ankit" || password!=="bruh"){
        res.status(403).json({
            msg: "not a valid user"
        })
        return
    }

    if(kidneyId!=1 && kidneyId != 2){
        res.status(411).json({
            msg: "bad input"
        })
        return
    }


    res.json({
        msg: 'your kidney is fine'
    })
   
})

app.listen(port, ()=>{
    console.log("listening on port 3000");
})
