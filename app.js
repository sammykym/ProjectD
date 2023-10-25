var express = require("express");
var cors = require("cors");
var app = express();

app.use( express.static("public")  );
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use(cors());

var fs = require("fs");
var dataFileName = "./data.json";

app.listen(3000);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");


app.get("/list", function (req, res) {
	var data = fs.readFileSync(dataFileName);
	var todoList = JSON.parse(data);
    res.set('Content-type', 'application/json');
	res.send( JSON.stringify(todoList) );
})

app.get("/item/:id", function (req, res) {
	var data = fs.readFileSync(dataFileName);
	var todoList = JSON.parse(data);

	var targetIndex = -1;
	for (let i = 0; i < todoList.length; i++) {
		if (todoList[i].tap_color_Id.toString() == req.params.id.toString()) {
			targetIndex = i;
			break;
		}
	}
    if ( targetIndex < 0 ) {
        res.send("not found");
        return;
    }

	res.set('Content-Type', 'application/json');
    res.send( JSON.stringify(todoList[targetIndex]) );
})

// app.post("/create", function (req, res) {
// 	var data = fs.readFileSync(dataFileName);
// 	var todoList = JSON.parse(data);
// 	var item = {
// 		"tap_color_Id": new Date().getTime(),
// 		"title": req.body.title,
// 		"isComplete": req.body.isComplete
// 	};
// 	todoList.push(item);
// 	fs.writeFileSync("./data.json", JSON.stringify(todoList, null, "\t"));
// 	res.send("row inserted.");
// })

app.put("/item", function (req, res) {
	var data = fs.readFileSync(dataFileName);
	var todoList = JSON.parse(data);
	for (let i = 0; i < todoList.length; i++) {
		if (todoList[i].tap_color_Id == req.body.tap_color_Id) {
			todoList[i].title = req.body.title;
			todoList[i].isComplete = req.body.isComplete;
			break;
		}
	}
	fs.writeFileSync("./data.json", JSON.stringify(todoList, null, "\t"));	
	res.send("row updated."); 
})

app.delete("/delete/:id", function (req, res) {
	var data = fs.readFileSync(dataFileName);
	var todoList = JSON.parse(data);

	var deleteIndex = -1;
	for (let i = 0; i < todoList.length; i++) {
		if (todoList[i].tap_color_Id.toString() == req.params.id.toString()) {
			deleteIndex = i;
			break;
		}
	}
    if ( deleteIndex < 0 ) {
        res.send("not found");
        return;
    }

    todoList.splice(deleteIndex, 1);
    fs.writeFileSync("./data.json", JSON.stringify(todoList, null, "\t"));	
    res.send("row deleted.");
})
