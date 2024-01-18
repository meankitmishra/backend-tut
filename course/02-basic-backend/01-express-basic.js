const express = require ('express')

const app = express()

app.get('/',(req,res)=>{
    res.status(200).send('hello world')
}).get('/about',(req,res)=>{
    res.status(200).send('this is some of our information')
}).get('*',(req,res)=>{
    res.status(404).send('<h1>Page not Found</h1>')
}).listen(3000,()=>{
    console.log("listening on port 3000");
})