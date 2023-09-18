const express = require("express");
const app = express();
// const mongoose = require("mongoose");
require("../src/db/conn");

app.use(express.json()); // if you dont write it then in terminal the data shown undefined

const MensRanking = require("../src/models/mens");

const port = process.env.PORT || 8000;

// app.get("/",async (req,res)=>{
//     res.send("jai shree ram");
// })
app.post("/mens",async(req,res)=>{
    try {
       const addmensrecord = new MensRanking(req.body)
       console.log(req.body);
       const insertmen = await addmensrecord.save();
       res.send(insertmen);
    } catch (e) {
        res.send(e);
    }
})


app.get("/mens",async(req,res)=>{
    try {
        const getmens = await MensRanking.find({}).sort({ "ranking":1});
        res.status(202).send(getmens);
    } catch (error) {
        res.status(404).send(error);
    }
})
app.get("/mens/:id",async(req,res)=>{
    try {
        const _id = req.params.id;
        const getmen = await MensRanking.findById({_id});
        res.send(getmen);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.patch("/mens/:id",async(req,res)=>{
    try {
        const _id = req.params.id;
        const getmen = await MensRanking.findByIdAndUpdate(_id, req.body,{
            new:true
        });
        res.send(getmen);
    } catch (error) {
        res.status(400).send(error);
    }
})
app.delete("/mens/:id",async(req,res)=>{
    try {
        // const _id = req.params.id;
        const getmen = await MensRanking.findByIdAndDelete(req.params.id);
        res.send(getmen);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen((port),()=>{
    console.log(`connection is live at port ${port}`);
})