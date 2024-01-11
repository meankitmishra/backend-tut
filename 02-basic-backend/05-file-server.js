const express = require('express')
const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')

const app = express() 

app.get('/files',(req,res)=>{
    fs.readdir(path.join(__dirname,'./files/'),(err,files)=>{
        if(err){
            return res.status(500).json({error:"failed to retrive files"});
        }
        res.json(files)
    });
})

app.get('/files/:filesid',async (req,res)=>{
    fs.readFile(path.join(__dirname,'./files/',req.params.filesid),'utf-8',(err,result)=>{
        if(err){
            return res.status(404).send("file not found")
        }
        const data = result
        res.status(200).json(data) 
    })
})

app.get('*',(req,res)=>{
    res.status(404).send("Page not Found")
})

app.listen(4000,()=>{
    console.log('listenning on port 4000');
})