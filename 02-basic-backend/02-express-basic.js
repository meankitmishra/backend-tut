const express = require ('express')
const bodyParser = require ('body-parser') //used to parse req.body 
const app = express()

const user = {
    user:"Ankit",
    age: 21
}


//middlewares
app.use(bodyParser.json({}))

app.get('/',(req,res)=>{
    res.status(200).send('hello world')
}).get('/about',(req,res)=>{
    res.status(200).send('this is some of our information')
}).get('/route-handler',(req,res)=>{
    res.status(200).json(user)
}).get('*',(req,res)=>{
    res.status(404).send('<h1>Page not Found</h1>')
})

app.post('/batchit',(req,res)=>{
    console.log(req.headers["authorization"]);
    console.log(req.body)
    res.json({
        msg: "2 + 2 = 4"
    })
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})