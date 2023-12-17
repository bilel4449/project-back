const express=require('express');
const connectDB = require('./config/connectDB');
const user=require('./routes/user');
const rdv=require('./routes/rdv');
require('dotenv').config({path:"./config/.env"})
const app=express();
connectDB();
app.use(express.json());
app.use('/user',user)
app.use('/rdv',rdv)
app.use((req,res)=>{
    res.send("API is running...")
})
app.listen(5000,err=>err?console.error(err):console.log('server running on port 5000'));