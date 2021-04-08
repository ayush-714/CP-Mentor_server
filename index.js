const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const { Schema } = mongoose;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors());
app.use(express.json());


const mongo_pass='mongodb+srv://Class:ayush123@cluster0.j8pws.mongodb.net/Cp_Mentor';
mongoose.connect(mongo_pass, { useNewUrlParser: true, useUnifiedTopology: true });
const userInfo = new Schema({
    _id: String, // String is shorthand for {type: String}
    Code_Forces: String,
    Password: String,
    Level: Number
});
const Quelist = new Schema({
    name: String,
contestid:Number ,
type: String,
done: Number
});
const Info = new mongoose.model("users", userInfo);
const AllQue = new mongoose.model("questions", Quelist);


app.post('/add', function (req,res){
setTimeout(function(){  const user=req.body.user;
    const cfid=req.body.cfid;
    const pass=req.body.pass;
   
    
    const docUment = new Info({
        _id: user, // String is shorthand for {type: String}
    Code_Forces: cfid,
    Password: pass,
    Level: 1
    });
    const found = 0;
      
    // console.log()
    Info.countDocuments({ _id: user })
        .then((count) => {
            if (count > 0) {

                
            } else {
                docUment.save();
            }
        });
},2000);
  

});

app.get('/getall', function (req,res){
    AllQue.find({}, function (err, arr) {
       
        if (err) {
            console.log(err);
          } else {
            JSON.stringify(arr);
            var temp=[],temp1=[];
            for(var i=0;i<arr.length;i++){
                // var temp2 = JSON.parse(temp);
                temp.push(arr[i]);
            }
            console.log(temp[0])
            for(var i=0;i<arr.length;i++){
                // var temp2 = JSON.parse(temp);
                const js=temp[i].Que;
                console.log(js);
                temp1.push(temp[i]);
            }
            console.log(temp1)
            setTimeout(function(){
            res.send(temp);
        },1000)
            // console.log(arr);
          }

        
    });
});

app.get('/update', function (req,res){
    
    Info.find({}, function (err, arr) {
       
        if (err) {
            console.log(err);
          } else {
            res.send(arr);
            // console.log(arr);
          }

        
    });

});



app.post('/userquestions',function (req,res){
var allque=[];
const user=req.body.id;
console.log(user);
request({
    url: "https://codeforces.com/api/user.status?handle="+user+"&from=1&count=1000",
    json: true
    
},(err,response,body)=>{
    // console.log(body.result);
    res.send(body);
    // allque=body;
});
});

app.post('/userdetails', function (req,res){
      
    request({
        url: "https://codeforces.com/api/user.info?handles="+req.body.id,
        json: true
    },(err,response,body)=>{
        // console.log(body.result[0]);
        var name;
        if(body.result[0].firstName===" ")
         name=" ";
         else{
             name=body.result[0].firstName;
         }
        const output ={
            Name:name,
            Imageurl:body.result[0].titlePhoto,
            Ratting:body.result[0].rating
        }

        JSON.stringify(output);
        res.send(output);
        // allque=body;
    });
});



app.get('/', function (req,res){
    res.send(Hello);    
});



app.post('/userdetailssss', function (req,res){
      
    request({
        url: "https://codeforces.com/api/user.info?handles="+req.body.id,
        json: true
    },(err,response,body)=>{
        // console.log(body.result[0]);
        var name;
        if(body.result[0].firstName===" ")
         name=" ";
         else{
             name=body.result[0].firstName;
         }
        const output ={
            Name:name,
            Imageurl:body.result[0].titlePhoto,
            Ratting:body.result[0].rating
        }

        JSON.stringify(output);
        res.send(output);
        // allque=body;
    });
});

app.listen(process.env.PORT || 3002, function () {
    console.log("Running on port ");
});
