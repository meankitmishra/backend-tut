const express = require('express')
const app = express()


app.use(express.json())

app.post('/health-checkup',(req,res)=>{
    const kidneys = req.body.kidneys
    const kidneyLength = kidneys.length;

    res.send("your kidney length is "+ kidneyLength)
})

app.use((error,req,res,next)=>{
    res.json({
        msg:"something is up with the server"
    })
})

app.listen(3000)