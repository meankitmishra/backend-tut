const express = require('express')
const app = express()

const userVerification=(req,res,next)=>{
    if(req.headers.username!=="ankit"|| req.headers.password!=="bruh"){
        res.status(403).json({
            msg:"User not found"
        })
    }else{
        next();
    }
}

const inputValidation=(req,res,next)=>{
    if(req.query.kidneyid!=1 && req.query.kidneyid != 2){
        res.status(411).json({
            msg: "bad input"
        })
    }else{
        next();
    }
}

// as we see that we are using the userVerification middlewares everywhere so we can use app.use(userVerification)

// app.get('/kidney-checkup',userVerification,inputValidation,(req,res)=>{
//     res.status(200).json({
//         msg:"your kidney is fine"
//     })
// })

// app.get('/heart-checkup',userVerification,(req,res)=>{
//     res.status(200).json({
//         msg:"your heart is fine"
//     })
// })

app.use(userVerification);

app.get('/kidney-checkup',inputValidation,(req,res)=>{
    res.status(200).json({
        msg:"your kidney is fine"
    })
})

app.get('/heart-checkup',(req,res)=>{
    res.status(200).json({
        msg:"your kidney is fine"
    })
})



app.listen(3000)