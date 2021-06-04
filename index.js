import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/",(res,res)=>{
    res.send("Welcome to proedge task backend")
})

app.get("/result/:roll",async (req,res)=>{

    const arr = req.params.roll.split(',');
    var result = [];

    await Promise.all(
        arr.map(async (data)=>{
            var response = await fetch("http://proedge.me/test.php?rollnumber="+data,{
                method:"GET",
                headers: {"Content-type":"application/json"}
            })
            response =  await response.text();
            result.push({
                rollNo: Number(data),
                result: response
            });
        })
    );
    
    res.send(result);
    result = [];

})


app.listen(port,()=>{
    console.log(`backend is running on http://localhost:${port}`);
})