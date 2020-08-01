const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const Joi = require("joi");
const hbs = require("hbs");
const fs = require("fs");


app.use(bodyParser.urlencoded({extended:true}));

const courses = [
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"}
];
//app.use(express.json());
app.set("view engine","hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear",()=>{
    return new Date().getFullYear();
});
hbs.registerHelper("uppercase",text =>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    let now = new Date();
    let log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +"\n",err =>{
        if(err){
            console.log(err);
        }
    })
    next();
});

// app.use((req,res,next)=>{
//     res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

app.get("/courses",(req,res)=>{
    res.send(courses);
});

app.get("/courses/:id",(req,res)=>{
    let course = courses.find(e => e.id === parseInt(req.params.id));
    if(!course){
        res.send("該当idのコースが見つかりません");
    }
    res.send(course);
});

app.post("/courses",(req,res)=>{

    const schema = {
        name: Joi.string().min(3).required()
    };
    let result = Joi.validate(req.body, schema);
    if (result.error){
        res.send(result.error.details[0].message);
    }

    let course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

app.get("/",(req,res)=>{
    res.render("home.hbs",{
        pageTitle:"HomePage",
        content:"当ホームページへようこそ。"
    });
});

app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pageTitle:"AboutPage",
        content:"コンテンツです。"
    });
});

app.get("/posts/:year/:month",(req,res)=>{
    res.send(`${req.params.year}年,${req.params.month}月の記事です。${req.query}`);
});

app.listen(3000,()=>{
    console.log(`ポート番号${port}で立ち上がりました。`);
});