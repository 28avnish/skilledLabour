const express = require("express");
const router= express.Router();

const Service= require('../models/service')

router.get("/getallservices",async(req,res)=>{

    try {
        const services= await Service.find();
     res.send(services);
    } catch (error) {
        return res.status(400).json({message:error});
    }
})

router.post("/getservicebyid",async(req,res)=>{
    const serviceid= req.body.serviceid

    try {
        const service= await Service.findOne({_id: serviceid});
     res.send(service );
    } catch (error) {
        return res.status(400).json({message:error});
    }
})

router.post("/addservice", async(req,res)=>{
try {
    const newservice=  new Service(req.body)
    await newservice.save
    res.send("New service added successfully")
} catch (error) {
    return res.status(400).json({ error: 'Error addservice' });
}
})

module.exports= router;
