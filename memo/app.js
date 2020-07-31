

const fs = require("fs");
const os = require("os");
const notes = require("./notes.js");

let user = os.userInfo();
console.log(user);
let result = notes.addNote();
console.log(result);

// fs.appendFile("greeting.txt","Hello," + user.username + "! あなたは" + notes.age + "歳です。",function(){
//     if(err){
//         console.log(err);
//     }
// });