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
      // res.send(response.body);
      // console.log(response.body);
      // console.log(response.body["token"]);
      var obj = JSON.parse(response.body);
      newtoken = obj.token;
      console.log(newtoken);
    }

    var option2 = {
      url: 'https://api.judge0.com/submissions/'+newtoken,
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
      // body: jsonData2
    };

setTimeout(function () {
    // console.log(url);
    request(option2, function(error, response, body){
      if(error){
        console.log(error);
      }else{
        // console.log(response);
        var obj2 = JSON.parse(response.body);
        console.log(obj2);
        // console.log(res);
        console.log(obj2.stdout);
        // res.send(obj2.stdout);
        res.send({output : obj2.stdout});


      }
    });
}, 2000);
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
  console.log("Server Started:3000");
});
