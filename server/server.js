const express =require('express')
const app =require("./app")
const dotenv =require('dotenv')
const connectToMongo =require("./config/Db");
app.use(express.json())

dotenv.config({path:"server/config/config.env"});
connectToMongo();

console.log("this is server");
app.get('/', (req, res) => {
    res.send('hello world')
  })
  
app.listen(process.env.PORT,()=>{
    console.log("server is listening at port := ",process.env.PORT);
});
console.log("this is server");