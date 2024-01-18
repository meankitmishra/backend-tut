/*

get: to get any data from the server
post: to post any req
put: to edit any data on the server(or DB) 
delete: to delete something from the server(or DB)

*/

const express = require('express')
const app = express()
const port = 4000;

let users = [{
    name:"john",
    kidneys:[{
        healthy: true
    }]
}]

app.use(express.json())

app.get('/',(req,res)=>{
    
    const kidneys = users[0].kidneys
    const healthyKidneys = kidneys.filter(kidney=>kidney.healthy === Boolean(true))
    const noOfKidneys = kidneys.length
    const noOfHealthyKidneys = healthyKidneys.length
    const noOfUnhealthyKidneys = kidneys.length - noOfHealthyKidneys
    res.json({
        noOfKidneys,
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    })
})

app.post('/',(req,res)=>{
    const isHealthy =req.body.isHealthy
    users[0].kidneys.push({
        healthy: isHealthy
    })

    res.json({
        msg: "done"
    })
})

app.put('/',(req,res)=>{
    kidneys = users[0].kidneys
    const healthyKidneys = kidneys.filter(kidney=>kidney.healthy === Boolean(true))
    if(kidneys.length === healthyKidneys.length){
        res.status(411).json({msg:"no unhealthy kidenys to cure"})
    }else{
        kidneys.map(kidney=>kidney.healthy = true)
        res.json ({
            msg : "done"
        })
    }
    
})

app.delete('/',(req,res)=>{
    const newKidneys = []
    const kidneys = users[0].kidneys
    const healthyKidneys = kidneys.filter(kidney=>kidney.healthy === Boolean(true))
    if(kidneys.length===healthyKidneys.length){
        res.status(411).json({msg: "no unhealthy kidney"})
    }else{
        kidneys.map((kidney)=>{
            if(kidney.healthy){
                newKidneys.push({
                    healthy : true
                })
            }
        })
        
        users[0].kidneys = newKidneys
    
        res.json({})
    }
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})