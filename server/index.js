const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Product = require("./model/product");
const cors = require('cors'); // Import the cors middleware
async function main(){
 await  mongoose.connect('mongodb://127.0.0.1:27017/dapp',
    { useNewUrlParser: true, useUnifiedTopology: true })
}
main().then(()=>console.log("connected")).catch((err)=>console.log(err))

app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from this origin
}));
app.use(express.json());

app.listen(8080,(req,res)=>{
    console.log("server started");
})


app.get("/",async (req,res)=>{
    try{
    const data = await Product.find();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/cart",(req,res)=>{

})

