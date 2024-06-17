const mysql = require('mysql2');
module.exports=function()
{
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat_app"
  });
  
  return con;
}