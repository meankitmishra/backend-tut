const express = require('express')
const zod = require('zod')

const app = express()
const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})


app.use(express.json())

app.post('/health-checkup',(req,res)=>{
    const response = schema.safeParse(req.body)
    if(!response.success){
        res.json({
            msg:"error with your input"
        })
        return
    }
    res.json({response})
})

app.listen(3000)