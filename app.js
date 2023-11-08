//先安裝node.js與以下模組(npm install)
// npm install
// npm install express
// npm install body-parser
// npm install express-session
// npm install ejs
// npm install mysql
// 以 Express 建立 Web 伺服器
var express = require("express");
var app = express();

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Web 伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
app.listen(8000);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");

//設定SQL(需打開MAMP)
var mysql = require("mysql");
var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost", // localhost, 127.0.0.1
    port: 3306,
    database: "bulletin_board"
});

//get方法 (SQL) 
//取全部

//app.get("/自訂名稱/自訂名稱", function (輸入, 輸出) {
app.get("/message_board", function (req, res) {
    // connection.query("SQL指令", [參數], function(錯誤訊息,輸出結果){})
    connection.query(
        "select * from news",
        [],
        function (error, result) {
            res.send(JSON.stringify(result));
        }
    )
})

//取單一物件 使用id
//app.get("/自訂名稱/自訂名稱/:id", function (輸入, 輸出) {
app.get("/message_board/:id", function (req, res) {
    // connection.query("SQL指令 ?=參數", [參數1,參數2], function(錯誤訊息,輸出結果){})
    connection.query(
        "select * from news where newsId = ?",
        [req.params.id],
        //req.params指所有來源參數(:id)
        function (error, result) {
            if (result.length <= 0) {
                res.send("{}")

            }
            else {
                res.send(JSON.stringify(result[0]));
            }

        }
    )

})

app.post('/message_board', function (req, res) {
    connection.query(
        'insert into news(title,ymd) value (?,?)',
        [req.body.title, req.body.ymd],
        function (error, result) {
            console.log(result)
            res.send("OK, row(s) inserted")
        }
    )
})

//修改
app.put("/message_board", function (request, response) {
    connection.query(
        "update news set title = ?, ymd = ? where newsId = ?",
        [
            request.body.title,
            request.body.ymd,
            request.body.newsId
        ]);
    response.send("row updated.");
})

//刪除
app.delete('message_board',function (req,res) {
    connection.query(
        "delete from news where newsId = ?",
        [request.body.newsId]
    );
    res.send("row deleted.");
})




//----使用ejs
//安裝 npm install ejs
//新增資料夾views 裡面新增index.ejs
//index.ejs為模板 欲加入元素使用<%= 元素名稱 %>
// app.get("/",function (req,res) {
//     //載入模板(?)
//     res.render("index.ejs", {userName:"chen"});
// })