//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res){
  var pythoncode = req.body.pcode;
// console.log(pythoncode);
  var data = {
    "source_code": pythoncode,
    "language_id": "34"
  };
 var jsonData = JSON.stringify(data);

  var option = {
    url: 'https://api.judge0.com/submissions/?base64_encoded=false&wait=false',
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonData
  };

  request(option, function(error, response, body){
    if(error){
      console.log("ERROR");
    }else{
      console.log(response.body);
    }
  });

});

app.listen("3000", function(){
  console.log("Server Started:3000");
});
