const express =require('express')
const app =require("./app")
const dotenv =require('dotenv')
const connectToMongo =require("./config/Db");
app.use(express.json())

dotenv.config({path:"server/config/config.env"});
connectToMongo();

app.listen(process.env.PORT,()=>{
    console.log("sever is listening at port ",process.env.PORT);
})