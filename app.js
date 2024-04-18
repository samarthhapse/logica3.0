const express=require('express');
const app=express();
// const serverless= require("serverless-http")
const port= process.env.port || 8000; 
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://samarthhapse97:Ki5HsoL8LM4AV9u1@cluster0.0noddkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    TxnId: String,
});
const FeedbackSchema = new mongoose.Schema({
    query: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

app.use('/static',express.static('static'));  
app.use(express.urlencoded()); 

app.set('view engine','html') 
app.set('views',path.join(__dirname,'views'));

app.get("/",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/index.html');
});
app.post("/contact",(req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("Thanks ! our experts will contact you soon......... ")
    })
    .catch(()=>{
        res.status(404).send("Not found");
    })
});
app.listen(port,()=>{
    console.log(`App successfully started on ${port}`)
});