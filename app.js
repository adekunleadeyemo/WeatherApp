const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{

   res.sendFile(__dirname + "/index.html");
   

});


app.post("/",(req,res)=>{
    
    const units = "metric";
    const city = req.body.city;   
    const apiKey ="4669c05d08d0a03798120a039734f7e0";
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units='+units;
       https.get(url, (response) => {
   
         response.on("data", (data)=>{
             const weatherData = JSON.parse(data);
             const temp = weatherData.main.temp;
             const weatherDiscription = weatherData.weather[0].description;
             const weatherIcon = weatherData.weather[0].icon;
             console.log(temp);
             console.log( weatherDiscription);
             const urlImg = "http://openweathermap.org/img/wn/" +weatherIcon+"@2x.png";
             
             res.write("<h1>the temperature is " +temp+ " degrees</h2>");
             res.write("<h1>the temperature description is " +weatherDiscription+ "type</h2>")
             res.write("<img src="+urlImg+">");
             res.send();
         });
       });
});

app.listen(3000, ()=>{
    console.log("port is running on 3000");
});


 /*
*/
